import { getEvents } from "@/lib/data/event";

export async function EventsManager() {
  const events = await getEvents();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Your Events</h2>

      {!events || events.length === 0 ? (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          <p>No events found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-6 flex flex-col gap-2 hover:bg-accent transition-colors"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
