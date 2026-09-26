import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges class strings", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });

  it("resolves conflicting Tailwind classes, keeping the last one", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("drops falsy values", () => {
    expect(cn("px-2", false && "hidden", undefined, "text-sm")).toBe("px-2 text-sm");
  });

  it("treats custom display sizes as font sizes, not colors", () => {
    expect(cn("text-display-xl", "text-white")).toBe("text-display-xl text-white");
    expect(cn("text-display-xl", "text-display-md")).toBe("text-display-md");
  });
});
