import EventPageContent from "@/components/dashboard/events/event-content";
import { Suspense } from "react";

export default function EventPage({
  params,
}: {
  params: Promise<{ event_id: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading event...</div>}>
      <EventPageContent params={params} />
    </Suspense>
  );
}