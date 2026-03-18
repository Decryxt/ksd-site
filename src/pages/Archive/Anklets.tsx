import { useMemo } from "react";
import CategoryHero from "../../components/archive/CategoryHero";
import ClickableProductGrid from "../../components/archive/ClickableProductGrid";

import heroBodyJewelry from "../../assets/Bohemian Belly Chain Hero.png";

const ankletImages = import.meta.glob(
  "../../assets/products/body-jewelry/anklets/*.{png,jpg,jpeg,webp}",
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

export default function Anklets() {
  const items = useMemo(() => {
    return Object.entries(ankletImages)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, url], idx) => {
        const slug = slugFromFilename(path);

        return {
          id: `anklet-${idx + 1}`,
          name: titleFromFilename(path),
          imageUrl: url,
          href: `/product/anklets/${slug}?img=${encodeURIComponent(url)}`,
        };
      });
  }, []);

  return (
    <div className="bg-white text-black">
      <CategoryHero
        title="Anklets"
        subtitle="Coastal ease • Barefoot elegance • Coming soon"
        imageUrl={heroBodyJewelry}
        collections={[]}
        activeCollection="all"
        onCollectionChange={() => {}}
      />
      <ClickableProductGrid items={items} />
    </div>
  );
}