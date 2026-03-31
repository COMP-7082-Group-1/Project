import Link from "next/link";
import { DeleteEventButton } from "@/components/dashboard/delete-event-button";
import { getOwnedEvents } from "@/lib/data/eventOwner";

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
        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-6 transition-colors hover:bg-accent"
            >
              <div className="flex items-start justify-between gap-4">
                <Link
                  href={`/dashboard/events/${event.id}/edit`}
                  className="min-w-0 flex-1"
                >
                  <h3 className="text-xl font-semibold">
                    {event.title} on{" "}
                    {new Date(event.start_time).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                </Link>
                <div className="flex items-center gap-1">
                  <DeleteEventButton
                    eventId={event.id}
                    eventTitle={event.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
