"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";

export function LogoutButton() {
  return <Button onClick={() => logout()}>Logout</Button>;
}
