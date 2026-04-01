import SettingsContent from "@/components/settings/settings-context";
import { Suspense } from "react";

export default function SettingsPage({
  searchParams,
}: {
  searchParams?: Promise<{ saved?: string }>;
}) {
  return (
    <Suspense fallback={<div className="p-6">Loading settings...</div>}>
      <SettingsContent searchParams={searchParams} />
    </Suspense>
  );
}