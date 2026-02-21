import CategoryHero from "../../components/archive/CategoryHero";
import ProductGrid from "../../components/archive/ProductGrid";

import heroNecklace from "../../assets/NecklaceHero.png";

// Auto-load all images in: src/assets/products/necklaces/
const necklaceImages = import.meta.glob(
  "../../assets/products/necklaces/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

function titleFromFilename(filePath: string) {
  const file = filePath.split("/").pop() || "";
  const base = file.replace(/\.(png|jpg|jpeg|webp)$/i, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Necklaces() {
  const items = Object.entries(necklaceImages)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, url], idx) => ({
      id: `neck-${idx + 1}`,
      name: titleFromFilename(path),
      imageUrl: url,
    }));

  return (
    <div className="bg-white text-black">
      <CategoryHero
        title="Necklaces"
        subtitle="Layers • Light-catching details • Coastal femininity"
        imageUrl={heroNecklace}
      />
      <ProductGrid items={items} />
    </div>
  );
}