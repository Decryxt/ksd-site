import { useMemo, useState } from "react";

import { productCopy } from "../../data/productCopy";

const vestigeImages = import.meta.glob(
  "../../assets/products/vestige/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

type VestigeCategory =
  | "necklaces"
  | "bracelets"
  | "earrings"
  | "high-end-pearls"
  | "belly-chains"
  | "hand-chains"
  | "anklets";

function titleFromFilename(filePath: string) {
  const file = filePath.split("/").pop() || "";
  const base = file.replace(/\.(png|jpg|jpeg|webp)$/i, "");

  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugFromFilename(filePath: string) {
  const file = filePath.split("/").pop() || "";
  const base = file.replace(/\.(png|jpg|jpeg|webp)$/i, "");

  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function categoryLabel(category: VestigeCategory) {
  switch (category) {
    case "necklaces":
      return "Necklaces";

    case "bracelets":
      return "Bracelets";

    case "earrings":
      return "Earrings";

    case "high-end-pearls":
      return "High End Pearl Designs";

    case "belly-chains":
      return "Belly Chains";

    case "hand-chains":
      return "Hand Chains";

    case "anklets":
      return "Anklets";
  }
}

function collectionLabelFromKey(key: string) {
  switch (key) {
    case "golden-hour-muse":
      return "Golden Hour Muse";

    case "one-of-one":
      return "One Of One";

    case "southern-solstice":
      return "Southern Solstice";

    default:
      return key
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

export default function Vestige() {
  const [activeCategory, setActiveCategory] = useState<
    VestigeCategory | "all"
  >("all");

  const [activeCollection, setActiveCollection] = useState("all");

  const allItems = useMemo(() => {
    const categories: VestigeCategory[] = [
      "necklaces",
      "bracelets",
      "earrings",
      "high-end-pearls",
      "belly-chains",
      "hand-chains",
      "anklets",
    ];

    return Object.entries(vestigeImages)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, url], idx) => {
        const slug = slugFromFilename(path);

        let category: VestigeCategory | undefined;
        let productMeta:
          | (typeof productCopy.necklaces extends
              Record<string, infer T>
              ? T
              : never)
          | undefined;

        for (const candidate of categories) {
          const categoryData = productCopy[candidate];

          if (categoryData?.[slug]) {
            category = candidate;
            productMeta = categoryData[slug];
            break;
          }
        }

        return {
          id: `vestige-${idx + 1}`,
          slug,
          name: titleFromFilename(path),
          imageUrl: url,
          category,
          categoryLabel: category
            ? categoryLabel(category)
            : "Jewelry",
          collection: productMeta?.collection,
          collectionLabel: productMeta?.collection
            ? collectionLabelFromKey(productMeta.collection)
            : undefined,
          shortDescription: productMeta?.shortDescription,
          description: productMeta?.description,
          details: productMeta?.details,
        };
      });
  }, []);

  const categoryOptions = useMemo(() => {
    return Array.from(
      new Set(
        allItems
          .map((item) => item.category)
          .filter(Boolean)
      )
    ) as VestigeCategory[];
  }, [allItems]);

  const collectionOptions = useMemo(() => {
    return Array.from(
      new Set(
        allItems
          .map((item) => item.collection)
          .filter(Boolean)
      )
    ) as string[];
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
    <div className="min-h-screen bg-white text-black">
      {/* Hero */}
      <section className="px-6 pb-16 pt-28 text-center md:px-10 md:pb-24 md:pt-40">
        <p className="mb-5 text-[10px] uppercase tracking-[0.38em] text-black/50">
          Katherine Sterling Designs
        </p>

        <h1
          className="text-6xl tracking-wide md:text-8xl"
          style={{ fontFamily: '"Perandory", serif' }}
        >
          Vestige
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-black/65 md:text-base">
          A collection of past Katherine Sterling Designs pieces, preserved as
          part of the story. Explore designs from seasons gone by—pieces that
          were once made for sale and remain part of the KSD story.
        </p>
      </section>

      {/* Category Filters */}
      {categoryOptions.length > 0 && (
        <section className="border-y border-black/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-6 py-6 md:px-10">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition ${
                activeCategory === "all"
                  ? "bg-black text-white"
                  : "text-black/55 hover:text-black"
              }`}
            >
              All
            </button>

            {categoryOptions.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "text-black/55 hover:text-black"
                }`}
              >
                {categoryLabel(category)}
              </button>
            ))}
          </div>

          {/* Collection Filters */}
          {collectionOptions.length > 0 && (
            <div className="border-t border-black/10">
              <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-6 py-5 md:px-10">
                <button
                  type="button"
                  onClick={() => setActiveCollection("all")}
                  className={`px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition ${
                    activeCollection === "all"
                      ? "bg-black text-white"
                      : "text-black/55 hover:text-black"
                  }`}
                >
                  All Collections
                </button>

                {collectionOptions.map((collection) => (
                  <button
                    key={collection}
                    type="button"
                    onClick={() => setActiveCollection(collection)}
                    className={`px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition ${
                      activeCollection === collection
                        ? "bg-black text-white"
                        : "text-black/55 hover:text-black"
                    }`}
                  >
                    {collectionLabelFromKey(collection)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <article key={item.id} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-[#f7f7f5]">
                  <img
                    src={item.imageUrl}
                    alt={`${item.name} — past Katherine Sterling Designs piece`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                <div className="pt-4">
                  <p className="text-[9px] uppercase tracking-[0.28em] text-black/45">
                    {item.collectionLabel || item.categoryLabel}
                  </p>

                  <h2
                    className="mt-2 text-2xl"
                    style={{ fontFamily: '"Perandory", serif' }}
                  >
                    {item.name}
                  </h2>

                  {item.shortDescription && (
                    <p className="mt-2 max-w-sm text-xs leading-5 text-black/55">
                      {item.shortDescription}
                    </p>
                  )}

                  <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-black/35">
                    Vestige · No longer available
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/45">
              No pieces found
            </p>
          </div>
        )}
      </section>
    </div>
  );
}