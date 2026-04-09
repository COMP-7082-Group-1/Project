/** Fetches all events owned by the current user, ordered by creation date. */
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

// Get all events that the user is an owner of
export async function getOwnedEvents() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("*, guests(*)")
    .eq("owner_user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching events:", error);
  } else {
    return events;
  }
}