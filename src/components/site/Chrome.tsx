import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, MapPin, Mail, Facebook, Instagram, Music2 } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-graphite-line bg-graphite text-ink-foreground">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/tiptop-tyres-logo.png"
            alt="Tiptop Tyres & Wheels"
            className="h-14 w-auto object-contain"
          />
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-medium lg:gap-7 md:flex">
          <a href="/#quick-tyre-finder" className="text-ink-muted hover:text-primary">
            Find Tyres
          </a>
          <a href="/#services" className="text-ink-muted hover:text-primary">
            Services
          </a>
          <a href="/#brands" className="text-ink-muted hover:text-primary">
            Brands
          </a>
          <a href="/#location" className="text-ink-muted hover:text-primary">
            Location
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={BUSINESS.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold lg:flex"
          >
            <Phone className="h-4 w-4 text-primary" /> {BUSINESS.phone}
          </a>
          <a
            href="/#booking"
            className="rounded-md bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:bg-accent"
          >
            Book Now
          </a>
        </div>
        <nav
          aria-label="Main navigation"
          className="flex w-full items-center justify-between gap-3 overflow-x-auto border-t border-white/10 py-1 text-xs font-semibold md:hidden"
        >
          <a
            href="/#quick-tyre-finder"
            className="flex min-h-11 items-center whitespace-nowrap px-1 text-ink-muted hover:text-primary"
          >
            Find Tyres
          </a>
          <a
            href="/#services"
            className="flex min-h-11 items-center whitespace-nowrap px-1 text-ink-muted hover:text-primary"
          >
            Services
          </a>
          <a
            href="/#brands"
            className="flex min-h-11 items-center whitespace-nowrap px-1 text-ink-muted hover:text-primary"
          >
            Brands
          </a>
          <a
            href="/#location"
            className="flex min-h-11 items-center whitespace-nowrap px-1 text-ink-muted hover:text-primary"
          >
            Location
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#0D0E10] pb-24 pt-16 text-sm text-zinc-400 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/tiptop-tyres-logo.png"
            alt="Tiptop Tyres & Wheels"
            className="h-16 w-auto object-contain"
          />
          <p className="mt-4 max-w-xs leading-6">
            Local tyre and wheel experts. Quality fitting, trusted advice, and a better drive from
            Mount Druitt.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              aria-label="Facebook"
              href="https://facebook.com"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition-colors hover:border-primary hover:text-primary"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              aria-label="Instagram"
              href="https://instagram.com"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              aria-label="TikTok"
              href="https://www.tiktok.com"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition-colors hover:border-primary hover:text-primary"
            >
              <Music2 className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-display font-bold uppercase tracking-wider text-white">
            Quick Links
          </h2>
          {[
            ["Find Tyres", "/#quick-tyre-finder"],
            ["Wheel Alignment", "/#services"],
            ["Puncture Repair", "/#services"],
            ["4WD Wheels", "/#services"],
            ["Safety Checks", "/#services"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="group flex w-fit items-center gap-2 transition-colors hover:text-primary"
            >
              <ArrowRight
                className="h-3.5 w-3.5 -translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              />
              {label}
            </a>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="font-display font-bold uppercase tracking-wider text-white">Contact</h2>
          <a
            href={BUSINESS.phoneHref}
            className="flex items-start gap-3 transition-colors hover:text-primary"
          >
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {BUSINESS.phone}
          </a>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="flex items-start gap-3 transition-colors hover:text-primary"
          >
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {BUSINESS.email}
          </a>
          <p className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Mount Druitt, NSW
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-display font-bold uppercase tracking-wider text-white">Legal</h2>
          <Link to="/privacy-policy" className="block transition-colors hover:text-primary">
            Privacy Policy
          </Link>
          <Link to="/terms" className="block transition-colors hover:text-primary">
            Terms &amp; Conditions
          </Link>
          <Link to="/shipping-policy" className="block transition-colors hover:text-primary">
            Shipping Policy
          </Link>
          <Link to="/refund-policy" className="block transition-colors hover:text-primary">
            Refund &amp; Return Policy
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-zinc-800 px-4 pt-6 text-xs sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Tiptop Tyres &amp; Wheels. All rights reserved.</p>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-700 bg-[#121316] px-3 py-2 font-semibold text-zinc-300">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          Open 6 days a week in Mount Druitt
        </span>
        <p className="self-end text-right font-medium text-zinc-500 md:ml-auto">
          Powered by <span className="font-semibold text-zinc-300">JobGen.AI</span>
        </p>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-graphite-line bg-graphite md:hidden">
      <a
        href={BUSINESS.phoneHref}
        className="flex min-h-12 items-center justify-center gap-2 bg-primary px-2 py-3 text-[clamp(0.7rem,3.8vw,0.875rem)] font-bold uppercase text-primary-foreground"
      >
        <Phone className="h-5 w-5" /> Call Now
      </a>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.mapsQuery}`}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-12 items-center justify-center gap-2 px-2 py-3 text-[clamp(0.7rem,3.8vw,0.875rem)] font-bold uppercase text-ink-foreground"
      >
        <MapPin className="h-5 w-5 text-primary" /> Get Directions
      </a>
    </div>
  );
}

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="bg-secondary">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h1 className="text-4xl font-bold uppercase">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: October 2026</p>
          <div className="mt-8 space-y-5 leading-relaxed text-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:uppercase">
            {children}
          </div>
        </div>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
