"use client";

/** Live preview of the selected event template rendered with the current form data. */
import type { EventTemplateData } from "@/lib/events/template-preview";
import type { ComponentType } from "react";

type PreviewEventData = EventTemplateData & {
  id: string;
};

type Props = {
  templateComponent: ComponentType<{ data: PreviewEventData }> | null;
  data: PreviewEventData;
};

export default function EventPreview({
  templateComponent: TemplateComponent,
  data,
}: Props) {
  console.log("Rendering EventPreview with templateComponent:", TemplateComponent);

  if (!TemplateComponent) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
        No preview available for this template.
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Preview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This is how your event page will look with the selected template.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <TemplateComponent data={data} />
      </div>
    </section>
  );
}