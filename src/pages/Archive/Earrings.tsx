import CategoryHero from "../../components/archive/CategoryHero";
import ClickableProductGrid from "../../components/archive/ClickableProductGrid";

import heroEarrings from "../../assets/EarringsHero.png";

// Auto-load all images in: src/assets/products/earrings/
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

export default function Earrings() {
  const items = Object.entries(earringImages)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, url], idx) => {
      const slug = slugFromFilename(path);
      const href = `/product/earrings/${slug}?img=${encodeURIComponent(url)}`;

      return {
        id: `ear-${idx + 1}`,
        name: titleFromFilename(path),
        imageUrl: url,
        href,
      };
    });

  return (
    <div className="bg-white text-black">
      <CategoryHero
        title="Earrings"
        subtitle="Gold glow • Pearl accents • Everyday elegance"
        imageUrl={heroEarrings}
      />
      <ClickableProductGrid items={items} />
    </div>
  );
}