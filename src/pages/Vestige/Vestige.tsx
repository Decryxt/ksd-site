import { useMemo, useState } from "react";

import { productCopy, getFallbackCopy } from "../../data/productCopy";

const vestigeImages = import.meta.glob(
  "../../assets/products/vestige/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
) as Record<string, string>;

type CategoryKey =
  | "necklaces"
  | "bracelets"
  | "earrings"
  | "belly-chains"
  | "anklets"
  | "high-end-pearls";

type VestigeItem = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  category: CategoryKey;
  collection?: string;
  shortDescription: string;
  description: string;
  details: string[];
};

const categories: CategoryKey[] = [
  "necklaces",
  "bracelets",
  "earrings",
  "belly-chains",
  "anklets",
  "high-end-pearls",
];

function titleFromFilename(filePath: string) {
  const file = filePath.split("/").pop() || "";

  const base = file.replace(/\.(png|jpg|jpeg|webp)$/i, "");

  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function slugFromFilename(filePath: string) {
  const file = filePath.split("/").pop() || "";

  const base = file.replace(/\.(png|jpg|jpeg|webp)$/i, "");

  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function categoryLabel(category: CategoryKey) {
  switch (category) {
    case "necklaces":
      return "Necklaces";

    case "bracelets":
      return "Bracelets";

    case "earrings":
      return "Earrings";

    case "belly-chains":
      return "Belly Chains";

    case "anklets":
      return "Anklets";

    case "high-end-pearls":
      return "High End Pearls";
  }
}

function collectionLabel(collection: string) {
  switch (collection) {
    case "golden-hour-muse":
      return "Golden Hour Muse";

    case "one-of-one":
      return "One Of One";

    case "southern-solstice":
      return "Southern Solstice";

    default:
      return collection
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
  }
}

function findProduct(slug: string) {
  for (const category of categories) {
    const categoryProducts = productCopy[category];

    const product = categoryProducts?.[slug];

    if (product) {
      const fallback = getFallbackCopy(category);

      return {
        category,
        product: {
          shortDescription:
            product.shortDescription ?? fallback.shortDescription,
          description: product.description ?? fallback.description,
          details: product.details ?? fallback.details,
          collection: product.collection,
        },
      };
    }
  }

  return null;
}

export default function Vestige() {
  const [activeCategory, setActiveCategory] = useState<
    CategoryKey | "all"
  >("all");

  const [activeCollection, setActiveCollection] = useState("all");

  const allItems = useMemo<VestigeItem[]>(() => {
    return Object.entries(vestigeImages)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, imageUrl], index) => {
        const slug = slugFromFilename(path);
        const match = findProduct(slug);

        /*
         * If a Vestige image does not have matching product data,
         * we still display it instead of hiding the image.
         */
        const category = match?.category ?? "high-end-pearls";

        const fallback = getFallbackCopy(category);

        return {
          id: `vestige-${index + 1}`,
          slug,
          name: titleFromFilename(path),
          imageUrl,
          category,
          collection: match?.product.collection,
          shortDescription:
            match?.product.shortDescription ?? fallback.shortDescription,
          description:
            match?.product.description ?? fallback.description,
          details: match?.product.details ?? fallback.details,
        };
      });
  }, []);

  const collectionOptions = useMemo(() => {
    return Array.from(
      new Set(
        allItems
          .map((item) => item.collection)
          .filter((collection): collection is string => Boolean(collection))
      )
    );
  }, [allItems]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const categoryMatches =
        activeCategory === "all" ||
        item.category === activeCategory;

      const collectionMatches =
        activeCollection === "all" ||
        item.collection === activeCollection;

      return categoryMatches && collectionMatches;
    });
  }, [activeCategory, activeCollection, allItems]);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="px-6 pb-16 pt-32 text-center md:px-10 md:pb-24 md:pt-44">
        <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-black/45">
          Katherine Sterling Designs
        </p>

        <h1
          className="text-7xl leading-none tracking-wide md:text-9xl"
          style={{ fontFamily: '"Perandory", serif' }}
        >
          Vestige
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-black/60 md:text-base md:leading-8">
          A collection of pieces from the Katherine Sterling Designs archive—
          designs once made for sale and now preserved as part of the story.
        </p>
      </section>

      {/* =========================================================
          FILTERS
      ========================================================= */}

      <section className="border-y border-black/10">
        {/* Product Type */}
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-2 px-6 py-6 md:px-10">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 text-[9px] uppercase tracking-[0.28em] transition ${
              activeCategory === "all"
                ? "bg-black text-white"
                : "text-black/50 hover:text-black"
            }`}
          >
            All Pieces
          </button>

          {categories.map((category) => {
            const hasItems = allItems.some(
              (item) => item.category === category
            );

            if (!hasItems) return null;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-[9px] uppercase tracking-[0.28em] transition ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "text-black/50 hover:text-black"
                }`}
              >
                {categoryLabel(category)}
              </button>
            );
          })}
        </div>

        {/* Collections */}
        {collectionOptions.length > 0 && (
          <div className="border-t border-black/10">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-2 px-6 py-5 md:px-10">
              <button
                type="button"
                onClick={() => setActiveCollection("all")}
                className={`px-4 py-2 text-[9px] uppercase tracking-[0.28em] transition ${
                  activeCollection === "all"
                    ? "bg-black text-white"
                    : "text-black/50 hover:text-black"
                }`}
              >
                All Collections
              </button>

              {collectionOptions.map((collection) => (
                <button
                  key={collection}
                  type="button"
                  onClick={() => setActiveCollection(collection)}
                  className={`px-4 py-2 text-[9px] uppercase tracking-[0.28em] transition ${
                    activeCollection === collection
                      ? "bg-black text-white"
                      : "text-black/50 hover:text-black"
                  }`}
                >
                  {collectionLabel(collection)}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* =========================================================
          PIECES
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <article key={item.id} className="group">
                {/* Image */}
                <div className="aspect-[4/5] overflow-hidden bg-[#f7f7f5]">
                  <img
                    src={item.imageUrl}
                    alt={`${item.name} — Katherine Sterling Designs`}
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                    loading="lazy"
                  />
                </div>

                {/* Information */}
                <div className="pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[8px] uppercase tracking-[0.3em] text-black/40">
                      {categoryLabel(item.category)}
                    </p>

                    {item.collection && (
                      <p className="text-right text-[8px] uppercase tracking-[0.25em] text-black/35">
                        {collectionLabel(item.collection)}
                      </p>
                    )}
                  </div>

                  <h2
                    className="mt-2 text-2xl leading-tight"
                    style={{ fontFamily: '"Perandory", serif' }}
                  >
                    {item.name}
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-black/55">
                    {item.shortDescription}
                  </p>

                  <p className="mt-3 text-[8px] uppercase tracking-[0.28em] text-black/30">
                    Vestige · No longer available
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-[9px] uppercase tracking-[0.35em] text-black/40">
              No pieces found
            </p>
          </div>
        )}
      </section>
    </main>
  );
}