export type CategoryKey = "necklaces" | "bracelets" | "earrings" | "high-end-pearls";

export type ProductCopy = {
  title?: string;
  shortDescription?: string;
  description?: string;
  details?: string[];
  price?: number;
};

export const productCopy: Partial<Record<CategoryKey, Record<string, ProductCopy>>> = {
  necklaces: {
    "large-pearl-cross-necklace": {
      price: 128,

      shortDescription:
        "An organically shaped freshwater pearl cross suspended on a delicate 14k gold-filled chain—bold, luminous, and reverently refined.",

      description:
        "The Large Pearl Cross Necklace is a statement in softness and strength. Sculpted from luminous freshwater pearl, the cross pendant carries a natural, organic texture that reflects light with subtle iridescence. Suspended from a delicate 14k gold-filled chain, it balances presence with elegance—bold in silhouette, yet effortlessly feminine. Designed to feel both meaningful and modern, it layers beautifully or stands alone as a radiant focal point.",

      details: [
        "Freshwater pearl cross pendant",
        "Each cross is organically shaped and unique",
        "14k gold-filled chain",
        "Lightweight statement design",
        "Hand-assembled in small batches",
      ],
    },

    "luxury-strand-necklace": {
      price: 98,

      shortDescription:
        "A refined vertical strand pendant on a delicate 14k gold-filled chain—minimal, luminous, and quietly elevated.",

      description:
        "The Luxury Strand Necklace is designed for understated elegance. A slender vertical strand pendant rests on a fine 14k gold-filled chain, catching light with a subtle shimmer that feels both modern and timeless. Clean in silhouette yet softly radiant, it’s the piece you reach for when you want polish without effort. Wear it alone for a refined statement or layer it into your everyday gold for a dimensional, elevated finish.",

      details: [
        "Vertical strand pendant design",
        "14k gold-filled chain",
        "Minimal, modern silhouette",
        "Lightweight and ideal for layering",
        "Hand-assembled in small batches",
      ],
    },

    "pearl-cross-necklace": {
      price: 88,

      shortDescription:
        "A delicate mother-of-pearl cross framed in gold on a fine 14k gold-filled chain—soft, meaningful, and timeless.",

      description:
        "The Pearl Cross Necklace is a refined expression of faith and femininity. A softly luminous mother-of-pearl cross is framed in gold and suspended from a delicate 14k gold-filled chain, creating a look that feels both timeless and modern. Subtle in size yet rich in detail, it’s designed for everyday wear—layered effortlessly or worn alone as a quiet statement. Light-catching and meaningful, it brings warmth and softness to any look.",

      details: [
        "Mother-of-pearl cross pendant",
        "Gold-framed setting",
        "14k gold-filled chain",
        "Lightweight everyday design",
        "Hand-assembled in small batches",
      ],
    },

    "lucky-star-necklace": {
      price: 72,

      shortDescription:
        "A delicate mother-of-pearl star pendant on a fine 14k gold-filled chain—softly luminous and effortlessly celestial.",

      description:
        "The Lucky Star Necklace is a subtle nod to coastal nights and sunlit mornings. A softly sculpted mother-of-pearl star rests on a delicate 14k gold-filled chain, catching the light with a gentle, natural shimmer. Minimal yet meaningful, it’s designed to layer beautifully or stand alone as a refined everyday signature. Feminine, light, and quietly radiant, it brings a soft celestial glow to any look.",

      details: [
        "Mother-of-pearl star pendant",
        "14k gold-filled chain",
        "Lightweight and ideal for layering",
        "Minimal celestial design",
        "Hand-assembled in small batches",
      ],
    },
  },

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

    "lucky-star-earrings": {
      price: 72,

      shortDescription:
        "Delicate mother-of-pearl stars suspended from polished 14k gold-filled hoops—soft, luminous, and celestial.",

      description:
        "Light-catching and quietly radiant, the Lucky Star Earrings are designed to bring a subtle celestial glow to your everyday. Each softly sculpted mother-of-pearl star reflects light with a gentle shimmer, suspended from polished 14k gold-filled hoops for a refined, coastal finish. Feminine yet minimal, they move effortlessly with you—perfect for sunlit afternoons and evenings that linger a little longer.",

      details: [
        "Mother-of-pearl star charms",
        "14k gold-filled hoops",
        "Lightweight drop design",
        "Soft natural iridescence",
        "Hand-assembled in small batches",
      ],
    },

    "sand-dollar-earrings": {
      price: 64,

      shortDescription:
        "Tiny gold sand dollar drops on polished 14k gold-filled hoops—sunlit, coastal, and effortlessly wearable.",

      description:
        "Inspired by shoreline mornings and sun-warmed salt air, the Sand Dollar Earrings are a subtle coastal signature. Small round sand dollar charms catch the light with a softly textured finish, suspended from polished 14k gold-filled hoops for an easy, refined glow. Minimal yet distinctive, they’re made for everyday wear—perfect alone for a clean look or layered with your favorite gold for a lived-in coastal elegance.",

      details: [
        "Textured sand dollar coin charms",
        "14k gold-filled hoops",
        "Lightweight everyday wear",
        "Minimal coastal design",
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

    "high-end-pearls": {
      "pearl-bead-necklace": {
        price: 148,

        shortDescription:
          "A refined strand of luminous freshwater pearls accented with gold and subtle blue detailing—elevated, timeless, and quietly statement-making.",

        description:
          "The Pearl Bead Necklace is a refined expression of coastal luxury. A strand of luminous freshwater pearls is delicately accented with fine blue detailing and finished with polished gold elements, creating a piece that feels both heirloom-inspired and modern. Anchored by a centered pearl focal point, it balances softness with structure—designed to elevate linen, silk, or bare skin with effortless grace. This is pearl design at its most intentional: elevated, editorial, and unmistakably refined.",

        details: [
          "Freshwater pearl strand",
          "Gold accent beads",
          "Subtle blue bead detailing",
          "Centered pearl focal design",
          "Hand-assembled in small batches",
        ],
      },
    },   // <-- THIS COMMA STAYS
  };     // <-- THIS BRACE WAS MISSING

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