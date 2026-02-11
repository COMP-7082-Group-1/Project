import { EventsManager } from "@/components/dashboard/events/events";
import { Suspense } from "react";

export default function Events() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Manage Your Events</h1>
      </div>
      <Suspense>
        <EventsManager />
      </Suspense>

      {/* Recent Events */}
      {/* <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Recent Events</h2>
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          <p>No events yet. Create your first event to get started!</p>
        </div>
      </div> */}
    </div>
  );
}
