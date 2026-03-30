"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

type UpdateEventParams = {
  eventId: string;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function updateEvent(
  { eventId }: UpdateEventParams,
  formData: FormData,
) {
  const user = await requireUser();
  const supabase = await createClient();

  const title = getStringValue(formData, "title");
  const description = getStringValue(formData, "description");
  const address = getStringValue(formData, "address");
  const city = getStringValue(formData, "city");
  const state = getStringValue(formData, "state");
  const postalCode = getStringValue(formData, "postal_code");
  const country = getStringValue(formData, "country");
  const startTime = getStringValue(formData, "start_time");

  if (!title || !startTime || !address || !city || !country) {
    throw new Error("Missing required event fields.");
  }

  const { error } = await supabase
    .from("events")
    .update({
      name: title,
      title,
      description: description || null,
      address: address || null,
      city: city || null,
      state: state || null,
      postal_code: postalCode || null,
      country: country || null,
      start_time: startTime,
    })
    .eq("id", eventId)
    .eq("owner_user_id", user.id);

  if (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event.");
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/events");
  revalidatePath(`/dashboard/events/${eventId}`);
  revalidatePath(`/dashboard/events/${eventId}/edit`);

  redirect(`/dashboard/events/${eventId}`);
}
