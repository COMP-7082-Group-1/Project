"use server";

/** Adds a guest to an event by name and email, linking them to an existing user account if one exists. */
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Add a new guest to an event by providing their full name and email address
export async function addGuest(
  eventId: string,
  full_name: string,
  email: string,
) {
  const supabase = await createClient();

  const normalizedEmail = email.trim().toLowerCase();

  const { data: matchedUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", normalizedEmail)
    .single();

  const { error } = await supabase.from("guests").insert({
    event_id: eventId,
    full_name: full_name.trim(),
    email: normalizedEmail,
    user_id: matchedUser?.id ?? null,
    rsvp_status: "pending",
  });

  if (error) {
    throw new Error("Failed to add guest");
  }

  revalidatePath(`/dashboard/events/${eventId}/edit`);
}
