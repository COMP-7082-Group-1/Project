"use client";

/** Form step for adding, removing, and managing the initial guest list for a new event. */
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export type GuestFormItem = {
  full_name: string;
  email: string;
};

type GuestListFormProps = {
  guests: GuestFormItem[];
  errors?: string;
  onAddGuest: () => void;
  onRemoveGuest: (index: number) => void;
  onGuestChange: (
    index: number,
    field: keyof GuestFormItem,
    value: string,
  ) => void;
};

export default function GuestListForm({
  guests,
  errors,
  onAddGuest,
  onRemoveGuest,
  onGuestChange,
}: GuestListFormProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Guest List</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your guests with their full name and email address.
        </p>
      </div>

      {errors ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {errors}
        </div>
      ) : null}

      <div className="space-y-4">
        {guests.map((guest, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 rounded-xl border bg-card p-4 md:grid-cols-[1fr_1fr_auto]"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={guest.full_name}
                onChange={(e) =>
                  onGuestChange(index, "full_name", e.target.value)
                }
                placeholder="Guest full name"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={guest.email}
                onChange={(e) => onGuestChange(index, "email", e.target.value)}
                placeholder="guest@email.com"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none transition focus:border-primary"
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => onRemoveGuest(index)}
                variant="outline"
                disabled={guests.length === 1}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button type="button" onClick={onAddGuest}>
        <Plus className="mr-2 h-4 w-4" />
        Add Guest
      </Button>
    </section>
  );
}
