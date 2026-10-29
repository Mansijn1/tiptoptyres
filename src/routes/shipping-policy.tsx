import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/Chrome";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({ meta: [
    { title: "Shipping Policy | Tiptop Tyres & Wheels" },
    { name: "description", content: "Delivery and collection options for tyres and wheels ordered from Tiptop Tyres & Wheels." },
    { property: "og:title", content: "Shipping Policy | Tiptop Tyres & Wheels" },
    { property: "og:description", content: "Delivery and collection options." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => (
    <LegalPage title="Shipping Policy">
      <p>Most tyres and wheels are fitted in store at our Mount Druitt workshop.</p>
      <h2>Delivery</h2>
      <p>Where delivery is offered, orders are dispatched within 1 to 3 business days. Delivery times depend on your location within Australia.</p>
      <h2>Collection</h2>
      <p>Orders can be collected from Unit 3 / 9 Belomor Avenue, Mount Druitt during business hours.</p>
    </LegalPage>
  ),
});
