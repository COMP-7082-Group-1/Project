import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type User = {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "customer";
  updated_at: string;
  created_at: string;
};

/**
 * Get the current authenticated user from the users table
 * Redirects to login if not authenticated
 */
export async function requireUser(): Promise<User> {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    redirect("/auth/login");
  }

  // Then fetch from users table
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  if (userError || !user) {
    redirect("/auth/login");
  }

  return user;
}

/**
 * Get the current user from the users table without redirecting
 * Returns null if not authenticated
 */
export async function getUser(): Promise<User | null> {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return null;
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  if (userError || !user) {
    return null;
  }

  return user;
}
