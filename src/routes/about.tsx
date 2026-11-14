import { createFileRoute } from "@tanstack/react-router";
import { AboutUs } from "@/components/AboutUs";
import { Footer, Header, MobileBar } from "@/components/site/Chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | TipTop Tyres & Wheels" },
      {
        name: "description",
        content:
          "Meet the TipTop Tyres & Wheels team in Mount Druitt. Quality tyre advice, precision fitment and trusted service for Australian roads.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutUs />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
