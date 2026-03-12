import { getEventByID } from "@/lib/data/eventByID";
import { getGuestsByEventID } from "@/lib/data/guestsByEventID";

// todo: display event details
export default async function EventPage({
  params,
}: {
  params: Promise<{ event_id: string }>;
}) {
  const { event_id } = await params;
  const event = await getEventByID(event_id);
  const guests = await getGuestsByEventID(event_id);

  if (!event) {
    return <p className="text-muted-foreground">Event not found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{event.title}</h2>
      <p className="text-muted-foreground">
        {new Date(event.start_time).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <p className="text-muted-foreground">{event.description}</p>
      <p className="text-muted-foreground">
        {`${event.city} ${event.state} ${event.postal_code} ${event.country}`}{" "}
      </p>
      {/* show guest data itself (Name, and status beside it) */}
      <p className="font-semibold">Guests</p>

      {guests?.map((guest) => (
        <p key={guest.id}>
          {guest.users?.full_name}: {guest.rsvp_status}
        </p>
      ))}
    </div>
  );
}
