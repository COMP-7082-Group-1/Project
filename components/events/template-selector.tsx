"use client";

import { useEffect, useState, type ComponentType } from "react";

import EventPreview from "@/components/events/event-preview";
import type { TemplateRecord as Template } from "@/lib/events/template-preview";
import type { EventTemplateData } from "@/lib/events/template-preview";

type TemplateSelectorProps = {
  templates: Template[];
  loadingTemplates: boolean;
  selectedTemplateId: string | null;
  previewData: EventTemplateData;
  previewTemplateComponent: ComponentType<{ data: EventTemplateData }> | null;
  onSelect: (id: string) => void;
};

export default function TemplateSelector({
  templates,
  loadingTemplates,
  selectedTemplateId,
  previewData,
  previewTemplateComponent,
  onSelect,
}: TemplateSelectorProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const selectedTemplate =
    templates.find((template) => template.id === selectedTemplateId) ?? null;

  useEffect(() => {
    if (!isPreviewOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPreviewOpen]);

  return (
    <>
      <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Choose a Template</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select one template to use for this event.
        </p>
      </div>

      {loadingTemplates ? (
        <div className="rounded-xl border bg-card p-8 text-sm text-muted-foreground">
          Loading templates...
        </div>
      ) : templates.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-sm text-muted-foreground">
          No templates found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => {
            const isSelected = selectedTemplateId === template.id;

            return (
              <button
                key={template.id}
                type="button"
                onClick={() => onSelect(template.id)}
                className={[
                  "group overflow-hidden rounded-2xl border bg-card text-left transition-all",
                  "hover:-translate-y-1 hover:shadow-lg",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20",
                  isSelected
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/60",
                ].join(" ")}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                  {template.image ? (
                    <img
                      src={template.image}
                      alt={template.name || "Template preview"}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      No preview image
                    </div>
                  )}
                </div>

                <div className="space-y-2 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium">{template.name || "Untitled Template"}</p>
                    {isSelected && (
                      <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                        Selected
                      </span>
                    )}
                  </div>

                  {template.key ? (
                    <p className="text-xs text-muted-foreground">
                      {template.key}
                    </p>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selectedTemplate ? (
        <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {selectedTemplate.name || "Selected Template"} selected
              </h3>
              <p className="text-sm text-slate-500">
                Open a popup preview to inspect the full layout before
                continuing.
              </p>
            </div>
            {selectedTemplate.key ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {selectedTemplate.key}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Open Preview
          </button>
        </div>
      ) : null}
      </section>

      {isPreviewOpen && selectedTemplate ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() => setIsPreviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedTemplate.name || "Template"} preview`}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {selectedTemplate.name || "Selected Template"}
                </h3>
                <p className="text-sm text-slate-500">
                  Previewing the template with sample event content.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                Close
              </button>
            </div>

            <div className="overflow-auto bg-slate-50 p-3 sm:p-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <EventPreview
                  templateComponent={previewTemplateComponent}
                  data={previewData}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
