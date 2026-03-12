import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function getEvents() {

  const user = await requireUser();
  const supabase = await createClient();

  const { data: ownedEvents, error: ownedError } = await supabase
    .from("events")
    .select("*, guests(*)")
    .eq("owner_user_id", user.id)
    .order("created_at", { ascending: false });

  if (ownedError) {
    console.error("Error fetching owned events:", ownedError);
    return [];
  }

  const { data: guestEntries, error: guestError } = await supabase
    .from("guests")
    .select("events(*, guests(*))")
    .eq("user_id", user.id);

  if (guestError) {
    console.error("Error fetching guest events:", guestError);
    return ownedEvents ?? [];
  }

  const ownedIds = new Set((ownedEvents ?? []).map((e) => e.id));
  const guestEvents = (guestEntries ?? [])
    .map((g) => g.events as Record<string, any>)
    .filter((e) => e && !ownedIds.has(e.id));

  return [...(ownedEvents ?? []), ...guestEvents];
}