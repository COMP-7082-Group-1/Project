import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function getEvents() {

  const user = await requireUser();
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("owner_user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching events:", error);
  } else {
    return events;
  }
}