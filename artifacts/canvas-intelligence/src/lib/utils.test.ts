import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges tailwind classes and resolves conflicts toward the last wins", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("filters falsy inputs", () => {
    // Use non-conflicting utilities so tailwind-merge does not collapse `block` + `flex` to the latter.
    expect(cn("block", false && "hidden", true && "p-4")).toBe("block p-4");
  });

  it("handles conditional class maps from clsx", () => {
    expect(cn({ hidden: false, flex: true })).toBe("flex");
  });
});
