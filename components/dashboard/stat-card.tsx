interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

export function StatCard({ icon, title, value, description }: StatCardProps) {
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
