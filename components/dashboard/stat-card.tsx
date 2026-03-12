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
}

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
}: StatCardProps) {
  return (
    <div className="border rounded-lg p-6 flex flex-row gap-6 hover:bg-accent transition-colors">
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
