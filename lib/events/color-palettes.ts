export type ColorPalette = {
  primary: string;
  primary_light: string;
  accent: string;
  accent_light: string;
  background: string;
  accent_secondary: string;
  text: string;
  shadow_hue: string;
};

export type ColorPalettePreset = {
  id: string;
  name: string;
  palette: ColorPalette;
};

export const DEFAULT_GREEN_FOREST_PALETTE: ColorPalette = {
  primary: "#5b7343", // green
  primary_light: "#b1bf93", // light-green
  accent: "#d6d989", // yellow
  accent_light: "#fbfdba", // yellow-down
  background: "#f6f2e9", // beige
  accent_secondary: "#a66565", // red
  text: "#5b7343", // green
  shadow_hue: "79deg 26% 66%",
};

export const COLOR_PALETTE_PRESETS: ColorPalettePreset[] = [
  {
    id: "green_forest",
    name: "Green Forest",
    palette: DEFAULT_GREEN_FOREST_PALETTE,
  },
  {
    id: "blush_pink",
    name: "Blush Pink",
    palette: {
      primary: "#b794a1", // dusty pink
      primary_light: "#d7b5c8", // light pink
      accent: "#f4c2a1", // peach
      accent_light: "#fce4d6", // light peach
      background: "#faf6f3", // cream
      accent_secondary: "#9d7068", // terracotta
      text: "#b794a1", // dusty pink
      shadow_hue: "330deg 34% 72%",
    },
  },
  {
    id: "ocean_blue",
    name: "Ocean Blue",
    palette: {
      primary: "#2c5aa0", // ocean blue
      primary_light: "#5b8dd9", // light blue
      accent: "#a8d5ba", // mint
      accent_light: "#d4e8d8", // light mint
      background: "#f0f4f9", // ice white
      accent_secondary: "#e8a77c", // coral
      text: "#2c5aa0", // ocean blue
      shadow_hue: "220deg 45% 62%",
    },
  },
  {
    id: "gold_elegance",
    name: "Gold Elegance",
    palette: {
      primary: "#8b7355", // bronze
      primary_light: "#d4af8f", // champagne
      accent: "#d4af37", // gold
      accent_light: "#f5e6d3", // light gold
      background: "#faf8f4", // ivory
      accent_secondary: "#5c4a42", // dark brown
      text: "#8b7355", // bronze
      shadow_hue: "30deg 42% 58%",
    },
  },
  {
    id: "lavender_dream",
    name: "Lavender Dream",
    palette: {
      primary: "#9b8cb2", // lavender
      primary_light: "#d4c8e8", // light lavender
      accent: "#c9b1d6", // light purple
      accent_light: "#e8e0f0", // very light purple
      background: "#faf7f9", // off-white
      accent_secondary: "#a7856f", // warm taupe
      text: "#9b8cb2", // lavender
      shadow_hue: "270deg 32% 68%",
    },
  },
];





export function getColorPaletteById(
  id: string | null | undefined,
): ColorPalette {
  if (!id) return DEFAULT_GREEN_FOREST_PALETTE;
  const preset = COLOR_PALETTE_PRESETS.find((p) => p.id === id);
  return preset ? preset.palette : DEFAULT_GREEN_FOREST_PALETTE;
}

export function getColorPalettePresetById(
  id: string | null | undefined,
): ColorPalettePreset | undefined {
  if (!id) return COLOR_PALETTE_PRESETS[0];
  return COLOR_PALETTE_PRESETS.find((p) => p.id === id);
}
