import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // Redirect to dashboard if user is logged in
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Event Planner</Link>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" variant={"outline"}>
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" variant={"default"}>
                <Link href="/auth/sign-up">Sign up</Link>
              </Button>
            </div>
          </div>
        </nav>

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

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
