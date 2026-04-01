import { EventsManager } from "@/components/dashboard/events/events";
import { Suspense } from "react";

export default function Events() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Manage Your Events</h1>
      </div>
      <Suspense
        fallback={
          <div className="p-8 text-center text-muted-foreground">
            <p>Loading events...</p>
          </div>
        }
      >
        <EventsManager />
      </Suspense>
    </div>
  );
}
