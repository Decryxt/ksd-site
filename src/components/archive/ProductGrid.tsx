type ProductCard = {
  id: string;
  name: string;
  price?: string;
  imageUrl: string; // imported asset or URL
};

type Props = {
  items: ProductCard[];
};

export default function ProductGrid({ items }: Props) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-14">
          {items.map((p) => (
            <article key={p.id} className="group">
              {/* 4:5 ratio box */}
              <div
                className="relative w-full overflow-hidden bg-black/5"
                style={{ aspectRatio: "4 / 5" }}
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.30em] text-black/55">
                    Katherine Sterling Designs
                  </p>
                  <h3 className="mt-2 text-sm tracking-tight text-black">{p.name}</h3>
                </div>

                {p.price ? (
                  <p className="text-[11px] uppercase tracking-[0.30em] text-black/60">
                    {p.price}
                  </p>
                ) : null}
              </div>

              <div className="mt-4 h-px w-full bg-black/10 transition-colors group-hover:bg-black/20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}