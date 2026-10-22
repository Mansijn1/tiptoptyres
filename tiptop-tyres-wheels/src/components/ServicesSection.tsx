import { ArrowRight, Car, CircleDot, Crosshair, Mountain, ShieldCheck, Wrench } from "lucide-react";

const services = [
  {
    icon: Crosshair,
    title: "Wheel Alignment",
    description: "Precision laser alignment to stop pulling and uneven tyre wear.",
    image:
      "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1000",
    imageAlt: "Technician checking a vehicle's wheel alignment in a workshop",
  },
  {
    icon: CircleDot,
    title: "Tyre Fitting & Balancing",
    description: "Fast fitting and computerised balancing for a smooth ride.",
    image:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Vehicle in a workshop undergoing tyre fitting and service",
  },
  {
    icon: Wrench,
    title: "Puncture & Tyre Repairs",
    description: "Plug and patch repairs done to Australian standards.",
    image:
      "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=1000",
    imageAlt: "Technician performing a hands-on repair in a vehicle workshop",
  },
  {
    icon: Mountain,
    title: "4WD & Off-Road Wheels",
    description: "All-terrain and mud-terrain tyres, alloys and lift-ready setups.",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Rugged four-wheel-drive vehicle ready for an off-road trip",
  },
  {
    icon: Car,
    title: "Passenger Vehicle Tyres",
    description: "Quality tyres for hatchbacks, sedans, SUVs and utes.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Modern passenger car viewed from the front",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Tread Inspection",
    description: "Tread depth, pressure and sidewall checks before long trips.",
    image:
      "https://images.pexels.com/photos/3806280/pexels-photo-3806280.jpeg?auto=compress&cs=tinysrgb&w=1000",
    imageAlt: "Technician inspecting a vehicle tyre and wheel",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-[#F8F9FA] py-20 text-[#121316] sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">What we do</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl text-4xl font-bold uppercase sm:text-5xl">Workshop services</h2>
          <p className="max-w-md text-sm leading-6 text-zinc-600">
            Expert tyre care and wheel services, backed by quality workmanship and a local team.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description, image, imageAlt }) => (
            <article
              key={title}
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#FFC700] hover:shadow-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="p-6">
                <Icon className="h-8 w-8 text-[#FFC700]" strokeWidth={1.7} aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold uppercase text-[#121316]">{title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-600">{description}</p>
                <a
                  href="#booking"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-amber-700 transition-all duration-300 hover:scale-105 hover:text-[#121316]"
                >
                  Book Service
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
