"use client";

/** Button that signs the current user out and redirects to the home page. */
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";

export function LogoutButton() {
  return <Button onClick={() => logout()}>Logout</Button>;
}
