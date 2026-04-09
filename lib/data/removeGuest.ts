"use server";

/** Removes a guest from an event by guest ID and revalidates the edit page cache. */
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Remove a guest entry by their ID
export async function removeGuest(guestId: string, eventId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("guests")
    .delete()
    .eq("id", guestId);

  if (error) {
    throw new Error("Failed to remove guest");
  }

  revalidatePath(`/dashboard/events/${eventId}/edit`);
}
