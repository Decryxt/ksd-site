export type CategoryKey = "necklaces" | "bracelets" | "earrings" | "belly-chains" | "high-end-pearls";

export type ProductCopy = {
  title?: string;
  shortDescription?: string;
  description?: string;
  details?: string[];
  price?: number;
  stripePriceId?: string;
  squareCheckoutUrl?: string;
  squareVariationId?: string;
  sku?: string;
  status?: "active" | "coming-soon" | "sold-out";

  // NEW
  collection?: string;
};

export const productCopy: Partial<Record<CategoryKey, Record<string, ProductCopy>>> = {
  necklaces: {
    "large-pearl-cross-necklace": {
      price: 70,

      stripePriceId: "price_1T8VytQfJ3BDSPk8uVP6km2H",

      squareCheckoutUrl: "https://square.link/u/wVLovtlm",

      squareVariationId: "KZISXRWMZAXJUZUTHJT23HXM",

      status: "sold-out",

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

    "poppy-necklace": {
      price: 90,

      stripePriceId: "price_1T9EEhQfJ3BDSPk8DkY8TAW5",

      squareVariationId: "S4WJVASEO5AX6WCE2FJOOOAH",

      status: "active",

      collection: "golden-hour-muse",

      shortDescription:
        "A refined gold-filled beaded necklace with softly spaced polished accents—minimal, luminous, and effortlessly elevated.",

      description:
        "The Poppy Necklace is a study in understated shine. Designed with delicate gold-filled beads and finished with softly spaced polished accents, it creates a look that feels both refined and quietly statement-making. The silhouette sits beautifully along the neckline, catching light with a warm, fluid glow that feels timeless yet modern. Minimal enough for everyday wear yet elevated enough to stand alone, Poppy is the kind of piece that brings effortless polish to everything it’s paired with.",

      details: [
        "Gold-filled beaded necklace",
        "Spaced polished accent beads",
        "Weighted, refined silhouette",
        "Designed for everyday wear or layering",
        "Hand-assembled in small batches",
      ],
    },

    "luxury-strand-necklace": {
      price: 60,

      stripePriceId: "price_1T8W26QfJ3BDSPk8efg9LBpl",

      squareVariationId: "3A5CK3PFEDGOLCTQMZ5LZG34",

      status: "active",

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
      price: 60,

      stripePriceId: "price_1T8W2vQfJ3BDSPk8c3j0SknU",

      squareVariationId: "EY3NLB43LP6VWI6WIQ2I3F76",

      status: "sold-out",

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
      price: 70,

      stripePriceId: "price_1T8W0mQfJ3BDSPk8e0SCt6jB",

      squareVariationId: "6M27ETVVFB44CTZ5V6OJ55XA",

      status: "active",

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
      price: 70,

      stripePriceId: "price_1T8W48QfJ3BDSPk8RipDEUj5",

      squareVariationId: "NDJ4RMTRTVZ3BVM4CC3FICTH",

      status: "active",

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
      price: 100,

      stripePriceId: "price_1T8W76QfJ3BDSPk8WFr1B9Dd",

      squareVariationId: "5URIATNLTNOGFZ2HD7MIKCB2",

      status: "coming-soon",

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
      price: 70,

      stripePriceId: "price_1T8W8BQfJ3BDSPk8h7wCh5Tz",

      squareVariationId: "YXT2BH7CLTR2HPV6ZHGHHI6V",

      status: "active",

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
      price: 80,

      stripePriceId: "price_1T8W95QfJ3BDSPk8RL5ngYdf",

      squareVariationId: "6Y3CZN7PIRAURUWVIKSH7FMR",

      status: "active",

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
      price: 70,

      stripePriceId: "price_1T8WA1QfJ3BDSPk8DPTMiBGv",

      squareVariationId: "OTUGCX2U6AEFPQHETEWCLCIO",

      status: "active",

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
      price: 75,

      stripePriceId: "price_1T8WAkQfJ3BDSPk86JzmanM7",

      squareVariationId: "7IM3AYXBL6AJJGSIJJCOD4VU",

      status: "active",

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
      price: 75,

      stripePriceId: "price_1T8W5GQfJ3BDSPk8A78pTHLM",

      squareVariationId: "EZJXQD5VYW43JUDFCDJ6LUEL",

      status: "active",

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
      price: 110,

      stripePriceId: "price_1T8WCgQfJ3BDSPk8YcyO1FjV",

      squareVariationId: "ZPCQOWPGUQNYNGW4JAUGZHFY",

      status: "active",

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

    "cleo-earrings": {
      price: 60,

      stripePriceId: "price_1T9cJLQfJ3BDSPk8vqj38Vur",

      squareVariationId: "E3R425X2BMCIBB2VECXUF3RH",

      status: "active",

      collection: "golden-hour-muse",

      shortDescription:
        "Luminous freshwater pearl drops suspended from delicate pavé-set studs—timeless, radiant, and quietly elegant.",

      description:
        "Graceful and effortlessly refined, the Cleo Earrings capture the soft glow of coastal light. Each luminous freshwater pearl is suspended from a delicate pavé-set stud, allowing the pearl to move gently and reflect light with subtle iridescence. The balance of sparkling detail and organic pearl form creates a design that feels both classic and modern. Lightweight yet striking, they bring a quiet elegance to everyday wear while remaining timeless enough for special occasions.",

      details: [
        "Round freshwater pearl drop",
        "Pavé-set crystal stud",
        "14k gold-filled setting",
        "Elegant lightweight drop design",
        "Hand-assembled in small batches",
      ],
    },

    "wild-child-earrings": {
      price: 75,

      stripePriceId: "price_1T8Ze4QfJ3BDSPk8gJjoWMXP",

      squareVariationId: "ZUK2LP6Q5AZSWI4LP2V5I7S4",

      status: "active",
      collection: "golden-hour-muse",

      shortDescription:
        "Pavé horseshoe charms set with vibrant stones, suspended from polished 14k gold-filled hoops—playful, radiant, and striking.",

      description:
        "The Wild Child Earrings bring vibrant color and sparkle to a sculptural silhouette. Each horseshoe charm is pavé-set with shimmering stones in luminous tones, forming a bold arc of light that catches the sun from every angle. Suspended from polished 14k gold-filled hoops, they feel playful yet refined—designed for statement moments and nights that shimmer a little brighter.",

      details: [
        "Pavé horseshoe charm",
        "Multicolor crystal stones",
        "14k gold-filled hoops",
        "Lightweight drop design",
        "Hand-assembled in small batches",
      ],
    },

    "stella-earrings": {
      price: 45,

      stripePriceId: "price_1T8ZbYQfJ3BDSPk8HC4PP8gS",

      squareVariationId: "3MNZ6DT3LXFWZFFHIOUGKLBH",

      status: "active",
      collection: "golden-hour-muse",

      shortDescription:
        "Textured gold coin charms suspended from polished 14k gold-filled hoops—bold, sunlit, and effortlessly coastal.",

      description:
        "Radiant with movement and texture, the Stella Earrings capture the glow of golden summer light. Each softly hammered coin charm reflects light in organic patterns, creating subtle dimension as they move. Suspended from polished 14k gold-filled hoops, they balance statement and simplicity—perfect for days by the water and evenings that stretch long into warm coastal nights.",

      details: [
        "Textured gold coin charms",
        "14k gold-filled hoops",
        "Lightweight drop design",
        "Organic hammered finish",
        "Hand-assembled in small batches",
      ],
    },

    "paloma-earrings": {
      price: 70,

      stripePriceId: "price_1T8ZfKQfJ3BDSPk89sIfNvIF",

      squareVariationId: "WVHAHVCQN2NJBSRMEP3QLWGD",

      status: "active",
      collection: "golden-hour-muse",

      shortDescription:
        "Luminous freshwater pearl drops suspended from polished 14k gold-filled hoops—classic, feminine, and quietly elegant.",

      description:
        "Graceful and timeless, the Paloma Earrings celebrate the natural beauty of freshwater pearls. Each softly glowing pearl drop reflects light with a gentle warmth, suspended from polished 14k gold-filled hoops for a refined, effortless finish. Elegant enough for evenings yet simple enough for everyday wear, they bring a touch of quiet luxury to any look.",

      details: [
        "Freshwater pearl drops",
        "14k gold-filled hoops",
        "Lightweight drop design",
        "Natural pearl luster",
        "Hand-assembled in small batches",
      ],
    },

    "lucky-star-earrings": {
      price: 70,

      stripePriceId: "price_1T8WBuQfJ3BDSPk80tKTaKUv",

      squareVariationId: "SHNPK6ZJXOYM3Y7EEOYSNUKM",

      status: "active",

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
      price: 55,

      stripePriceId: "price_1T8WE9QfJ3BDSPk8kqaHcmQ2",

      squareVariationId: "IFEGBZVPACINTIN7LYGBIVDL",

      status: "active",

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
      price: 60,

      stripePriceId: "price_1T8WDOQfJ3BDSPk89pxVsEea",

      squareVariationId: "H5BBXLT3P3RWGBIF2T3UU2IG",

      status: "active",

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

  "belly-chains": {
    "bohemian-belly-chain": {
      price: 75,

      squareVariationId: "EI7ZGQLOPJ4UXVNGXGPZITQT",

      status: "coming-soon",

      collection: "golden-hour-muse",

      shortDescription:
        "A delicate gold belly chain adorned with softly hammered disc charms—light-catching, feminine, and effortlessly coastal.",

      description:
        "The Bohemian Belly Chain is designed to move with you—subtle, radiant, and endlessly refined. A fine gold chain drapes gently along the waist, accented with softly hammered disc charms that catch the light with every shift and step. Each charm reflects a warm, sunlit glow, evoking the ease of coastal afternoons and golden hour skin.Lightweight and effortlessly elegant, this piece is made for layering or wearing alone as a quiet statement. Whether styled over swimwear or paired with soft knits, it brings a touch of warmth, femininity, and understated luxury to every look.",

      details: [
        "Delicate gold waist chain",
        "Hammered gold disc charms",
        "Light-catching textured finish",
        "Adjustable fit for natural drape",
        "Lightweight, comfortable wear",
        "Hand-assembled in small batches",
      ],
    },
  },

  "high-end-pearls": {
    "pearl-bead-necklace": {
      price: 200,

      stripePriceId: "price_1T8WEzQfJ3BDSPk8PLkf76rl",

      squareVariationId: "UTFUZDA572W524XQXBAUTFP4",

      status: "active",

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
  },
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