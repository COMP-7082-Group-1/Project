import { getUser } from "@/lib/auth";
import { CalendarDays, Users, MapPin, Plus } from "lucide-react";
import { ActionCard } from "@/components/dashboard/action-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { getEvents } from "@/lib/data/event";

// interface StatCardProps {
//   icon: React.ReactNode;
//   title: string;
//   value: string;
//   description: string;
// }

export default async function EventPlannerDashboard() {
  const events = (await getEvents()) || [];
  // const [events, setEvents] = useState<any[]>([]);

  // useEffect(() => {
  //   async function fetchEvents() {
  //     const eventsData = await getEvents();
  //     setEvents(eventsData || []);
  //   }

  //   fetchEvents();
  // }, []);

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Event Planner</h1>
      </div>
      {/* process events for stats */}

      {events.map((event) => (
        <StatCard
          icon={<CalendarDays className="h-5 w-5" />}
          title={event.description}
          value={event.guests.length.toString()}
          description={new Date(event.start_time).toLocaleDateString(
            undefined,
            { month: "short", day: "numeric", year: "numeric" },
          )}
        />
      ))}

      {/* Hard-coded Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<CalendarDays className="h-5 w-5" />}
          title="Upcoming Events"
          value="0"
          description="Events this month"
        />
        
      </div> */}
      {/* Quick Actions */}
      {/* <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionCard
            icon={<Plus className="h-5 w-5" />}
            title="Create New Event"
            description="Plan a new event from scratch"
            href="/dashboard/events/new"
          />
          <ActionCard
            icon={<CalendarDays className="h-5 w-5" />}
            title="View Calendar"
            description="See all upcoming events"
            href="/dashboard/events"
          />
        </div>
      </div> */}
      {/* Recent Events */}
      {/* <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Recent Events</h2>
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          <p>No events yet. Create your first event to get started!</p>
        </div>
      </div> */}
    </div>
  );
}
