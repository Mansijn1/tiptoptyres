import { useEffect, useRef } from "react";
import { ArrowRight, Disc, Gauge } from "lucide-react";

const brands = [
  { name: "Continental", code: "01 / CONTINENTAL", kind: "continental" },
  { name: "Goodyear", code: "02 / GOODYEAR", kind: "goodyear", featured: true },
  { name: "Pirelli", code: "03 / PIRELLI", kind: "pirelli" },
  { name: "Yokohama", code: "04 / YOKOHAMA", kind: "yokohama" },
  { name: "Dunlop", code: "05 / DUNLOP", kind: "dunlop" },
];

const brandCarouselStep = (Math.PI * 2) / brands.length;

function positionBrandCards(
  cards: HTMLElement[],
  rotation: number,
  radius: number,
  arcDepth: number,
  zDepth: number,
  staticLayout = false,
) {
  cards.forEach((card, index) => {
    if (!card) return;
    if (staticLayout) {
      card.style.transform = "none";
      card.style.opacity = "1";
      card.style.zIndex = "auto";
      card.style.pointerEvents = "auto";
      card.inert = false;
      card.setAttribute("aria-hidden", "false");
      return;
    }

    const angle = (index - 1) * brandCarouselStep + rotation;
    const cosine = Math.cos(angle);
    const visibility = Math.max(0, Math.min(1, (cosine + 0.25) / 0.55));
    const scale = 0.78 + Math.max(0, cosine) * 0.22;
    const x = Math.sin(angle) * radius;
    const y = (1 - cosine) * arcDepth;
    const z = (cosine - 1) * zDepth;

    card.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, ${z}px) rotateY(${-angle * 0.65}rad) scale(${scale})`;
    card.style.opacity = String(visibility);
    card.style.zIndex = String(Math.round((cosine + 1) * 50));
    card.style.pointerEvents = visibility > 0.05 ? "auto" : "none";
    card.inert = visibility <= 0.05;
    card.setAttribute("aria-hidden", String(visibility <= 0.05));
  });
}

export function BrandsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const rotationRef = useRef(0);
  const radiusRef = useRef(0);
  const arcDepthRef = useRef(0);
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
      const cardHeight = cardRefs.current[0]?.offsetHeight ?? 0;
      const maxRadius = Math.max(0, (carousel.clientWidth - cardWidth - 20) / 2);
      radiusRef.current = Math.min(cardWidth * 1.25, maxRadius);
      arcDepthRef.current = Math.min(cardHeight * 0.3, carousel.clientWidth * 0.09);
      zDepthRef.current = Math.min(cardWidth * 0.55, carousel.clientWidth * 0.15);
    };

    const draw = () => {
      positionBrandCards(
        cardRefs.current,
        rotationRef.current,
        radiusRef.current,
        arcDepthRef.current,
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

    let frame = 0;
    let previousTime = 0;
    const animate = (time: number) => {
      if (previousTime && !hoveredRef.current && pointerRef.current.id === -1) {
        rotationRef.current =
          (rotationRef.current + Math.min(time - previousTime, 50) * 0.000075) % (Math.PI * 2);
      }
      previousTime = time;
      draw();
      if (!reducedMotion.matches || pointerRef.current.id !== -1) {
        frame = requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      cancelAnimationFrame(frame);
      reducedMotionRef.current = reducedMotion.matches;
      previousTime = 0;
      draw();
      frame = requestAnimationFrame(animate);
    };
    startAnimation();
    reducedMotion.addEventListener("change", startAnimation);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", startAnimation);
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
      <div
        className="pointer-events-none absolute -left-32 top-12 -z-10 h-80 w-80 rounded-full bg-amber-500/10 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[110px]"
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
              arcDepthRef.current,
              zDepthRef.current,
            );
          }}
          onPointerUp={(event) => {
            if (pointerRef.current.id !== event.pointerId) return;
            suppressClickRef.current = pointerRef.current.moved;
            pointerRef.current.id = -1;
          }}
          onPointerCancel={(event) => {
            if (pointerRef.current.id === event.pointerId) pointerRef.current.id = -1;
          }}
          onClickCapture={(event) => {
            if (!suppressClickRef.current) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
          }}
        >
          <div className="brand-marquee-track" role="list">
            {brands.map(({ name, code, kind, featured }, index) => (
              <article
                key={name}
                ref={(node) => {
                  if (node) cardRefs.current[index] = node;
                }}
                role="listitem"
                aria-hidden={index !== 1}
                className={`brand-marquee-card group absolute left-1/2 top-[38%] flex flex-col overflow-hidden rounded-3xl border bg-slate-50 p-3 text-slate-900 shadow-[0_20px_44px_rgba(0,0,0,0.38)] sm:p-6 ${
                  featured ? "border-amber-300" : "border-white/80"
                }`}
              >
                {featured && (
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.16),_transparent_62%)]"
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.14em] text-slate-500">
                    {code}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,0.75)]" />
                </div>

                <div
                  className="brand-emblem relative my-5 flex h-40 items-center justify-center"
                  aria-hidden="true"
                >
                  {kind === "continental" && (
                    <>
                      <div className="brand-tire-art relative flex h-32 w-24 items-center justify-center rounded-[42%] border-[9px] border-[#080a0e] bg-[repeating-linear-gradient(0deg,#17202a_0_5px,#34404a_5px_8px,#111820_8px_13px)] shadow-[inset_5px_0_9px_#000,0_14px_24px_rgba(0,0,0,.65)]">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/70 bg-black/80 text-3xl text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,.85)]">
                          ♞
                        </div>
                        <span className="brand-scan-beam absolute inset-x-[-35%] top-0 h-[2px] bg-amber-200 shadow-[0_0_8px_2px_#fbbf24]" />
                      </div>
                      <span className="absolute h-36 w-36 rounded-full border border-dashed border-amber-400/30" />
                    </>
                  )}
                  {kind === "goodyear" && (
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-amber-300/60 bg-[radial-gradient(circle,_rgba(245,158,11,0.18),_transparent_68%)] text-amber-700 drop-shadow-[0_0_16px_rgba(245,158,11,0.3)]">
                      <div className="absolute inset-2 rounded-full border border-dashed border-amber-300/35" />
                      <div className="flex -rotate-12 flex-col items-center">
                        <div className="mb-1 flex items-end gap-[3px]">
                          {[3, 5, 7, 9, 7, 5, 3].map((height, barIndex) => (
                            <span
                              key={barIndex}
                              className="w-[3px] rounded-full bg-amber-600/90"
                              style={{ height: `${height * 2}px` }}
                            />
                          ))}
                        </div>
                        <span className="font-display text-4xl font-black italic leading-none">
                          G
                        </span>
                        <span className="mt-1 h-[3px] w-12 rounded-full bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                      </div>
                    </div>
                  )}
                  {kind === "pirelli" && (
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-red-500/50 shadow-[0_0_22px_rgba(239,68,68,0.18),inset_0_0_20px_rgba(239,68,68,0.08)]">
                      <div className="absolute inset-2 rounded-full border-[3px] border-red-500/35" />
                      <span className="font-display text-2xl font-black italic tracking-[-0.09em] text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.65)]">
                        PIRELLI
                      </span>
                    </div>
                  )}
                  {kind === "yokohama" && (
                    <div className="relative flex h-36 w-36 items-center justify-center">
                      <div className="absolute inset-1 rounded-full border border-dashed border-sky-300/30" />
                      <div className="brand-speed-ring absolute inset-3 rounded-full border-[3px] border-transparent border-t-sky-300/80 border-r-sky-300/30" />
                      <div className="absolute inset-5 rounded-full border border-sky-300/20" />
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/30 bg-red-500/10 shadow-[0_0_24px_rgba(239,68,68,0.2)]">
                        <span className="font-display text-5xl font-black italic text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.65)]">
                          Y
                        </span>
                      </div>
                      <Gauge className="absolute bottom-1 right-0 h-4 w-4 text-sky-300/70" />
                    </div>
                  )}
                  {kind === "dunlop" && (
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-[5px] border-slate-400/60 bg-[conic-gradient(from_30deg,#65717c,#151a20,#8a949c,#252b32,#65717c)] shadow-[inset_0_0_0_3px_#111820,0_14px_22px_rgba(0,0,0,.55)]">
                      <div className="flex h-[72%] w-[72%] items-center justify-center rounded-full border border-slate-400/50 bg-[radial-gradient(circle_at_35%_25%,#424b54,#0b0f14_72%)] shadow-[inset_0_0_16px_#000]">
                        <span className="font-display text-6xl font-black italic text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.55)]">
                          D
                        </span>
                      </div>
                      <Disc className="absolute -right-1 -top-1 h-5 w-5 text-slate-300/70" />
                    </div>
                  )}
                </div>

                <div className="relative z-10 mt-auto border-t border-slate-200 pt-4">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-slate-950">
                    {name}
                  </h3>
                  <a
                    href="#quick-tyre-finder"
                    className="group/link mt-3 inline-flex min-h-11 items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-600 transition-colors hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    View Stock
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1 group-hover/link:text-amber-700" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
