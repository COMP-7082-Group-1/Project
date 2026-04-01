import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import slugify from "slugify";
import { getUser } from "@/lib/auth";
import { Resend } from "resend";

type GuestInput = {
  full_name: string;
  email: string;
};

export async function POST(req: Request) {
  try {
    const user = await getUser();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { form, guests, selectedTemplateId, colorPaletteId } = body;

    if (!form?.name) {
      return NextResponse.json({ error: "Missing form.name" }, { status: 400 });
    }

    if (!selectedTemplateId) {
      return NextResponse.json(
        { error: "Missing selectedTemplateId" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

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
      return NextResponse.json(
        {
          error: eventError.message,
          details: eventError.details,
          hint: eventError.hint,
          code: eventError.code,
        },
        { status: 500 },
      );
    }

    const cleanedGuests: GuestInput[] = (guests || [])
      .map((guest: GuestInput) => ({
        full_name: guest.full_name?.trim() || "",
        email: guest.email?.trim().toLowerCase() || "",
      }))
      .filter((guest: GuestInput) => guest.full_name && guest.email);

    if (cleanedGuests.length > 0) {
      const uniqueGuests = Array.from(
        new Map(cleanedGuests.map((guest) => [guest.email, guest])).values(),
      );

      const guestEmails = uniqueGuests.map((guest) => guest.email);

      const { data: matchedUsers, error: usersError } = await supabase
        .from("users")
        .select("id, email")
        .in("email", guestEmails);

      if (usersError) {
        return NextResponse.json(
          {
            error: usersError.message,
            details: usersError.details,
            hint: usersError.hint,
            code: usersError.code,
          },
          { status: 500 },
        );
      }

      const userMap = new Map(
        (matchedUsers || []).map(
          (matchedUser: { id: string; email: string }) => [
            matchedUser.email.toLowerCase(),
            matchedUser.id,
          ],
        ),
      );

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
        return NextResponse.json(
          {
            error: guestsError.message,
            details: guestsError.details,
            hint: guestsError.hint,
            code: guestsError.code,
          },
          { status: 500 },
        );
      }

      // ── Send invitation emails ──────────────────────────────
      // ── Send invitation emails ──────────────────────────────

      if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY");
      } else {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail =
          process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

        const results = await Promise.allSettled(
          uniqueGuests.map((guest) =>
            resend.emails.send({
              from: fromEmail,
              to: guest.email,
              subject: `You're invited to ${form.name}`,
              html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #1f2937;">
            <h2 style="margin-bottom: 16px;">You're invited!</h2>

            <p>Hi ${guest.full_name},</p>

            <p>
              You have been invited to <strong>${form.name}</strong>.
            </p>

            <p>
              Click the button below to view the invitation and RSVP:
            </p>

            <p style="margin: 24px 0;">
              <a
                href="${publishedUrl}"
                style="
                  display: inline-block;
                  background: #2d6a4f;
                  color: #ffffff;
                  padding: 12px 24px;
                  border-radius: 8px;
                  text-decoration: none;
                  font-weight: bold;
                "
              >
                View Invitation & RSVP
              </a>
            </p>

            <p style="font-size: 14px; color: #6b7280;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>

            <p style="font-size: 14px; word-break: break-all; color: #2563eb;">
              ${publishedUrl}
            </p>
          </div>
        `,
            }),
          ),
        );

        console.log("Email results:", JSON.stringify(results, null, 2));
      }

      // ───────────────────────────────────────────────────────
      // ───────────────────────────────────────────────────────
    }

    return NextResponse.json({
      success: true,
      message: "Event saved as draft successfully.",
      event,
      publishedUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
