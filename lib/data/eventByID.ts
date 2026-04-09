/** Fetches a single event by ID including its guests; requires an authenticated user. */
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

// Find an event by its ID, including the guests invited to the event
export async function getEventByID(event_id: string) {
  await requireUser();
  const supabase = await createClient();

  const { data: eventData, error } = await supabase
    .from("events")
    .select("*, guests(*)")
    .eq("id", event_id)
    .single();

  if (error) {
    console.error("Error fetching event:", error);
    return null;
  }

  return eventData;
}