"use server";

/** Server-side auth helpers: enforce authentication, retrieve the current user, and sign out. */
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

function redirectToLoginWithReturnPath(returnTo?: string) {
  const loginUrl = returnTo
    ? `/auth/login?redirect=${encodeURIComponent(returnTo)}`
    : "/auth/login";

  redirect(loginUrl);
}

/**
 * Log users out of their session
 * Redirects to login page
 */
export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    throw new Error("Failed to logout");
  }

  redirect("/auth/login");
}

/**
 * Get the current authenticated user from the users table
 * Redirects to login if not authenticated
 */
export async function requireUser(returnTo?: string): Promise<User> {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    redirectToLoginWithReturnPath(returnTo);
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", authData?.user?.id)
    .single();

  if (userError || !user) {
    redirectToLoginWithReturnPath(returnTo);
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