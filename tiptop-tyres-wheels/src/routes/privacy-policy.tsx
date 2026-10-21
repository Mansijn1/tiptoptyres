import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Chrome";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [
    { title: "Privacy Policy | Tiptop Tyres & Wheels" },
    { name: "description", content: "How Tiptop Tyres & Wheels collects and uses your personal information." },
    { property: "og:title", content: "Privacy Policy | Tiptop Tyres & Wheels" },
    { property: "og:description", content: "How we collect and use your personal information." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => (
    <LegalPage title="Privacy Policy">
      <p>Tiptop Tyres & Wheels respects your privacy and handles personal information in line with the Australian Privacy Principles.</p>
      <h2>What we collect</h2>
      <p>Your name, phone number, email, vehicle details and registration when you book a service or request a quote.</p>
      <h2>How we use it</h2>
      <p>To confirm bookings, prepare the right tyres and parts, and contact you about your service. We do not sell your information.</p>
      <h2>Contact</h2>
      <p>Questions about privacy can be sent to info@tiptoptyres.com.au.</p>
    </LegalPage>
  ),
});
