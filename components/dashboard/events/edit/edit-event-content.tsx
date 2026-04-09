/** Server component that loads event and guest data and renders the event edit form. */
import { redirect } from "next/navigation";
import { getEventByID } from "@/lib/data/eventByID";
import { getGuestsByEventID } from "@/lib/data/guestsByEventID";
import { updateEvent } from "@/lib/data/updateEvent";
import { requireUser } from "@/lib/auth";
import EditGuestList from "@/components/dashboard/events/edit-guest-list";

export default async function EditEventContent({
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

  if (user.id !== event.owner_user_id) {
    redirect(`/dashboard/events/${event_id}`);
  }

  async function handleSubmit(formData: FormData) {
    "use server";

    await updateEvent(event_id, {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postal_code: formData.get("postal_code") as string,
      country: formData.get("country") as string,
      start_time: formData.get("start_time") as string,
      main_image_url: formData.get("main_image_url") as string,
      video_url: formData.get("video_url") as string,
      google_maps_link: formData.get("google_maps_link") as string,
    });

    redirect(`/dashboard/events/${event_id}`);
  }

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "text-sm font-medium";

  const startTimeValue = event.start_time
    ? new Date(event.start_time).toISOString().slice(0, 16)
    : "";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Edit Event</h2>
      </div>

      <form action={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={event.name ?? ""}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={event.description ?? ""}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Start Time</label>
          <input
            id="start_time"
            name="start_time"
            type="datetime-local"
            defaultValue={startTimeValue}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Address</label>
          <input
            id="address"
            name="address"
            type="text"
            defaultValue={event.address ?? ""}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>City</label>
            <input
              id="city"
              name="city"
              type="text"
              defaultValue={event.city ?? ""}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>State</label>
            <input
              id="state"
              name="state"
              type="text"
              defaultValue={event.state ?? ""}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Postal Code</label>
            <input
              id="postal_code"
              name="postal_code"
              type="text"
              defaultValue={event.postal_code ?? ""}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Country</label>
            <input
              id="country"
              name="country"
              type="text"
              defaultValue={event.country ?? ""}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Google Maps Link</label>
          <input
            id="google_maps_link"
            name="google_maps_link"
            type="url"
            defaultValue={event.google_maps_link ?? ""}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Main Image URL</label>
          <input
            id="main_image_url"
            name="main_image_url"
            type="url"
            defaultValue={event.main_image_url ?? ""}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Video URL</label>
          <input
            id="video_url"
            name="video_url"
            type="url"
            defaultValue={event.video_url ?? ""}
            className={inputClass}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
          <a
            href={`/dashboard/events/${event_id}`}
            className="rounded-md px-4 py-2 text-sm font-medium border hover:bg-muted transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>

      <EditGuestList eventId={event_id} initialGuests={guests ?? []} />
    </div>
  );
}