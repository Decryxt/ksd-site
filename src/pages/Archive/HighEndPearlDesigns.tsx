import CategoryHero from "../../components/archive/CategoryHero";
import ProductGrid from "../../components/archive/ProductGrid";

import heroPearl from "../../assets/HighEndPearlDesignHero.png";

// Auto-load all images in: src/assets/products/high-end-pearls/
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

export default function HighEndPearlDesigns() {
  const items = Object.entries(pearlImages)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, url], idx) => ({
      id: `pearl-${idx + 1}`,
      name: titleFromFilename(path),
      imageUrl: url,
    }));

  return (
    <div className="bg-white text-black">
      <CategoryHero
        title="High End Pearl Designs"
        subtitle="Freshwater pearls • Gold-filled detailing • Editorial finish"
        imageUrl={heroPearl}
      />
      <ProductGrid items={items} />
    </div>
  );
}