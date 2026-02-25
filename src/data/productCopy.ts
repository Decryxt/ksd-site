export type CategoryKey = "necklaces" | "bracelets" | "earrings" | "high-end-pearls";

export type ProductCopy = {
  title?: string;
  shortDescription?: string;
  description?: string;
  details?: string[];
  price?: number;
  stripePriceId?: string;
};

export const productCopy: Partial<Record<CategoryKey, Record<string, ProductCopy>>> = {
  necklaces: {
    "large-pearl-cross-necklace": {
      price: 128,

      stripePriceId: "price_1T4UoFQXLBKalpyYNCUrNMIB",

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

  bracelets: {
    "gold-design-bracelet": {
      price: 78,

      shortDescription:
        "A polished gold-bead bracelet with graduated sizing—bold, minimal, and effortlessly elevated.",

      description:
        "The Gold Design Bracelet is a modern essential with statement presence. Crafted from polished gold-filled beads in a graduated silhouette, it reflects light with a rich, warm glow. Bold yet refined, it balances everyday wearability with elevated design. Whether worn alone for a clean, sculptural look or stacked for added dimension, it brings effortless polish to any outfit.",

      details: [
        "Graduated gold-filled bead design",
        "High-polish reflective finish",
        "Stretch fit for comfortable wear",
        "Bold yet minimal silhouette",
        "Hand-assembled in small batches",
      ],
    },

    "initial-and-birth-stone-bracelet": {
      price: 86,

      shortDescription:
        "A polished gold-bead bracelet personalized with a gold initial charm and a delicate birthstone accent—meaningful, modern, and uniquely yours.",

      description:
        "The Initial & Birthstone Bracelet is a refined expression of personal style. Crafted from luminous gold-filled beads and finished with a bold initial charm and a subtle birthstone accent, it blends sentiment with modern polish. Designed to feel both meaningful and elevated, it’s perfect worn alone as a signature piece or layered into your everyday stack. Personal, timeless, and effortlessly radiant—this is jewelry that tells your story.",

      details: [
        "Gold-filled bead stretch bracelet",
        "Personalized initial charm",
        "Delicate birthstone accent",
        "Comfortable stretch fit",
        "Hand-assembled in small batches",
      ],
    },

    "lucky-star-bracelet": {
      price: 76,

      shortDescription:
        "A polished gold-bead bracelet finished with a luminous mother-of-pearl star—coastal, celestial, and effortlessly refined.",

      description:
        "The Lucky Star Bracelet blends bold polish with soft celestial detail. Crafted from radiant gold-filled beads and finished with a luminous mother-of-pearl star centerpiece, it captures light with every movement. Designed to feel elevated yet wearable, it’s perfect styled alone for a clean statement or layered into your everyday stack. Feminine, coastal, and quietly radiant, it brings a subtle glow to any look.",

      details: [
        "Gold-filled bead stretch bracelet",
        "Mother-of-pearl star centerpiece",
        "Comfortable stretch fit",
        "Bold yet feminine silhouette",
        "Hand-assembled in small batches",
      ],
    },

    "new-beginning-bracelet": {
      price: 84,

      shortDescription:
        "A polished gold-bead bracelet centered with a sculptural floral charm—symbolic, refined, and effortlessly radiant.",

      description:
        "The New Beginning Bracelet is designed to symbolize renewal, growth, and fresh starts. Crafted from luminous gold-filled beads and centered with a softly sculpted floral charm, it balances bold shine with meaningful detail. The polished finish reflects light beautifully, while the organic shape of the charm adds softness and dimension. Worn alone or layered into your stack, it’s a radiant reminder of new chapters and quiet strength.",

      details: [
        "Gold-filled bead stretch bracelet",
        "Sculptural floral centerpiece charm",
        "Comfortable stretch fit",
        "Symbolic renewal-inspired design",
        "Hand-assembled in small batches",
      ],
    },

    "new-hope-bracelet": {
      price: 96,

      shortDescription:
        "Organic freshwater pearls centered with a polished gold floral charm—soft, luminous, and quietly symbolic.",

      description:
        "The New Hope Bracelet blends softness with strength. A strand of organically shaped freshwater pearls wraps the wrist with natural luster and gentle texture, centered by a polished gold floral charm that symbolizes renewal and light. The contrast of luminous pearl and radiant gold creates a piece that feels both heirloom-inspired and modern. Feminine, meaningful, and effortlessly elevated, it layers beautifully or stands alone as a refined statement.",

      details: [
        "Freshwater pearl stretch bracelet",
        "Polished gold floral centerpiece charm",
        "Each pearl is organically shaped and unique",
        "Comfortable stretch fit",
        "Hand-assembled in small batches",
      ],
    },

    "poppy-bracelet": {
      price: 78,

      shortDescription:
        "A dimensional gold-bead bracelet with spaced polished accents—minimal, luminous, and effortlessly stackable.",

      description:
        "The Poppy Bracelet is a refined take on everyday gold. Crafted with delicate gold-filled beads and accented by evenly spaced polished spheres, it creates soft dimension and movement around the wrist. The alternating bead scale adds subtle structure while maintaining a lightweight, elegant feel. Designed to layer beautifully or wear alone as a minimal statement, Poppy is an effortless essential in any coastal-luxury stack.",

      details: [
        "Gold-filled bead stretch bracelet",
        "Spaced polished accent beads",
        "Lightweight and ideal for stacking",
        "Comfortable stretch fit",
        "Hand-assembled in small batches",
      ],
    },

    "heart-of-gold-bracelet": {
      price: 82,

      shortDescription:
        "A polished gold-bead bracelet finished with a delicate heart charm—romantic, refined, and effortlessly wearable.",

      description:
        "The Heart of Gold Bracelet is a modern romantic essential. Crafted from luminous gold-filled beads and finished with a softly polished heart charm, it reflects light with a warm, radiant glow. Bold in shine yet delicate in sentiment, it’s designed to be worn daily—stacked with your favorite pieces or styled alone as a subtle statement. Feminine, timeless, and quietly meaningful, it brings warmth to every look.",

      details: [
        "Gold-filled bead stretch bracelet",
        "Polished heart charm detail",
        "Comfortable stretch fit",
        "Bold yet feminine silhouette",
        "Hand-assembled in small batches",
      ],
    },
  },

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