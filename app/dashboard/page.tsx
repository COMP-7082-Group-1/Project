import { DashboardEventFilters } from "@/components/dashboard/dashboard-event-filters";
import { requireUser } from "@/lib/auth";
import { getEvents } from "@/lib/data/event";
import { Suspense } from "react";

async function EventsList() {
  const user = await requireUser();
  const events = (await getEvents()) || [];

  return <DashboardEventFilters currentUserId={user.id} events={events} />;
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
