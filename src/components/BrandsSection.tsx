import { useEffect, useRef } from "react";

const brands = [
  { name: "Michelin", color: "#174a8b", style: "italic" },
  { name: "Pirelli", color: "#d71920", style: "italic" },
  { name: "Continental", color: "#111827", style: "bold" },
  { name: "Bridgestone", color: "#c8102e", style: "bold" },
  { name: "Goodyear", color: "#174a8b", style: "italic" },
  { name: "Yokohama", color: "#d71920", style: "bold" },
  { name: "Dunlop", color: "#111827", style: "italic" },
  { name: "Hankook", color: "#ed6b21", style: "bold" },
  { name: "Falken", color: "#07599d", style: "italic" },
  { name: "Maxxis", color: "#c8102e", style: "bold" },
  { name: "Kumho", color: "#174a8b", style: "bold" },
  { name: "Toyo", color: "#c8102e", style: "italic" },
  { name: "BFGoodrich", color: "#174a8b", style: "bold" },
] as const;

const brandCarouselStep = (Math.PI * 2) / brands.length;

function positionBrandCards(
  cards: HTMLElement[],
  rotation: number,
  radius: number,
  zDepth: number,
  staticLayout = false,
) {
  cards.forEach((card, index) => {
    if (staticLayout) {
      card.style.transform = "none";
      card.style.opacity = "1";
      card.style.zIndex = "auto";
      card.style.pointerEvents = "auto";
      card.inert = false;
      const link = card.querySelector("a");
      if (link) link.tabIndex = 0;
      card.setAttribute("aria-hidden", "false");
      return;
    }

    const angle = (index - 1) * brandCarouselStep + rotation;
    const cosine = Math.cos(angle);
    const visibility = Math.max(0, Math.min(1, (cosine + 0.15) / 0.65));
    const scale = 0.82 + Math.max(0, cosine) * 0.18;
    const x = Math.sin(angle) * radius;
    const z = (cosine - 1) * zDepth;

    card.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, 0, ${z}px) rotateY(${-angle}rad) scale(${scale})`;
    card.style.opacity = String(visibility);
    card.style.zIndex = String(Math.round((cosine + 1) * 50));
    card.style.pointerEvents = visibility > 0.05 ? "auto" : "none";
    card.inert = visibility <= 0.05;
    const link = card.querySelector("a");
    if (link) link.tabIndex = visibility > 0.5 ? 0 : -1;
    card.setAttribute("aria-hidden", String(visibility <= 0.05));
  });
}

export function BrandsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const rotationRef = useRef(0);
  const radiusRef = useRef(0);
  const zDepthRef = useRef(0);
  const pointerRef = useRef({ id: -1, startX: 0, lastX: 0, moved: false });
  const hoveredRef = useRef(false);
  const suppressClickRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateLayout = () => {
      const cardWidth = cardRefs.current[0]?.offsetWidth ?? 0;
      radiusRef.current = Math.min(
        cardWidth * 1.35,
        Math.max(0, (carousel.clientWidth - cardWidth) / 2),
      );
      zDepthRef.current = cardWidth * 0.7;
    };

    const draw = () => {
      positionBrandCards(
        cardRefs.current,
        rotationRef.current,
        radiusRef.current,
        zDepthRef.current,
        reducedMotion.matches,
      );
    };

    updateLayout();
    draw();
    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
      draw();
    });
    resizeObserver.observe(carousel);

    const interval = window.setInterval(() => {
      if (hoveredRef.current || pointerRef.current.id !== -1 || reducedMotion.matches) return;
      rotationRef.current = (rotationRef.current + brandCarouselStep) % (Math.PI * 2);
      draw();
    }, 2800);

    const handleMotionChange = () => {
      reducedMotionRef.current = reducedMotion.matches;
      draw();
    };
    reducedMotionRef.current = reducedMotion.matches;
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      window.clearInterval(interval);
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <section
      id="brands"
      className="relative isolate overflow-hidden border-y border-slate-800 bg-[#080b11] py-16 text-white sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-950/40 via-[#080b11] to-[#080b11]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-amber-300 sm:text-xs">
            Trusted brands we stock &amp; fit
          </span>
          <h2 className="mt-4 font-display text-[clamp(1.65rem,5vw,2.25rem)] font-black uppercase tracking-wide text-white">
            Performance meets precision
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Explore world-class tyre engineering, stocked and fitted by our team.
          </p>
        </div>

        <div
          ref={carouselRef}
          className="brand-marquee mt-10"
          role="region"
          aria-label="Tyre brands we stock and fit"
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") hoveredRef.current = true;
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") hoveredRef.current = false;
          }}
          onFocusCapture={() => {
            hoveredRef.current = true;
          }}
          onBlurCapture={(event) => {
            const target = event.relatedTarget;
            if (!(target instanceof Node) || !event.currentTarget.contains(target)) {
              hoveredRef.current = false;
            }
          }}
          onPointerDown={(event) => {
            if (
              reducedMotionRef.current ||
              !event.isPrimary ||
              (event.pointerType === "mouse" && event.button !== 0)
            ) {
              return;
            }
            pointerRef.current = {
              id: event.pointerId,
              startX: event.clientX,
              lastX: event.clientX,
              moved: false,
            };
            event.currentTarget.classList.add("is-dragging");
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (pointerRef.current.id !== event.pointerId) return;
            const delta = event.clientX - pointerRef.current.lastX;
            pointerRef.current.lastX = event.clientX;
            pointerRef.current.moved ||= Math.abs(event.clientX - pointerRef.current.startX) > 6;
            rotationRef.current =
              (rotationRef.current + delta / Math.max(radiusRef.current, 1)) % (Math.PI * 2);
            positionBrandCards(
              cardRefs.current,
              rotationRef.current,
              radiusRef.current,
              zDepthRef.current,
            );
          }}
          onPointerUp={(event) => {
            if (pointerRef.current.id !== event.pointerId) return;
            suppressClickRef.current = pointerRef.current.moved;
            pointerRef.current.id = -1;
            event.currentTarget.classList.remove("is-dragging");
          }}
          onPointerCancel={(event) => {
            if (pointerRef.current.id !== event.pointerId) return;
            pointerRef.current.id = -1;
            event.currentTarget.classList.remove("is-dragging");
          }}
          onClickCapture={(event) => {
            if (!suppressClickRef.current) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
          }}
        >
          <div className="brand-marquee-track" role="list">
            {brands.map(({ name, color, style }, index) => (
              <article
                key={name}
                ref={(node) => {
                  if (node) cardRefs.current[index] = node;
                }}
                role="listitem"
                aria-hidden={index !== 1}
                className="brand-marquee-card absolute left-1/2 top-1/2 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-6 text-slate-900 shadow-[0_20px_44px_rgba(0,0,0,0.38)]"
              >
                <span
                  className={`brand-wordmark brand-wordmark-${style}`}
                  style={{ color }}
                  aria-label={name}
                >
                  {name}
                </span>
                <span className="mt-4 h-1 w-10 rounded-full bg-amber-400" aria-hidden="true" />
                <a
                  href="#quick-tyre-finder"
                  className="mt-5 inline-flex min-h-11 items-center text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-600 transition-colors hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  Explore range
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
