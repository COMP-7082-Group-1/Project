import EditEventContent from "@/components/dashboard/events/edit/edit-event-content";
import { Suspense } from "react";

export default function EditEventPage({
  params,
}: {
  params: Promise<{ event_id: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading event editor...</div>}>
      <EditEventContent params={params} />
    </Suspense>
  );
}