// app/[slug]/page.tsx
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTemplateComponent } from "@/lib/events/template-registry";
import Loading from "./loading";

async function EventContent({ slug }: { slug: string }) {
  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from("events")
    .select("*, templates(key)")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !event) {
    notFound();
  }

  const TemplateComponent = getTemplateComponent(event.templates?.key);

  if (!TemplateComponent) {
    notFound();
  }

  return <TemplateComponent data={event} />;
}

export default async function PublicEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <EventContent slug={slug} />
    </Suspense>
  );
}