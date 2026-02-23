import { Link } from "react-router-dom";

export type ClickableGridItem = {
  id: string;
  name: string;
  imageUrl: string;
  href: string;
};

export default function ClickableProductGrid({ items }: { items: ClickableGridItem[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
        {items.map((item) => (
          <Link key={item.id} to={item.href} className="group block">
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="aspect-[4/5] overflow-hidden bg-black/5">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <div className="text-[0.95rem] tracking-wide text-black/90 leading-snug">
                  {item.name}
                </div>
                <div className="mt-2 text-xs tracking-[0.22em] uppercase text-black/45">
                  View details
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}