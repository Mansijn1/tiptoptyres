import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Chrome";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms & Conditions | Tiptop Tyres & Wheels" },
    { name: "description", content: "Terms and conditions for services and purchases at Tiptop Tyres & Wheels." },
    { property: "og:title", content: "Terms & Conditions | Tiptop Tyres & Wheels" },
    { property: "og:description", content: "Terms for services and purchases." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => (
    <LegalPage title="Terms & Conditions">
      <p>By booking a service or purchasing products from Tiptop Tyres & Wheels you agree to these terms.</p>
      <h2>Quotes and pricing</h2>
      <p>Online quotes are estimates and are confirmed after vehicle inspection. Our price beat offer applies to written quotes from local competitors for the identical product.</p>
      <h2>Bookings</h2>
      <p>Please give at least 24 hours notice to change or cancel an appointment.</p>
      <h2>Warranty</h2>
      <p>Tyres carry the manufacturer warranty. Workmanship is covered as required by Australian Consumer Law.</p>
    </LegalPage>
  ),
});
