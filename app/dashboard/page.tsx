import { getUser } from "@/lib/auth";
import { CalendarDays, Users, MapPin, Plus } from "lucide-react";
import { ActionCard } from "@/components/dashboard/action-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { getEvents } from "@/lib/data/event";

export default async function EventPlannerDashboard() {
  const events = (await getEvents()) || [];
  events.forEach((event) => console.log(event.guests));

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">All My Events</h1>
      </div>

      {events.map((event) => (
        <StatCard
          icon={<CalendarDays className="h-5 w-5" />}
          title={event.title}
          guests={event.guests.length.toString()}
          description={event.description}
          date={new Date(event.start_time).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          invited={
            event.guests.filter((g) => g.rsvp_status === "pending").length
          }
          accepted={
            event.guests.filter((g) => g.rsvp_status === "accepted").length
          }
          declined={
            event.guests.filter((g) => g.rsvp_status === "declined").length
          }
          maybe={event.guests.filter((g) => g.rsvp_status === "maybe").length}
        />
      ))}
    </div>
  );
}
