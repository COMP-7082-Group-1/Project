import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { DeleteEventButton } from "@/components/dashboard/delete-event-button";
import { StatCard } from "@/components/dashboard/stat-card";
import { getOwnedEvents } from "@/lib/data/eventOwner";

function countByStatus(
  guests: { rsvp_status: string | null }[] | null | undefined,
  status: string,
) {
  return guests?.filter((g) => g.rsvp_status === status).length ?? 0;
}

function formatLocation(event: {
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
}) {
  return [event.city, event.state, event.postal_code, event.country]
    .filter(Boolean)
    .join(" ");
}

export async function EventsManager() {
  const events = await getOwnedEvents();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Click to Edit Your Events</h2>

      {!events || events.length === 0 ? (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          <p>No events found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <Link key={event.id} href={`/dashboard/events/${event.id}/edit`}>
              <StatCard
                icon={<CalendarDays className="h-5 w-5" />}
                title={event.title}
                guests={event.guests?.length?.toString() ?? "0"}
                description={
                  event.description
                    ? event.description.slice(0, 100) +
                      (event.description.length > 100 ? "..." : "")
                    : "No description"
                }
                location={formatLocation(event)}
                date={new Date(event.start_time).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                invited={countByStatus(event.guests, "pending")}
                accepted={countByStatus(event.guests, "accepted")}
                declined={countByStatus(event.guests, "declined")}
                maybe={countByStatus(event.guests, "maybe")}
                action={
                  <DeleteEventButton
                    eventId={event.id}
                    eventTitle={event.title}
                  />
                }
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
