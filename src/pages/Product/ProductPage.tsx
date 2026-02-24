// src/pages/Product/ProductPage.tsx
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

function formatUSD(value?: number) {
  if (typeof value !== "number") return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

/**
 * "Large Pearl Cross Necklace Hero.png" -> "large-pearl-cross-necklace"
 */
function toSlugFromHeroFilename(path: string) {
  const file = path.split("/").pop() || "";
  const base = file.replace(/\.(png|jpg|jpeg|webp)$/i, "");

  const cleaned = base
    .replace(/\bhero\b/i, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildHeroMap(modules: Record<string, string>) {
  return Object.entries(modules).reduce((acc, [path, url]) => {
    const s = toSlugFromHeroFilename(path);
    acc[s] = url;
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Dedicated Hero loaders:
 * Put hero images in these folders:
 *  - src/assets/products/necklaces/Hero/
 *  - src/assets/products/bracelets/Hero/
 *  - src/assets/products/earrings/Hero/
 *  - src/assets/products/high-end-pearls/Hero/
 *
 * Filenames should end with "Hero" so slug-matching is consistent:
 *  "Heart Of Gold Bracelet Hero.png" -> "heart-of-gold-bracelet"
 */

// Necklaces
const necklaceHeroModules = import.meta.glob(
  "../../assets/products/necklaces/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;
const necklaceHeroBySlug = buildHeroMap(necklaceHeroModules);

// Bracelets
const braceletHeroModules = import.meta.glob(
  "../../assets/products/bracelets/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;
const braceletHeroBySlug = buildHeroMap(braceletHeroModules);

// Earrings
const earringHeroModules = import.meta.glob(
  "../../assets/products/earrings/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;
const earringHeroBySlug = buildHeroMap(earringHeroModules);

// High End Pearls (support both common folder naming patterns, just in case)
const highEndPearlsHeroModulesA = import.meta.glob(
  "../../assets/products/high-end-pearls/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const highEndPearlsHeroModulesB = import.meta.glob(
  "../../assets/products/high-end-pearl-designs/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const highEndPearlsHeroBySlug = buildHeroMap({
  ...highEndPearlsHeroModulesA,
  ...highEndPearlsHeroModulesB,
});

// One lookup for all categories
const heroByCategory: Record<CategoryKey, Record<string, string>> = {
  necklaces: necklaceHeroBySlug,
  bracelets: braceletHeroBySlug,
  earrings: earringHeroBySlug,
  "high-end-pearls": highEndPearlsHeroBySlug,
};

export default function ProductPage() {
  const { category, slug } = useParams<Params>();
  const [searchParams] = useSearchParams();

  // fallback: clicked card image (query param)
  const clickedImg = searchParams.get("img") || "";

  const { scrollY } = useScroll();

  // Keeps the elegant "fade quickly once scroll starts" behavior
  const titleOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const titleY = useTransform(scrollY, [0, 120], [0, -18]);

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

  // Dedicated hero override (all categories), otherwise fallback to clicked image
  const categoryHeroMap = heroByCategory[category] || {};
  const heroImg = categoryHeroMap[slug] || clickedImg;

  const custom = productCopy?.[category]?.[slug];
  const fallback = getFallbackCopy(category);

  const title = custom?.title ?? titleFromSlug(slug);
  const shortDescription = custom?.shortDescription ?? fallback.shortDescription;
  const description = custom?.description ?? fallback.description;
  const details = custom?.details ?? fallback.details;

  // NEW: PRICE
  const priceText = formatUSD(custom?.price);

  return (
    <div className="bg-white text-black">
      {/* HERO (smaller, "old style": black title + fade-to-white at bottom) */}
      <section className="relative w-full overflow-hidden">
        {/* Reduced height so it doesn't eat the screen */}
        <div className="relative w-full h-[60vh] md:h-[68vh]">
          {heroImg ? (
            <img
              src={heroImg}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-black/5" />
          )}

          {/* OLD STYLE OVERLAY:
              - subtle dark at top for nav readability
              - fades to white at bottom for the page transition
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />

          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 z-10 mx-auto max-w-6xl px-6 pt-6">
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

          {/* Title Overlay (BLACK, fades out when scroll begins) */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute bottom-0 left-0 right-0 z-10 mx-auto max-w-6xl px-6 pb-10 md:pb-12"
          >
            <div className="max-w-3xl">
              <div className="text-black/45 text-xs tracking-[0.28em] uppercase">
                {categoryLabel(category)}
              </div>

              {/* FORCE Perandory */}
              <h1
                className="mt-3 text-4xl md:text-6xl leading-[1.02] tracking-[-0.01em] text-black"
                style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
              >
                {title}
              </h1>

              <p className="mt-5 text-black/60 text-base md:text-lg leading-relaxed">
                {shortDescription}
              </p>

              {/* Optional subtle price in hero area */}
              {priceText ? (
                <div className="mt-3 text-black/55 text-sm tracking-wide">{priceText}</div>
              ) : null}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="text-black/55 text-xs tracking-[0.28em] uppercase">
                Product Description
              </div>

              <p className="mt-6 text-black/70 leading-relaxed">{description}</p>

              {details?.length ? (
                <ul className="mt-8 space-y-3 text-black/65 text-sm">
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

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-black/10 bg-white p-8 sticky top-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="text-black/55 text-xs tracking-[0.28em] uppercase">
                Purchase
              </div>

              <div className="mt-5">
                <div className="text-black/90 text-lg">{title}</div>

                {priceText ? (
                  <div className="text-black/70 mt-2 text-sm tracking-wide">{priceText}</div>
                ) : (
                  <div className="text-black/55 mt-2 text-sm">
                    Add a price in <span className="font-mono">productCopy.ts</span>
                  </div>
                )}
              </div>

              <button
                className="mt-8 w-full rounded-xl border border-black/15 bg-black/5 hover:bg-black/10 transition py-3 text-sm tracking-wide"
                type="button"
              >
                Add to Bag (coming soon)
              </button>

              <p className="mt-5 text-black/50 text-xs leading-relaxed">
                Next: structured metadata, pricing logic, and gallery system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}