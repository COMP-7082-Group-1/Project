"use client";

/** Toggle button for updating a guest's RSVP status on an event. */
import { useState, useTransition } from "react";
import { updateRsvp } from "@/lib/data/updateRsvp";

const STATUSES = ["accepted", "declined", "maybe"] as const;
type RsvpStatus = (typeof STATUSES)[number];

const STATUS_LABELS: Record<RsvpStatus, string> = {
  accepted: "Accepted",
  declined: "Declined",
  maybe: "Maybe",
};

type Props = {
  guestId: string;
  eventId: string;
  currentStatus: string | null;
};

export default function RsvpButton({ guestId, eventId, currentStatus }: Props) {
  const initial: RsvpStatus = STATUSES.includes(currentStatus as RsvpStatus)
    ? (currentStatus as RsvpStatus)
    : "maybe";
  const [status, setStatus] = useState<RsvpStatus>(initial);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as RsvpStatus;
    setStatus(newStatus);
    startTransition(() => updateRsvp(guestId, newStatus, eventId));
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isPending}
      className="rounded border border-input bg-background px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
