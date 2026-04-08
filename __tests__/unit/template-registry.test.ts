import { describe, it, expect, vi } from "vitest";

vi.mock("@/components/templates/GreenForestTemplate", () => ({
  default: () => null,
}));

import {
  getTemplateComponent,
  templateRegistry,
} from "@/lib/events/template-registry";

describe("getTemplateComponent", () => {
  it("returns a component for the registered 'green_forest' key", () => {
    const component = getTemplateComponent("green_forest");
    expect(component).not.toBeNull();
  });

  it("returns null for an unregistered template key", () => {
    expect(getTemplateComponent("unknown_template")).toBeNull();
  });

  it("returns null for a null input", () => {
    expect(getTemplateComponent(null)).toBeNull();
  });

  it("returns null for an undefined input", () => {
    expect(getTemplateComponent(undefined)).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(getTemplateComponent("")).toBeNull();
  });
});

describe("templateRegistry", () => {
  it("contains the green_forest template", () => {
    expect(templateRegistry).toHaveProperty("green_forest");
  });

  it("green_forest entry is a function", () => {
    expect(typeof templateRegistry["green_forest"]).toBe("function");
  });
});
