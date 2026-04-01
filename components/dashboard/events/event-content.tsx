import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getEventByID } from "@/lib/data/eventByID";
import { getGuestsByEventID } from "@/lib/data/guestsByEventID";
import RsvpButton from "@/components/dashboard/events/rsvp-button";
import ExportGuestsCSV from "@/components/dashboard/events/export-guests-csv";
import CopyLinkButton from "./copy-link-button";

export default async function EventPageContent({
  params,
}: {
  params: Promise<{ event_id: string }>;
}) {
  const { event_id } = await params;

  const [event, guests, user] = await Promise.all([
    getEventByID(event_id),
    getGuestsByEventID(event_id),
    requireUser(),
  ]);

  if (!event) {
    return <p className="text-muted-foreground">Event not found.</p>;
  }

  const sortedGuests = [...(guests ?? [])].sort((a, b) => {
    if (a.user_id === user.id) return -1;
    if (b.user_id === user.id) return 1;
    return 0;
  });

  const isOwner = user.id === event.owner_user_id;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{event.name ?? event.title}</h2>

        <div className="flex items-center gap-2">
          {isOwner ? (
            <>
              <Link
                href={`/dashboard/events/${event_id}/edit`}
                className="text-sm px-3 py-1.5 rounded-md border hover:bg-muted transition-colors"
              >
                Edit Event
              </Link>
              {event.published_url && (
                <>
                  <CopyLinkButton url={event.published_url} />
                  <a
                    href={event.published_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1.5 rounded-md border hover:bg-muted transition-colors"
                  >
                    Visit Event
                  </a>
                </>
              )}
            </>
          ) : (
            event.published_url && (
              <a
                href={event.published_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                RSVP Now
              </a>
            )
          )}
        </div>
      </div>

      {/* Date */}
      <p className="text-muted-foreground">
        {new Date(event.start_time).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {/* Description */}
      <p className="text-muted-foreground">{event.description}</p>

      {/* Location */}
      <div className="flex flex-col gap-1 text-muted-foreground">
        {event.address && <p>{event.address}</p>}
        <p>
          {[event.city, event.state, event.postal_code, event.country]
            .filter(Boolean)
            .join(" ")}
        </p>
        {event.google_maps_link && (
          <a
            href={event.google_maps_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline text-sm"
          >
            View on Google Maps
          </a>
        )}
      </div>

      {/* Video */}
      {event.video_url && (
        <div>
          <p className="text-sm font-medium mb-1">Event Video</p>
          <video
            src={event.video_url}
            controls
            className="w-full rounded-lg max-h-64"
          />
        </div>
      )}

      <br />

      {/* Guest List */}
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">Guest List</p>
        <ExportGuestsCSV
          guests={sortedGuests}
          eventName={event.name ?? event.title ?? "event"}
        />
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
          {sortedGuests.map((guest) => (
            <tr key={guest.id} className="border-b last:border-0">
              <td className="py-2 pr-4">
                {guest.users?.full_name ?? "—"}
                {guest.user_id === user.id && (
                  <span className="ml-2 text-xs text-muted-foreground">(you)</span>
                )}
              </td>
              <td className="py-2 pr-4">{guest.users?.email ?? "—"}</td>
              <td className="py-2 pr-4">
                {guest.user_id === user.id ? (
                  <RsvpButton
                    guestId={guest.id}
                    eventId={event_id}
                    currentStatus={guest.rsvp_status}
                  />
                ) : (
                  guest.rsvp_status ?? "—"
                )}
              </td>
              <td className="py-2 pr-4">
                {guest.rsvp_response_time
                  ? new Date(guest.rsvp_response_time).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}