import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { getFallbackCopy, productCopy, type CategoryKey } from "../../data/productCopy";

type Params = {
  category?: CategoryKey;
  slug?: string;
};

function titleFromSlug(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function categoryLabel(category: CategoryKey) {
  switch (category) {
    case "necklaces":
      return "Necklaces";
    case "bracelets":
      return "Bracelets";
    case "earrings":
      return "Earrings";
    case "high-end-pearls":
      return "High End Pearl Designs";
  }
}

function categoryBackHref(category: CategoryKey) {
  switch (category) {
    case "necklaces":
      return "/archive/necklaces";
    case "bracelets":
      return "/archive/bracelets";
    case "earrings":
      return "/archive/earrings";
    case "high-end-pearls":
      return "/archive/high-end-pearl-designs";
  }
}

export default function ProductPage() {
  const { category, slug } = useParams<Params>();
  const [searchParams] = useSearchParams();
  const heroImg = searchParams.get("img") || "";

  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 90], [1, 0]);
  const titleY = useTransform(scrollY, [0, 140], [0, -18]);

  if (!category || !slug) {
    return (
      <div className="min-h-[70vh] bg-white text-black flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <p className="text-black/70">That product could not be found.</p>
          <Link to="/archive/necklaces" className="mt-6 inline-block underline underline-offset-4">
            Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  const custom = productCopy?.[category]?.[slug];
  const fallback = getFallbackCopy(category);

  const title = custom?.title ?? titleFromSlug(slug);
  const shortDescription = custom?.shortDescription ?? fallback.shortDescription;
  const description = custom?.description ?? fallback.description;
  const details = custom?.details ?? fallback.details;

  return (
    <div className="bg-white text-black">
      {/* HERO */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        {/* REAL hero image */}
        {heroImg ? (
          <img
            src={heroImg}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-black/5" />
        )}

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-white" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-6">
          <div className="flex items-center justify-between">
            <Link
              to={categoryBackHref(category)}
              className="text-black/60 hover:text-black transition text-sm tracking-wide"
            >
              ← Back to {categoryLabel(category)}
            </Link>

            <div className="text-black/45 text-xs tracking-[0.28em] uppercase">
              Katherine Sterling Designs
            </div>
          </div>
        </div>

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative z-10 mx-auto max-w-6xl px-6 h-full flex items-end pb-14"
        >
          <div className="max-w-3xl">
            <div className="text-black/45 text-xs tracking-[0.28em] uppercase">
              {categoryLabel(category)}
            </div>

            <h1 className="mt-3 text-4xl md:text-6xl leading-[1.02] tracking-[-0.01em]">
              {title}
            </h1>

            <p className="mt-5 text-black/60 text-base md:text-lg leading-relaxed">
              {shortDescription}
            </p>
          </div>
        </motion.div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-black/10 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="text-black/55 text-xs tracking-[0.28em] uppercase">
                Product Description
              </div>

              <p className="mt-4 text-black/70 leading-relaxed">
                {description}
              </p>

              {details?.length ? (
                <ul className="mt-6 space-y-2 text-black/65 text-sm">
                  {details.map((d, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mt-[7px] h-[5px] w-[5px] rounded-full bg-black/35 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-black/10 bg-white p-7 sticky top-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="text-black/55 text-xs tracking-[0.28em] uppercase">
                Purchase
              </div>

              <div className="mt-4">
                <div className="text-black/90 text-lg">{title}</div>
                <div className="text-black/55 mt-1 text-sm">Pricing + checkout comes next</div>
              </div>

              <button
                className="mt-6 w-full rounded-xl border border-black/15 bg-black/5 hover:bg-black/10 transition py-3 text-sm tracking-wide"
                type="button"
              >
                Add to Bag (coming soon)
              </button>

              <p className="mt-4 text-black/50 text-xs leading-relaxed">
                Next: gallery + real metadata per product.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}