"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { CalendarDays, ChevronDown, Search } from "lucide-react";

import { DeleteEventButton } from "@/components/dashboard/delete-event-button";
import { EditEventButton } from "@/components/dashboard/edit-event-button";
import { StatCard } from "@/components/dashboard/stat-card";

type GuestWithStatus = {
  rsvp_status: string | null;
};

type DashboardEvent = {
  id: string;
  owner_user_id: string;
  title: string;
  description: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  start_time: string;
  guests: GuestWithStatus[] | null;
};

type OwnershipFilter = "all" | "owned" | "invited";
type TimeFilter = "all" | "upcoming" | "past";

const ownershipOptions: Array<{ value: OwnershipFilter; label: string }> = [
  { value: "all", label: "All Events" },
  { value: "owned", label: "Owned" },
  { value: "invited", label: "Invited" },
];

function countByStatus(
  guests: GuestWithStatus[] | null | undefined,
  status: string,
) {
  return guests?.filter((guest) => guest.rsvp_status === status).length ?? 0;
}

function formatLocation(event: DashboardEvent) {
  return [event.city, event.state, event.postal_code, event.country]
    .filter(Boolean)
    .join(" ");
}

export function DashboardEventFilters({
  currentUserId,
  events,
}: {
  currentUserId: string;
  events: DashboardEvent[];
}) {
  const [search, setSearch] = useState("");
  const [ownershipFilter, setOwnershipFilter] =
    useState<OwnershipFilter>("all");
  const [timeFilter] = useState<TimeFilter>("all");
  const deferredSearch = useDeferredValue(search);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();
    const now = Date.now();

    return events.filter((event) => {
      const isOwned = event.owner_user_id === currentUserId;
      const eventTime = new Date(event.start_time).getTime();
      const matchesOwnership =
        ownershipFilter === "all" ||
        (ownershipFilter === "owned" && isOwned) ||
        (ownershipFilter === "invited" && !isOwned);
      const matchesTime =
        timeFilter === "all" ||
        (timeFilter === "upcoming" && eventTime >= now) ||
        (timeFilter === "past" && eventTime < now);
      const haystack = [
        event.title,
        event.description ?? "",
        event.city ?? "",
        event.state ?? "",
        event.country ?? "",
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 || haystack.includes(normalizedSearch);

      return matchesOwnership && matchesTime && matchesSearch;
    });
  }, [currentUserId, deferredSearch, events, ownershipFilter, timeFilter]);

  return (
    <div className="flex flex-col gap-6">
      <section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by event name or location"
              className="ui-pill-control w-full bg-slate-50 pl-11 text-slate-900"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <div className="relative inline-flex">
              <select
                value={ownershipFilter}
                onChange={(event) =>
                  setOwnershipFilter(event.target.value as OwnershipFilter)
                }
                className="ui-pill-control appearance-none pr-10"
                aria-label="Filter by event ownership"
              >
                {ownershipOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing {filteredEvents.length} of {events.length} events
        </p>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No events match your filters.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredEvents.map((event) => {
            const isOwned = event.owner_user_id === currentUserId;

            return (
              <StatCard
                key={event.id}
                icon={<CalendarDays className="h-5 w-5" />}
                title={event.title}
                guests={event.guests?.length?.toString() ?? "0"}
                description={
                  event.description
                    ? event.description.slice(0, 100) +
                      (event.description.length > 100 ? "..." : "")
                    : "No description"
                }
                location={formatLocation(event)}
                date={new Date(event.start_time).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                invited={countByStatus(event.guests, "pending")}
                accepted={countByStatus(event.guests, "accepted")}
                declined={countByStatus(event.guests, "declined")}
                maybe={countByStatus(event.guests, "maybe")}
                href={`/dashboard/events/${event.id}/`}
                action={
                  isOwned ? (
                    <div className="flex items-center gap-1">
                      <EditEventButton
                        eventId={event.id}
                        eventTitle={event.title}
                      />
                      <DeleteEventButton
                        eventId={event.id}
                        eventTitle={event.title}
                      />
                    </div>
                  ) : null
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
