/** Grid of available event templates for the user to pick a visual design. */
import type { TemplateRecord as Template } from "@/lib/events/template-preview";

type TemplateSelectorProps = {
  templates: Template[];
  loadingTemplates: boolean;
  selectedTemplateId: string | null;
  onSelect: (id: string) => void;
};

export default function TemplateSelector({
  templates,
  loadingTemplates,
  selectedTemplateId,
  onSelect,
}: TemplateSelectorProps) {
  return (
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
    </section>
  );
}