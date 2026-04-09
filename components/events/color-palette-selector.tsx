"use client";

/** Grid of preset color palette swatches for choosing an event's color scheme. */
import { COLOR_PALETTE_PRESETS } from "@/lib/events/color-palettes";

type ColorPaletteSelectorProps = {
  value?: string | null;
  onChange: (value: string) => void;
};

export function ColorPaletteSelector({
  value,
  onChange,
}: ColorPaletteSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Color Theme</label>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {COLOR_PALETTE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onChange(preset.id)}
            className={`relative rounded-lg border-2 p-3 transition-all ${
              value === preset.id
                ? "border-primary shadow-lg"
                : "border-border hover:border-muted-foreground"
            }`}
            title={preset.name}
          >
            <div className="mb-2 space-y-1">
              <div className="flex gap-1">
                <div
                  className="h-3 w-3 rounded"
                  style={{ backgroundColor: preset.palette.primary }}
                />
                <div
                  className="h-3 w-3 rounded"
                  style={{ backgroundColor: preset.palette.accent }}
                />
              </div>
              <div className="flex gap-1">
                <div
                  className="h-3 w-3 rounded"
                  style={{ backgroundColor: preset.palette.background }}
                />
                <div
                  className="h-3 w-3 rounded"
                  style={{ backgroundColor: preset.palette.accent_secondary }}
                />
              </div>
            </div>
            <p className="text-xs font-medium text-center">{preset.name}</p>
            {value === preset.id && (
              <div className="absolute top-1 right-1">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs">
                  ✓
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
