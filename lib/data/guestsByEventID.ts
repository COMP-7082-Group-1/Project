import { createClient } from "@/lib/supabase/server";

export async function getGuestsByEventID(event_id: string) {
  const supabase = await createClient();

  const { data: guests, error } = await supabase
    .from("guests")
    .select("*, users(*)")
    .eq("event_id", event_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching guests:", error);
  } else {
    return guests;
  }
}