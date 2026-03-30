import { CalendarDays } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { DeleteEventButton } from "@/components/dashboard/delete-event-button";
import { requireUser } from "@/lib/auth";
import { getEvents } from "@/lib/data/event";
import { Suspense } from "react";

type GuestWithStatus = {
  rsvp_status: string | null;
};

function countByStatus(
  guests: GuestWithStatus[] | null | undefined,
  status: string,
) {
  return guests?.filter((guest) => guest.rsvp_status === status).length ?? 0;
}

async function EventsList() {
  const user = await requireUser();
  const events = (await getEvents()) || [];

  return (
    <>
      {events.map((event) => (
        <StatCard
          key={event.id}
          icon={<CalendarDays className="h-5 w-5" />}
          title={event.title}
          guests={event.guests?.length?.toString() ?? "0"}
          description={
            event.description
              ? event.description.slice(0, 100) +
                (event.description.length > 100 ? "..." : "")
              : "No description"
          }
          location={`${event.city} ${event.state} ${event.postal_code} ${event.country}`}
          date={new Date(event.start_time).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          invited={countByStatus(event.guests, "pending")}
          accepted={countByStatus(event.guests, "accepted")}
          declined={countByStatus(event.guests, "declined")}
          maybe={countByStatus(event.guests, "maybe")}
          href={`/dashboard/events/${event.id}/`}
          action={
            event.owner_user_id === user.id ? (
              <DeleteEventButton eventId={event.id} eventTitle={event.title} />
            ) : null
          }
        />
      ))}
    </>
  );
}

export default function EventPlannerDashboard() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">All My Events</h1>
      </div>

      <Suspense
        fallback={<p className="text-muted-foreground">Loading events...</p>}
      >
        <EventsList />
      </Suspense>
    </div>
  );
}
