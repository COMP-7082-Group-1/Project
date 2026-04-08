import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

// Get all events for the current user, sorted by start time
export async function getEvents() {

  const user = await requireUser();
  const supabase = await createClient();

  const { data: ownedEvents, error: ownedError } = await supabase
    .from("events")
    .select("*, guests(*)")
    .eq("owner_user_id", user.id)

  if (ownedError) {
    console.error("Error fetching owned events:", ownedError);
    return [];
  }

  const { data: guestEntries, error: guestError } = await supabase
    .from("guests")
    .select("*, events(*, guests(*))")
    .eq("user_id", user.id);

  if (guestError) {
    console.error("Error fetching guest events:", guestError);
    return ownedEvents ?? [];
  }

  const ownedIds = new Set((ownedEvents ?? []).map((e) => e.id));
  const guestEvents = (guestEntries ?? [])
    .filter((g) => g.events && !ownedIds.has((g.events as Record<string, any>).id))
    .map((g) => ({ ...(g.events as Record<string, any>), userRsvpStatus: g.rsvp_status }));

  return [...(ownedEvents ?? []), ...guestEvents].sort(
    (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );
}