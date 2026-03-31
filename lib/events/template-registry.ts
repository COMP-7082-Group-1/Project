import type { ComponentType } from "react";
import GreenForestTemplate from "@/components/templates/GreenForestTemplate";
import type { EventTemplateData } from "./template-preview";

export type EventTemplateComponent = ComponentType<{
  data: EventTemplateData & { id: string };
}>;

export const templateRegistry: Record<string, EventTemplateComponent> = {
  "green_forest": GreenForestTemplate,
};

export function getTemplateComponent(
  key?: string | null,
): EventTemplateComponent | null {
  if (!key) return null;
  return templateRegistry[key] ?? null;
}