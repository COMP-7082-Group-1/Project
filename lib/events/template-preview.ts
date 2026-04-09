/** Shared types for event template data and helper functions for formatting and parsing template content. */
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
  color_palette?: ColorPalette | string | null;
};

export type TemplateRecord = {
  id: string;
  name: string;
  key: string;
  image: string | null;
  created_at?: string;
  updated_at?: string;
};

/** Formats an ISO date string into a human-readable full date and time using the en-CA locale. */
export function formatPreviewDate(dateString: string) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

/** Escapes special regex characters in a string so it can be used safely in a RegExp constructor. */
export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Extracts the first `((placeholder))` token from an HTML snippet, or returns null if none is found. */
export function extractPlaceholderText(htmlSnippet: string | null | undefined) {
  if (!htmlSnippet) return null;

  const match = htmlSnippet.match(/\(\((.*?)\)\)/);
  if (!match) return null;

  return match[0];
}

