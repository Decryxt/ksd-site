import { useMemo, useState } from "react";
import CategoryHero from "../../components/archive/CategoryHero";
import ClickableProductGrid from "../../components/archive/ClickableProductGrid";
import { productCopy } from "../../data/productCopy";

import heroEarrings from "../../assets/EarringsHero.png";

const earringImages = import.meta.glob(
  "../../assets/products/earrings/*.{png,jpg,jpeg,webp}",
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

export default function Earrings() {
  const [activeCollection, setActiveCollection] = useState("all");

  const allItems = useMemo(() => {
    return Object.entries(earringImages)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, url], idx) => {
        const slug = slugFromFilename(path);
        const href = `/product/earrings/${slug}?img=${encodeURIComponent(url)}`;
        const productMeta = productCopy.earrings?.[slug];

        return {
          id: `ear-${idx + 1}`,
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
        title="Earrings"
        subtitle="Gold glow • Pearl accents • Everyday elegance"
        imageUrl={heroEarrings}
        collections={collections}
        activeCollection={activeCollection}
        onCollectionChange={setActiveCollection}
      />
      <ClickableProductGrid items={filteredItems} />
    </div>
  );
}