import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
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
      <br></br>
      <div className="flex items-center justify-between gap-4">
        <p className="text-2xl font-semibold">Guest List</p>
        <Button asChild variant="outline">
          <a
            href={`/api/events/${event.id}/guests-csv`}
            download={`${event.title}-guests.csv`}
          >
            <Download className="h-4 w-4" />
            Download CSV
          </a>
        </Button>
      </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="py-2 pr-4 font-medium">Name</th>
            <th className="py-2 pr-4 font-medium">Email</th>
            <th className="py-2 pr-4 font-medium">RSVP Status</th>
            <th className="py-2 pr-4 font-medium">RSVP Time</th>
          </tr>
        </thead>
        <tbody>
          {guests?.map((guest) => (
            <tr key={guest.id} className="border-b last:border-0">
              <td className="py-2 pr-4">{guest.users?.full_name ?? "—"}</td>
              <td className="py-2 pr-4">{guest.users?.email ?? "—"}</td>
              <td className="py-2 pr-4">{guest.rsvp_status ?? "—"}</td>
              <td className="py-2 pr-4">
                {guest.rsvp_response_time
                  ? new Date(guest.rsvp_response_time).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
