"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function updateAccountSettings(formData: FormData) {
  const user = await requireUser();
  const supabase = await createClient();

  const fullName = formData.get("full_name");

  if (typeof fullName !== "string" || !fullName.trim()) {
    throw new Error("Full name is required.");
  }

  const { error } = await supabase
    .from("users")
    .update({
      full_name: fullName.trim(),
    })
    .eq("id", user.id);

  if (error) {
    console.error("Error updating account settings:", error);
    throw new Error("Failed to update account settings.");
  }

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard/settings");

  redirect("/dashboard/settings?saved=1");
}
