import { getUser } from "@/lib/auth";
import { CalendarDays, Users, MapPin, Plus } from "lucide-react";

export default function EventPlannerDashboard() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Event Planner</h1>
      </div>

      {/* Hard-coded Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<CalendarDays className="h-5 w-5" />}
          title="Upcoming Events"
          value="0"
          description="Events this month"
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          title="Total Attendees"
          value="0"
          description="Across all events"
        />
        <StatCard
          icon={<MapPin className="h-5 w-5" />}
          title="Venues"
          value="0"
          description="Active venues"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionCard
            icon={<Plus className="h-5 w-5" />}
            title="Create New Event"
            description="Plan a new event from scratch"
          />
          <ActionCard
            icon={<CalendarDays className="h-5 w-5" />}
            title="View Calendar"
            description="See all upcoming events"
          />
        </div>
      </div>

      {/* Recent Events */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Recent Events</h2>
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          <p>No events yet. Create your first event to get started!</p>
        </div>
      </div>
    </div>
  );
}

// async function UserEmail() {
//   const user = await getUser();
//   return <span className="font-medium">{user?.email}</span>;
// }

function StatCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="border rounded-lg p-6 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button className="border rounded-lg p-6 flex items-start gap-4 hover:bg-accent transition-colors text-left">
      <div className="p-2 bg-primary/10 rounded-md text-primary">{icon}</div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}
