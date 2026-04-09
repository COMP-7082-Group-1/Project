import { describe, it, expect } from "vitest";
import {
  getColorPaletteById,
  getColorPalettePresetById,
  DEFAULT_GREEN_FOREST_PALETTE,
  COLOR_PALETTE_PRESETS,
} from "@/lib/events/color-palettes";

describe("getColorPaletteById", () => {
  it("returns the default palette for null", () => {
    expect(getColorPaletteById(null)).toEqual(DEFAULT_GREEN_FOREST_PALETTE);
  });

  it("returns the default palette for undefined", () => {
    expect(getColorPaletteById(undefined)).toEqual(DEFAULT_GREEN_FOREST_PALETTE);
  });

  it("returns the default palette for an empty string", () => {
    expect(getColorPaletteById("")).toEqual(DEFAULT_GREEN_FOREST_PALETTE);
  });

  it("returns the default palette for an unknown id", () => {
    expect(getColorPaletteById("unknown_id")).toEqual(
      DEFAULT_GREEN_FOREST_PALETTE,
    );
  });

  it("returns the correct palette for green_forest", () => {
    expect(getColorPaletteById("green_forest")).toEqual(
      DEFAULT_GREEN_FOREST_PALETTE,
    );
  });

  it("returns the correct palette for ocean_blue", () => {
    const palette = getColorPaletteById("ocean_blue");
    expect(palette.primary).toBe("#2c5aa0");
    expect(palette.background).toBe("#f0f4f9");
  });

  it("returns the correct palette for blush_pink", () => {
    const palette = getColorPaletteById("blush_pink");
    expect(palette.primary).toBe("#b794a1");
  });

  it("returns the correct palette for gold_elegance", () => {
    const palette = getColorPaletteById("gold_elegance");
    expect(palette.accent).toBe("#d4af37");
  });

  it("returns the correct palette for lavender_dream", () => {
    const palette = getColorPaletteById("lavender_dream");
    expect(palette.primary).toBe("#9b8cb2");
  });

  it("returned palette has all required color keys", () => {
    const palette = getColorPaletteById("ocean_blue");
    expect(palette).toHaveProperty("primary");
    expect(palette).toHaveProperty("primary_light");
    expect(palette).toHaveProperty("accent");
    expect(palette).toHaveProperty("accent_light");
    expect(palette).toHaveProperty("background");
    expect(palette).toHaveProperty("accent_secondary");
    expect(palette).toHaveProperty("text");
    expect(palette).toHaveProperty("shadow_hue");
  });
});

describe("getColorPalettePresetById", () => {
  it("returns the first preset for null", () => {
    expect(getColorPalettePresetById(null)).toEqual(COLOR_PALETTE_PRESETS[0]);
  });

  it("returns the first preset for undefined", () => {
    expect(getColorPalettePresetById(undefined)).toEqual(
      COLOR_PALETTE_PRESETS[0],
    );
  });

  it("returns undefined for an unknown id", () => {
    expect(getColorPalettePresetById("nonexistent")).toBeUndefined();
  });

  it("returns the correct preset for blush_pink", () => {
    const preset = getColorPalettePresetById("blush_pink");
    expect(preset?.id).toBe("blush_pink");
    expect(preset?.name).toBe("Blush Pink");
  });

  it("returns a preset with id, name, and palette fields", () => {
    const preset = getColorPalettePresetById("ocean_blue");
    expect(preset).toHaveProperty("id");
    expect(preset).toHaveProperty("name");
    expect(preset).toHaveProperty("palette");
  });
});

describe("COLOR_PALETTE_PRESETS", () => {
  it("contains 5 presets", () => {
    expect(COLOR_PALETTE_PRESETS).toHaveLength(5);
  });

  it("includes all expected palette ids", () => {
    const ids = COLOR_PALETTE_PRESETS.map((p) => p.id);
    expect(ids).toContain("green_forest");
    expect(ids).toContain("blush_pink");
    expect(ids).toContain("ocean_blue");
    expect(ids).toContain("gold_elegance");
    expect(ids).toContain("lavender_dream");
  });

  it("every preset has a non-empty name", () => {
    for (const preset of COLOR_PALETTE_PRESETS) {
      expect(preset.name.length).toBeGreaterThan(0);
    }
  });
});
