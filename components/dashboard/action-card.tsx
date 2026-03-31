import Link from "next/link";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

export function ActionCard({ icon, title, description, href }: ActionCardProps) {
  return (
    <Link href={href}>
      <button className="border rounded-lg p-6 flex items-start gap-4 hover:bg-accent transition-colors text-left">
        <div className="p-2 bg-primary/10 rounded-md text-primary">{icon}</div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </button>
    </Link>
  );
}
