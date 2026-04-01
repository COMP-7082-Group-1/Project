// app/HomeGate.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomeGate() {
  const supabase = await createClient();
  const { data } = await supabase?.auth?.getClaims();
  const user = data?.claims;

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 flex flex-col gap-8 max-w-4xl p-8 items-center justify-center text-center">
      <h1 className="text-5xl font-bold">Welcome to Event Planner</h1>
      <p className="text-xl text-muted-foreground max-w-2xl">
        Plan, organize, and manage your events all in one place. Get started by creating an account.
      </p>
      <div className="flex gap-4 mt-4">
        <Button asChild size="lg">
          <Link href="/auth/sign-up">Get Started</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
