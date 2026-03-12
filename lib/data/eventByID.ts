import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function getEventByID(event_id: string) {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: eventData, error } = await supabase
    .from("events")
    .select("*, guests(*)")
    .eq("id", event_id)
    .eq("owner_user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching event:", error);
  } else {
    return eventData;
  }
}