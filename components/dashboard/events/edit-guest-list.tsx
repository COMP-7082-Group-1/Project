"use client";

/** Inline editor for adding, removing, and updating RSVP statuses of guests on an event. */
import { useState } from "react";
import { addGuest } from "@/lib/data/addGuest";
import { removeGuest } from "@/lib/data/removeGuest";

type Guest = {
  id: string;
  full_name: string | null;
  email: string | null;
  rsvp_status: string | null;
  users?: { full_name: string | null; email: string | null } | null;
};

type Props = {
  eventId: string;
  initialGuests: Guest[];
};

export default function EditGuestList({ eventId, initialGuests }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleAdd() {
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setError("");
    setAdding(true);
    try {
      await addGuest(eventId, name, email);
      setName("");
      setEmail("");
    } catch {
      setError("Failed to add guest.");
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(guestId: string) {
    setRemovingId(guestId);
    try {
      await removeGuest(guestId, eventId);
    } catch {
      setError("Failed to remove guest.");
    } finally {
      setRemovingId(null);
    }
  }

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-semibold">Guest List</p>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="py-2 pr-4 font-medium">Name</th>
            <th className="py-2 pr-4 font-medium">Email</th>
            <th className="py-2 pr-4 font-medium">RSVP Status</th>
            <th className="py-2 pr-4 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {initialGuests.map((guest) => (
            <tr key={guest.id} className="border-b last:border-0">
              <td className="py-2 pr-4">
                {guest.users?.full_name ?? guest.full_name ?? "—"}
              </td>
              <td className="py-2 pr-4">
                {guest.users?.email ?? guest.email ?? "—"}
              </td>
              <td className="py-2 pr-4">{guest.rsvp_status ?? "—"}</td>
              <td className="py-2 pr-4 text-right">
                <button
                  onClick={() => handleRemove(guest.id)}
                  disabled={removingId === guest.id}
                  className="text-xs text-destructive hover:underline disabled:opacity-50"
                >
                  {removingId === guest.id ? "Removing..." : "Remove"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col gap-2 border-t pt-4">
        <p className="text-sm font-medium">Add Guest</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <button
            onClick={handleAdd}
            disabled={adding}
            className="rounded-md px-4 py-1.5 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
          >
            {adding ? "Adding..." : "Add"}
          </button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
