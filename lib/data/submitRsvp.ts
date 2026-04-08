"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Submit an RSVP response for a guest to an event
export async function submitRsvp(
  eventId: string,
  attendance: string,
  redirectPath: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/sign-up?redirect=${encodeURIComponent(redirectPath)}`);
  }

  const { data: guest, error } = await supabase
    .from("guests")
    .select("id")
    .eq("event_id", eventId)
    .eq("email", user.email)
    .single();

  if (error || !guest) {
    throw new Error("You are not on the guest list for this event.");
  }

  const { error: updateError } = await supabase
    .from("guests")
    .update({
      rsvp_status: attendance,
      rsvp_response_time: new Date().toISOString(),
      user_id: user.id,
    })
    .eq("id", guest.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return { success: true };
}
