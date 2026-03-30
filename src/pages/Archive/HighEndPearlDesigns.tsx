import { useMemo, useState } from "react";
import CategoryHero from "../../components/archive/CategoryHero";
import ClickableProductGrid from "../../components/archive/ClickableProductGrid";
import { productCopy } from "../../data/productCopy";

import heroPearl from "../../assets/HighEndPearlDesignHero.png";

const pearlImages = import.meta.glob(
  "../../assets/products/high-end-pearls/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

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

function collectionLabelFromKey(key: string) {
  switch (key) {
    case "golden-hour-muse":
      return "Golden Hour Muse";
    case "one-of-one":
      return "One Of One";
    default:
      return key
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

export default function HighEndPearlDesigns() {
  const [activeCollection, setActiveCollection] = useState("all");

  const allItems = useMemo(() => {
    return Object.entries(pearlImages)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, url], idx) => {
        const slug = slugFromFilename(path);
        const href = `/product/high-end-pearls/${slug}?img=${encodeURIComponent(url)}`;
        const productMeta = productCopy["high-end-pearls"]?.[slug];

        return {
          id: `pearl-${idx + 1}`,
          name: titleFromFilename(path),
          imageUrl: url,
          href,
          collection: productMeta?.collection,
        };
      });
  }, []);

  const collectionKeys = useMemo(() => {
    return Array.from(
      new Set(allItems.map((item) => item.collection).filter(Boolean))
    ) as string[];
  }, [allItems]);

  const collections = useMemo(() => {
    return collectionKeys.map(collectionLabelFromKey);
  }, [collectionKeys]);

  const filteredItems = useMemo(() => {
    if (activeCollection === "all") return allItems;

    const selectedKey =
      collectionKeys.find((key) => collectionLabelFromKey(key) === activeCollection) ??
      activeCollection;

    return allItems.filter((item) => item.collection === selectedKey);
  }, [activeCollection, allItems, collectionKeys]);

  return (
    <div className="bg-white text-black">
      <CategoryHero
        title="High End Pearl Designs"
        subtitle="Freshwater pearls • Gold-filled detailing • Editorial finish"
        imageUrl={heroPearl}
        collections={collections}
        activeCollection={activeCollection}
        onCollectionChange={setActiveCollection}
      />
      <ClickableProductGrid items={filteredItems} />
    </div>
  );
}