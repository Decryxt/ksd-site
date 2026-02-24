export type CategoryKey = "necklaces" | "bracelets" | "earrings" | "high-end-pearls";

export type ProductCopy = {
  title?: string;
  shortDescription?: string;
  description?: string;
  details?: string[];
  price?: number; // NEW
};

export const productCopy: Partial<Record<CategoryKey, Record<string, ProductCopy>>> = {
  necklaces: {
    // "large-pearl-cross-necklace": {
    //   price: 118,
    //   shortDescription: "Faceted ombré beads with gold-filled accents and a centered initial.",
    //   description: "Full story here...",
    //   details: ["Gold-filled findings", "Handmade in small batches"],
    // },
  },

  bracelets: {},

  earrings: {
    "ophelia-earrings": {
      price: 84,
      shortDescription: "Luminous baroque pearls suspended from gold-filled hoops.",
      description:
        "The Ophelia Earrings feature softly sculpted baroque freshwater pearls suspended from delicate gold-filled hoops. Designed to reflect light with every movement, they bring an effortless coastal elegance to both daytime linen and evening silhouettes.",
      details: [
        "Baroque freshwater pearls",
        "Gold-filled hardware",
        "Lightweight drop design",
        "Hand-assembled in small batches",
      ],
    },

    "pearl-bead-earrings": {
      price: 68,
      shortDescription: "A minimalist pearl drop with a soft, warm glow.",
      description:
        "Delicate pearl drops designed for everyday elegance—simple, luminous, and effortlessly coastal. Lightweight and flattering, they’re made to pair with anything from linen sets to evening looks.",
      details: [
        "Freshwater pearl drop",
        "Gold-filled hardware",
        "Lightweight everyday wear",
        "Hand-assembled in small batches",
      ],
    },
  },

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