import Link from "next/link";
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
            <Link
              key={event.id}
              href={`/dashboard/events/${event.id}/edit`}
              className="border rounded-lg p-6 flex flex-col gap-2 hover:bg-accent transition-colors"
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
          ))}
        </div>
      )}
    </div>
  );
}
