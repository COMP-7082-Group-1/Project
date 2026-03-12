import { getEventByID } from "@/lib/data/eventByID";

export default async function EventPage({
  params,
}: {
  params: Promise<{ event_id: string }>;
}) {
  const { event_id } = await params;
  const event = await getEventByID(event_id);

  if (!event) {
    return <p className="text-muted-foreground">Event not found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{event.title}</h2>
    </div>
  );
}
