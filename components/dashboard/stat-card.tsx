interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  guests: string;
  description: string;
  date: string;
  invited: number;
  accepted: number;
  declined: number;
  maybe: number;
  location: string;
  color?: string;
  userRsvpStatus?: string;
  action?: React.ReactNode;
}

const rsvpBgClass: Record<string, string> = {
  accepted: "bg-green-500/10",
  declined: "bg-red-500/10",
  maybe: "bg-yellow-500/10",
  pending: "bg-pink-500/10",
};

export function StatCard({
  icon,
  title,
  guests,
  description,
  date,
  invited,
  accepted,
  declined,
  maybe,
  location,
  userRsvpStatus,
  action,
}: StatCardProps) {
  const bgClass = userRsvpStatus ? (rsvpBgClass[userRsvpStatus] ?? "") : "";
  return (
    <div
      className={`relative border rounded-lg p-6 flex flex-row gap-6 hover:bg-accent transition-colors ${bgClass}`}
    >
      {action && <div className="absolute top-3 right-3">{action}</div>}
      {/* Left */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          {icon}
          <span className="text-3xl font-bold text-foreground">{title}</span>
        </div>
        <div className="text-sm text-muted-foreground">{description}</div>
        <div className="text-sm text-muted-foreground">Guests: {guests}</div>
        <div className="text-sm text-muted-foreground">{date}</div>
        <div className="text-sm text-muted-foreground">{location}</div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="text-lg text-muted-foreground">Invited: {invited}</div>
        <div className="text-lg text-muted-foreground">
          Accepted: {accepted}
        </div>
        <div className="text-lg text-muted-foreground">
          Declined: {declined}
        </div>
        <div className="text-lg text-muted-foreground">Maybe: {maybe}</div>
      </div>
    </div>
  );
}
