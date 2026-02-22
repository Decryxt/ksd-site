import CategoryHero from "../../components/archive/CategoryHero";
import ClickableProductGrid from "../../components/archive/ClickableProductGrid";

import heroBracelet from "../../assets/BraceletHero.png";

// Auto-load all images in: src/assets/products/bracelets/
const braceletImages = import.meta.glob(
  "../../assets/products/bracelets/*.{png,jpg,jpeg,webp}",
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

export default function Bracelets() {
  const items = Object.entries(braceletImages)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, url], idx) => {
      const slug = slugFromFilename(path);
      const href = `/product/bracelets/${slug}?img=${encodeURIComponent(url)}`;

      return {
        id: `br-${idx + 1}`,
        name: titleFromFilename(path),
        imageUrl: url,
        href,
      };
    });

  return (
    <div className="bg-white text-black">
      <CategoryHero
        title="Bracelets"
        subtitle="Stacked essentials • Gold warmth • Clean finish"
        imageUrl={heroBracelet}
      />
      <ClickableProductGrid items={items} />
    </div>
  );
}