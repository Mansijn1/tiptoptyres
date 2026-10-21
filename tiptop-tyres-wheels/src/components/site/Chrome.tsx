import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Mail, Facebook, Instagram } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-graphite-line bg-graphite text-ink-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/tiptop-tyres-logo.png"
            alt="Tiptop Tyres & Wheels"
            className="h-14 w-auto object-contain"
          />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          <a href="/#finder" className="text-ink-muted hover:text-primary">Find Tyres</a>
          <a href="/#services" className="text-ink-muted hover:text-primary">Services</a>
          <a href="/#brands" className="text-ink-muted hover:text-primary">Brands</a>
          <a href="/#location" className="text-ink-muted hover:text-primary">Location</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href={BUSINESS.phoneHref} className="hidden items-center gap-2 text-sm font-semibold lg:flex">
            <Phone className="h-4 w-4 text-primary" /> {BUSINESS.phone}
          </a>
          <a href="/#booking" className="rounded-md bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:bg-accent">
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-14 text-ink-foreground md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src="/tiptop-tyres-logo.png"
            alt="Tiptop Tyres & Wheels"
            className="h-20 w-auto object-contain"
          />
          <p className="mt-3 max-w-sm text-sm text-ink-muted">Tyre fitting, balancing, wheel alignment and repairs in Mount Druitt, NSW.</p>
          <div className="mt-5 flex gap-3">
            <a aria-label="Facebook" href="https://facebook.com" className="grid h-9 w-9 place-items-center rounded-md border border-graphite-line hover:border-primary hover:text-primary"><Facebook className="h-4 w-4" /></a>
            <a aria-label="Instagram" href="https://instagram.com" className="grid h-9 w-9 place-items-center rounded-md border border-graphite-line hover:border-primary hover:text-primary"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-display uppercase tracking-wider text-primary">Contact</p>
          <a href={BUSINESS.phoneHref} className="flex gap-2 hover:text-primary"><Phone className="h-4 w-4 shrink-0" />{BUSINESS.phone}</a>
          <a href={`mailto:${BUSINESS.email}`} className="flex gap-2 hover:text-primary"><Mail className="h-4 w-4 shrink-0" />{BUSINESS.email}</a>
          <p className="flex gap-2 text-ink-muted"><MapPin className="h-4 w-4 shrink-0" />{BUSINESS.address}</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-display uppercase tracking-wider text-primary">Legal</p>
          <Link to="/privacy-policy" className="block text-ink-muted hover:text-primary">Privacy Policy</Link>
          <Link to="/terms" className="block text-ink-muted hover:text-primary">Terms & Conditions</Link>
          <Link to="/shipping-policy" className="block text-ink-muted hover:text-primary">Shipping Policy</Link>
          <Link to="/refund-policy" className="block text-ink-muted hover:text-primary">Refund & Return Policy</Link>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-graphite-line px-4 pt-6 text-xs text-ink-muted sm:px-6">
        © {new Date().getFullYear()} Tiptop Tyres & Wheels. All rights reserved.
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-graphite-line bg-graphite md:hidden">
      <a href={BUSINESS.phoneHref} className="flex items-center justify-center gap-2 bg-primary py-4 font-bold uppercase text-primary-foreground">
        <Phone className="h-5 w-5" /> Call Now
      </a>
      <a href={`https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.mapsQuery}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-4 font-bold uppercase text-ink-foreground">
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
