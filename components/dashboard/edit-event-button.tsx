"use client";

/** Button that navigates to the edit page for a specific event. */
import Link from "next/link";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EditEventButton({
  eventId,
  eventTitle,
}: {
  eventId: string;
  eventTitle: string;
}) {
  return (
    <Button asChild variant="ghost" size="icon" title={`Edit ${eventTitle}`}>
      <Link
        href={`/dashboard/events/${eventId}/edit`}
        aria-label={`Edit ${eventTitle}`}
        className="text-muted-foreground hover:text-destructive"
      >
        <Pencil className="h-4 w-4" />
      </Link>
    </Button>
  );
}
