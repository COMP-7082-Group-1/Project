"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface UpdateEventData {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  start_time: string;
  main_image_url: string;
  video_url: string;
  google_maps_link: string;
}

export async function updateEvent(eventId: string, eventData: UpdateEventData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("events")
    .update(eventData)
    .eq("id", eventId);

  if (error) {
    throw new Error("Failed to update event");
  }

  revalidatePath(`/dashboard/events/${eventId}`);
}
