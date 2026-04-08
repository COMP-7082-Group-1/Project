"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Update an RSVP status for a guest by their ID
export async function updateRsvp(guestId: string, status: string, eventId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("guests")
    .update({
      rsvp_status: status,
      rsvp_response_time: new Date().toISOString(),
    })
    .eq("id", guestId);

  if (error) {
    throw new Error("Failed to update RSVP status");
  }

  revalidatePath(`/dashboard/events/${eventId}`);
}
