"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function deleteEvent(formData: FormData) {
  const eventId = formData.get("eventId");

  if (typeof eventId !== "string" || eventId.length === 0) {
    throw new Error("Missing event id.");
  }

  const user = await requireUser();
  const supabase = await createClient();

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", eventId)
    .eq("owner_user_id", user.id);

  if (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event.");
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/events");
}
