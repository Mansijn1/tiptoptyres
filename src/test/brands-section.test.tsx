import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrandsSection } from "@/components/BrandsSection";

describe("BrandsSection", () => {
  it("renders all brands in an accessible, duplicated marquee row", () => {
    const { container } = render(<BrandsSection />);

    const list = screen.getByRole("list", { name: "Tyre brands we stock and fit" });
    const track = container.querySelector(".brand-marquee-track");

    expect(within(list).getAllByRole("listitem")).toHaveLength(13);
    expect(within(list).getAllByRole("link", { name: /Explore Range/ })).toHaveLength(13);
    expect(track?.children).toHaveLength(2);
    expect(track?.children[1]?.getAttribute("aria-hidden")).toBe("true");
    expect(within(list).getAllByText("Michelin")[0]).toBeVisible();
    expect(within(list).getAllByText("BFGoodrich")[0]).toBeVisible();
  });
});
