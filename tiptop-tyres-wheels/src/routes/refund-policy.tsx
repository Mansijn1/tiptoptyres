import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Chrome";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({ meta: [
    { title: "Refund & Return Policy | Tiptop Tyres & Wheels" },
    { name: "description", content: "Refunds, returns and exchanges at Tiptop Tyres & Wheels." },
    { property: "og:title", content: "Refund & Return Policy | Tiptop Tyres & Wheels" },
    { property: "og:description", content: "Refunds, returns and exchanges." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => (
    <LegalPage title="Refund & Return Policy">
      <p>Your rights under Australian Consumer Law are not affected by this policy.</p>
      <h2>Unfitted products</h2>
      <p>Unused, unfitted tyres and wheels may be returned within 14 days with proof of purchase.</p>
      <h2>Fitted products</h2>
      <p>Fitted tyres cannot be returned unless faulty. Faulty items are assessed under manufacturer warranty.</p>
      <h2>Refunds</h2>
      <p>Approved refunds are paid to the original payment method within 5 business days.</p>
    </LegalPage>
  ),
});
