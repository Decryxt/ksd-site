export type CategoryKey = "necklaces" | "bracelets" | "earrings" | "high-end-pearls";

export type ProductCopy = {
  title?: string;
  shortDescription?: string;
  description?: string;
  details?: string[];
  price?: number;
};

export const productCopy: Partial<Record<CategoryKey, Record<string, ProductCopy>>> = {
  necklaces: {},

  bracelets: {},

  earrings: {
    "ophelia-earrings": {
      price: 84,

      shortDescription:
        "Delicate freshwater pearl coin earrings suspended from polished 14k gold-filled hoops—luminous, feminine, and effortlessly refined.",

      description:
        "Delicate, luminous, and effortlessly feminine—the Ophelia Earrings are a quiet statement in natural beauty. Each freshwater pearl coin carries its own organic shape, softly reflecting light with a subtle iridescence that feels both timeless and modern. Suspended from polished 14k gold-filled hoops, they move gently with you—catching warmth, glow, and attention without ever asking for it. Designed for days in the sun and evenings that linger, Ophelia is the piece you reach for when you want to feel softly elevated. Wear them alone for a refined, minimal look, or layer them into your everyday gold for an effortless coastal elegance.",

      details: [
        "Freshwater pearl coin drops",
        "Each pearl is organically shaped and unique",
        "14k gold-filled hoops",
        "Lightweight and comfortable for all-day wear",
        "Hand-assembled in small batches",
      ],
    },

    "pearl-bead-earrings": {
      price: 68,

      shortDescription:
        "A minimalist pearl drop with a soft, warm glow.",

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
    shortDescription:
      "Handcrafted coastal-luxury jewelry designed for effortless elegance.",
    description:
      "A refined piece designed for coastal days and elevated nights—made with a focus on clean detail, luminous finishes, and a timeless feminine feel.",
    details: [
      "Handcrafted in small batches",
      "Designed to layer",
      "Coastal-luxury finish",
    ],
  };

  if (category === "high-end-pearls") {
    return {
      ...base,
      shortDescription:
        "Elevated pearl-forward design with an editorial finish.",
      details: [
        "Freshwater pearl focus",
        "Gold-filled detailing",
        "Editorial silhouette",
      ],
    };
  }

  return base;
}