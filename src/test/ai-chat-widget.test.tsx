import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AiChatWidget } from "@/components/AiChatWidget";

describe("TipTop AI Assistant", () => {
  it("shows a greeting and answers a wheel quick reply", () => {
    render(<AiChatWidget />);

    fireEvent.click(screen.getByRole("button", { name: "Open TipTop AI Assistant" }));

    expect(
      screen.getByText(
        "👋 G'day! Welcome to TipTop Tyres & Wheels. How can I help you find the right tyres or alloy wheels today?",
      ),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Show me Starcorp & SC Racing wheels/ }));

    expect(
      screen.getByText(/Starcorp Racing L2018 Chaos and SR05, plus SC Racing DX136 and 508 styles/),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse the wheels" })).toHaveAttribute(
      "href",
      "/wheels",
    );
  });

  it("answers a custom question submitted in the message field", () => {
    render(<AiChatWidget />);

    fireEvent.click(screen.getByRole("button", { name: "Open TipTop AI Assistant" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Ask TipTop AI Assistant a question" }), {
      target: { value: "What are your workshop opening hours?" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));

    expect(
      screen.getByText(/Monday to Friday, 8:00 AM to 5:00 PM, and Saturday, 8:00 AM to 1:00 PM/),
    ).toBeInTheDocument();
  });
});
