import { useMemo, useState } from "react";
import CategoryHero from "../../components/archive/CategoryHero";
import ClickableProductGrid from "../../components/archive/ClickableProductGrid";

import heroBodyJewelry from "../../assets/OceanHero.png";
import { productCopy } from "../../data/productCopy";

const handChainImages = import.meta.glob(
  "../../assets/products/body-jewelry/hand-chains/*.{png,jpg,jpeg,webp}",
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

export default function HandChains() {
  const [activeCollection, setActiveCollection] = useState("all");

  const allItems = useMemo(() => {
    return Object.entries(handChainImages)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, url], idx) => {
        const slug = slugFromFilename(path);
        const custom = (productCopy as any)?.["hand-chains"]?.[slug];

        return {
          id: `hand-${idx + 1}`,
          name: custom?.title ?? titleFromFilename(path),
          imageUrl: url,
          href: `/product/hand-chains/${slug}?img=${encodeURIComponent(url)}`,
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
        title="Hand Chains"
        subtitle="Delicate drape • Gold movement • Feminine detail"
        imageUrl={heroBodyJewelry}
        collections={collections}
        activeCollection={activeCollection}
        onCollectionChange={setActiveCollection}
      />

      {filteredItems.length === 0 ? (
        <div className="flex items-center justify-center py-28">
            <div className="text-center">
            <div
                className="text-4xl md:text-6xl tracking-[-0.01em] text-black"
                style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
            >
                Coming Soon
            </div>

            <p className="mt-4 text-black/50 text-sm tracking-wide">
                New pieces are currently in development.
            </p>
            </div>
        </div>
        ) : (
        <ClickableProductGrid items={filteredItems} />
        )}
    </div>
  );
}