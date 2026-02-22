export type CategoryKey = "necklaces" | "bracelets" | "earrings" | "high-end-pearls";

export type ProductCopy = {
  title?: string; // optional override
  shortDescription?: string;
  description?: string;
  details?: string[];
};

export const productCopy: Partial<Record<CategoryKey, Record<string /* slug */, ProductCopy>>> = {
  necklaces: {
    // Example (optional):
    // "blush-ombre-initial": {
    //   shortDescription: "Faceted ombré beads with gold-filled accents and a centered initial.",
    //   description: "Full story here...",
    //   details: ["Gold-filled findings", "Handmade in small batches"],
    // },
  },
  bracelets: {},
  earrings: {},
  "high-end-pearls": {},
};

export function getFallbackCopy(category: CategoryKey) {
  const base = {
    shortDescription: "Handcrafted coastal-luxury jewelry designed for effortless elegance.",
    description:
      "A refined piece designed for coastal days and elevated nights—made with a focus on clean detail, luminous finishes, and a timeless feminine feel.",
    details: ["Handcrafted in small batches", "Designed to layer", "Coastal-luxury finish"],
  };

  if (category === "high-end-pearls") {
    return {
      ...base,
      shortDescription: "Elevated pearl-forward design with an editorial finish.",
      details: ["Freshwater pearl focus", "Gold-filled detailing", "Editorial silhouette"],
    };
  }

  return base;
}