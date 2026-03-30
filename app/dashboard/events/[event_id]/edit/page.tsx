import { Save } from "lucide-react";

import { updateEvent } from "@/app/dashboard/events/[event_id]/edit/actions";
import { Button } from "@/components/ui/button";
import { getEventByID } from "@/lib/data/eventByID";

function formatDateTimeLocal(value: string) {
  const date = new Date(value);
  const timezoneOffset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

export default async function EditEvent({
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
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold">Edit Event</h2>
        <p className="text-sm text-muted-foreground">
          Update your event details and save the changes when you&apos;re ready.
        </p>
      </div>

      <form
        action={updateEvent.bind(null, { eventId: event_id })}
        className="grid grid-cols-1 gap-6 rounded-xl border p-6 lg:grid-cols-2"
      >
        <div className="space-y-2 lg:col-span-2">
          <label htmlFor="title" className="text-sm font-medium">
            Event Name
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={event.title ?? ""}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={event.description ?? ""}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="start_time" className="text-sm font-medium">
            Start Time
          </label>
          <input
            id="start_time"
            name="start_time"
            type="datetime-local"
            required
            defaultValue={formatDateTimeLocal(event.start_time)}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <input
            id="address"
            name="address"
            required
            defaultValue={event.address ?? ""}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">
            City
          </label>
          <input
            id="city"
            name="city"
            required
            defaultValue={event.city ?? ""}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium">
            State / Province
          </label>
          <input
            id="state"
            name="state"
            defaultValue={event.state ?? ""}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="postal_code" className="text-sm font-medium">
            Postal Code
          </label>
          <input
            id="postal_code"
            name="postal_code"
            defaultValue={event.postal_code ?? ""}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <input
            id="country"
            name="country"
            required
            defaultValue={event.country ?? ""}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div className="flex justify-end lg:col-span-2">
          <Button type="submit">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
