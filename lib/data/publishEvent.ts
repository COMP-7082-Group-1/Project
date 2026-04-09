"use server";

/** Creates a new event with its guest list, generates a unique slug, and emails invitations via Resend. */
import { getUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import slugify from "slugify";
import { Resend } from "resend";

type GuestInput = {
  full_name: string;
  email: string;
};

type PublishEventInput = {
  form: {
    name: string;
    description?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    start_time: string;
    main_image_url?: string;
    video_url?: string;
    google_maps_link?: string;
  };
  guests?: GuestInput[];
  selectedTemplateId: string;
  colorPaletteId?: string;
};

// Publish a new event, along with its guest list, and send invitation emails to the guests
export async function publishEvent({
  form,
  guests,
  selectedTemplateId,
  colorPaletteId,
}: PublishEventInput) {
  const user = await getUser();

  if (!user?.id) {
    throw new Error("Unauthorized.");
  }

  if (!form?.name) {
    throw new Error("Missing form.name");
  }

  if (!selectedTemplateId) {
    throw new Error("Missing selectedTemplateId");
  }

  const supabase = await createClient();

  // Append a timestamp to the slugified name to guarantee uniqueness,
  // even if two events share the same name 
  const slug = `${slugify(form.name, { lower: true, strict: true })}-${Date.now()}`;
  const publishedUrl = `${process.env.NEXT_PUBLIC_APP_URL}/events/${slug}`;

  const { data: event, error: eventError } = await supabase
    .from("events")
    .insert([
      {
        owner_user_id: user.id,
        ui_template_id: selectedTemplateId,
        name: form.name,
        title: form.name,
        description: form.description || null,
        address: form.address || null,
        city: form.city || null,
        state: form.state || null,
        postal_code: form.postal_code || null,
        country: form.country || null,
        start_time: form.start_time,
        main_image_url: form.main_image_url || null,
        video_url: form.video_url || null,
        google_maps_link: form.google_maps_link || null,
        color_palette: colorPaletteId || null,
        slug,
        published_url: publishedUrl,
        is_published: true,
        status: "active",
      },
    ])
    .select()
    .single();

  if (eventError) {
    throw new Error(eventError.message);
  }

  // Normalise guest entries: trim whitespace, lowercase emails, then drop
  // any row that is missing either a name or an email address.
  const cleanedGuests: GuestInput[] = (guests || [])
    .map((guest) => ({
      full_name: guest.full_name?.trim() || "",
      email: guest.email?.trim().toLowerCase() || "",
    }))
    .filter((guest) => guest.full_name && guest.email);

  if (cleanedGuests.length > 0) {
    // Deduplicate by email, where last entry for a given address wins.
    const uniqueGuests = Array.from(
      new Map(cleanedGuests.map((guest) => [guest.email, guest])).values(),
    );

    const guestEmails = uniqueGuests.map((guest) => guest.email);

    // Look up which guest emails already belong to registered users so we
    // can link the guest row to an existing user_id where possible.
    const { data: matchedUsers, error: usersError } = await supabase
      .from("users")
      .select("id, email")
      .in("email", guestEmails);

    if (usersError) {
      throw new Error(usersError.message);
    }

    const userMap = new Map(
      (matchedUsers || []).map((u: { id: string; email: string }) => [
        u.email.toLowerCase(),
        u.id,
      ]),
    );

    // If the guest has a registered account, attach their user_id so the
    // RSVP can appear in their dashboard
    const guestRows = uniqueGuests.map((guest) => ({
      event_id: event.id,
      full_name: guest.full_name,
      email: guest.email,
      user_id: userMap.get(guest.email) ?? null,
      rsvp_status: "pending", 
    }));

    const { error: guestsError } = await supabase
      .from("guests")
      .insert(guestRows);

    if (guestsError) {
      throw new Error(guestsError.message);
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set — skipping invitation emails.");
    } else {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Use allSettled so a single failed email doesn't abort the rest 
      const results = await Promise.allSettled(
      uniqueGuests.map((guest) =>
        resend.emails.send({
          from: "invites@yourdomain.com",
          to: guest.email,
          subject: `You're invited to ${form.name}`,
          html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>You're invited!</h2>
  <p>Hi ${guest.full_name},</p>
  <p>You have been invited to <strong>${form.name}</strong>.</p>
  <p>
    <a
      href="${publishedUrl}"
      style="
        display: inline-block;
        background: #2d6a4f;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
      "
    >
      View Invitation & RSVP
    </a>
  </p>
  <p style="color: #888; font-size: 0.85rem;">
    If the button doesn't work, copy this link: ${publishedUrl}
  </p>
</div>
`,
        }),
      ),
    );

      console.log("Email results:", JSON.stringify(results, null, 2));
    }

  return { success: true, event, publishedUrl };
}
}