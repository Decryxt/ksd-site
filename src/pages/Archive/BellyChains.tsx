import { useMemo, useState } from "react";
import CategoryHero from "../../components/archive/CategoryHero";
import ClickableProductGrid from "../../components/archive/ClickableProductGrid";

import heroBodyJewelry from "../../assets/Bohemian Belly Chain Hero.png";
import { productCopy } from "../../data/productCopy";

const bellyChainImages = import.meta.glob(
  "../../assets/products/body-jewelry/belly-chains/*.{png,jpg,jpeg,webp}",
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

export default function BellyChains() {
  const [activeCollection, setActiveCollection] = useState("all");

  const allItems = useMemo(() => {
    return Object.entries(bellyChainImages)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, url], idx) => {
        const slug = slugFromFilename(path);
        const custom = (productCopy as any)?.["belly-chains"]?.[slug];

        return {
          id: `belly-${idx + 1}`,
          name: custom?.title ?? titleFromFilename(path),
          imageUrl: url,
          href: `/product/belly-chains/${slug}?img=${encodeURIComponent(url)}`,
          collection: custom?.collection ?? "all",
        };
      });
  }, []);

  const collections = useMemo(() => {
    const unique = new Set<string>();

    allItems.forEach((item) => {
      if (item.collection && item.collection !== "all") {
        unique.add(item.collection);
      }
    });

    return ["all", ...Array.from(unique)];
  }, [allItems]);

  const filteredItems = useMemo(() => {
    if (activeCollection === "all") return allItems;
    return allItems.filter((item) => item.collection === activeCollection);
  }, [allItems, activeCollection]);

  return (
    <div className="bg-white text-black">
      <CategoryHero
        title="Belly Chains"
        subtitle="Sunlit gold • Bare-skin shimmer • Coastal femininity"
        imageUrl={heroBodyJewelry}
        collections={collections}
        activeCollection={activeCollection}
        onCollectionChange={setActiveCollection}
      />

      <ClickableProductGrid items={filteredItems} />
    </div>
  );
}