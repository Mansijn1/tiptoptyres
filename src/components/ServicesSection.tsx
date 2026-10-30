import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Wheel Alignment",
    description: "Precision laser alignment to stop pulling and uneven tyre wear.",
    image:
      "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Technician checking a vehicle's wheel alignment in a workshop",
  },
  {
    title: "Passenger Services",
    description: "Quality tyres for hatchbacks, sedans, SUVs and utes.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Modern passenger car viewed from the front",
  },
  {
    title: "Tyre Fitment",
    description: "Fast fitting and computerised balancing for a smooth ride.",
    image:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Vehicle in a workshop undergoing tyre fitting and service",
  },
  {
    title: "4WD & Off-Road Wheels",
    description: "All-terrain and mud-terrain tyres, alloys and lift-ready setups.",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Rugged four-wheel-drive vehicle ready for an off-road trip",
  },
  {
    title: "Puncture & Tyre Repairs",
    description: "Plug and patch repairs done to Australian standards.",
    image:
      "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Technician performing a hands-on repair in a vehicle workshop",
  },
  {
    title: "Tyre Pressure Checks",
    description: "Pressure and tread checks to help keep every trip safe.",
    image:
      "https://images.pexels.com/photos/3806280/pexels-photo-3806280.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Technician inspecting a vehicle tyre and wheel",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-white px-6 py-16 text-zinc-950 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
          What we do
        </p>
        <h2 className="mb-4 text-4xl font-black uppercase tracking-tight text-black sm:text-5xl">
          Workshop services
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          Expert tyre care and wheel services, backed by quality workmanship and a local team.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map(({ title, description, image, imageAlt }) => (
            <article
              key={title}
              className="services-section-card group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-white shadow-2xl transition-all duration-300 hover:scale-[1.02] sm:p-8"
            >
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="mb-6 h-56 w-full rounded-2xl object-cover sm:h-64"
              />
              <h3 className="text-xl font-black uppercase leading-tight tracking-tight sm:text-2xl">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
              <a
                href="#booking"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-900"
              >
                Book this service
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
