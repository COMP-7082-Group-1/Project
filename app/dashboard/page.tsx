import { CalendarDays } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { getEvents } from "@/lib/data/event";
import { Suspense } from "react";
import Link from "next/link";

async function EventsList() {
  const events = (await getEvents()) || [];

  return (
    <>
      {events.map((event) => (
        <Link key={event.id} href={`/dashboard/events/${event.id}/`}>
          <StatCard
            key={event.id}
            icon={<CalendarDays className="h-5 w-5" />}
            title={event.title}
            guests={event.guests.length.toString()}
            description={event.description}
            location={`${event.city} ${event.state} ${event.postal_code} ${event.country}`} 
            date={new Date(event.start_time).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            invited={
              event.guests.filter((g) => g.rsvp_status === "pending").length
            }
            accepted={
              event.guests.filter((g) => g.rsvp_status === "accepted").length
            }
            declined={
              event.guests.filter((g) => g.rsvp_status === "declined").length
            }
            maybe={event.guests.filter((g) => g.rsvp_status === "maybe").length}
          />
        </Link>
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
