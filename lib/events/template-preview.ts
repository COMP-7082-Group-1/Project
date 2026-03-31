import type { ColorPalette } from "./color-palettes";

export type EventTemplateData = {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  start_time: string;
  main_image_url: string;
  video_url: string;
  google_maps_link: string;
  color_palette_id?: string | null;
  color_palette?: ColorPalette;
};

export type TemplateRecord = {
  id: string;
  name: string;
  key: string;
  image: string | null;
  created_at?: string;
  updated_at?: string;
};

export function formatPreviewDate(dateString: string) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function extractPlaceholderText(htmlSnippet: string | null | undefined) {
  if (!htmlSnippet) return null;

  const match = htmlSnippet.match(/\(\((.*?)\)\)/);
  if (!match) return null;

  return match[0];
}

