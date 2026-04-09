"use client";

/** Icon button that permanently deletes an event after a confirmation prompt. */
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { deleteEvent } from "@/app/dashboard/events/actions";
import { Button } from "@/components/ui/button";

function SubmitButton({ eventTitle }: { eventTitle: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      disabled={pending}
      aria-label={`Delete ${eventTitle}`}
      title={`Delete ${eventTitle}`}
      className="text-muted-foreground hover:text-destructive"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

export function DeleteEventButton({
  eventId,
  eventTitle,
}: {
  eventId: string;
  eventTitle: string;
}) {
  return (
    <form
      action={deleteEvent}
      onSubmit={(event) => {
        event.stopPropagation();

        if (!window.confirm(`Delete "${eventTitle}"? This cannot be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="eventId" value={eventId} />
      <SubmitButton eventTitle={eventTitle} />
    </form>
  );
}
