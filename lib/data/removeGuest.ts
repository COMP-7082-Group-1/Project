"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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
