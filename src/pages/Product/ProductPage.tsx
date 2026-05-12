// src/pages/Product/ProductPage.tsx
import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  getFallbackCopy,
  productCopy,
  type CategoryKey,
} from "../../data/productCopy";
import AddToBagButton from "../../components/AddToBagButton";

type ExtendedCategoryKey =
  | CategoryKey
  | "belly-chains"
  | "hand-chains"
  | "anklets";

type Params = {
  category?: ExtendedCategoryKey;
  slug?: string;
};

type Pendant = {
  type: "boy" | "girl";
  month: string;
};

type CharmSet = {
  initial: string;
  birthstone: string;
};

type PreviewItem = {
  type: "initial" | "birthstone";
  label: string;
  image?: string;
};

const INITIAL_BIRTHSTONE_PRODUCT_SLUGS = [
  "poppy-x-initial-and-birthstone-necklace",
  "initial-and-birth-stone-bracelet",
];

const INITIAL_ONLY_PRODUCT_SLUGS = ["poppy-necklace-summer-26"];

const MAX_CHARM_SETS = 6;

const INITIAL_OPTIONS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const BIRTHSTONE_OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const initialCharmModules = import.meta.glob(
  "../../assets/customizations/initials/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const birthstoneCharmModules = import.meta.glob(
  "../../assets/customizations/birthstones/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

function keyFromAssetPath(path: string) {
  const file = path.split("/").pop() || "";
  return file
    .replace(/\.(png|jpg|jpeg|webp)$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function buildAssetMap(modules: Record<string, string>) {
  return Object.entries(modules).reduce((acc, [path, url]) => {
    acc[keyFromAssetPath(path)] = url;
    return acc;
  }, {} as Record<string, string>);
}

const initialCharmByKey = buildAssetMap(initialCharmModules);
const birthstoneCharmByKey = buildAssetMap(birthstoneCharmModules);

function titleFromSlug(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function isBaseCategory(category: ExtendedCategoryKey): category is CategoryKey {
  return (
    category === "necklaces" ||
    category === "bracelets" ||
    category === "earrings" ||
    category === "high-end-pearls"
  );
}

function categoryLabel(category: ExtendedCategoryKey) {
  switch (category) {
    case "necklaces":
      return "Necklaces";
    case "bracelets":
      return "Bracelets";
    case "earrings":
      return "Earrings";
    case "high-end-pearls":
      return "High End Pearl Designs";
    case "belly-chains":
      return "Belly Chains";
    case "hand-chains":
      return "Hand Chains";
    case "anklets":
      return "Anklets";
    default:
      return "Archive";
  }
}

function categoryBackHref(category: ExtendedCategoryKey) {
  switch (category) {
    case "necklaces":
      return "/archive/necklaces";
    case "bracelets":
      return "/archive/bracelets";
    case "earrings":
      return "/archive/earrings";
    case "high-end-pearls":
      return "/archive/high-end-pearl-designs";
    case "belly-chains":
      return "/body-jewelry/belly-chains";
    case "hand-chains":
      return "/body-jewelry/hand-chains";
    case "anklets":
      return "/body-jewelry/anklets";
    default:
      return "/archive/necklaces";
  }
}

function formatUSD(value?: number) {
  if (typeof value !== "number") return null;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function toSlugFromHeroFilename(path: string) {
  const file = path.split("/").pop() || "";
  const base = file.replace(/\.(png|jpg|jpeg|webp)$/i, "");

  const cleaned = base
    .replace(/\bhero\b/i, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildHeroMap(modules: Record<string, string>) {
  return Object.entries(modules).reduce((acc, [path, url]) => {
    const s = toSlugFromHeroFilename(path);
    acc[s] = url;
    return acc;
  }, {} as Record<string, string>);
}

const necklaceHeroModules = import.meta.glob(
  "../../assets/products/necklaces/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;
const necklaceHeroBySlug = buildHeroMap(necklaceHeroModules);

const braceletHeroModules = import.meta.glob(
  "../../assets/products/bracelets/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;
const braceletHeroBySlug = buildHeroMap(braceletHeroModules);

const earringHeroModules = import.meta.glob(
  "../../assets/products/earrings/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;
const earringHeroBySlug = buildHeroMap(earringHeroModules);

const highEndPearlsHeroModulesA = import.meta.glob(
  "../../assets/products/high-end-pearls/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const highEndPearlsHeroModulesB = import.meta.glob(
  "../../assets/products/high-end-pearl-designs/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const highEndPearlsHeroBySlug = buildHeroMap({
  ...highEndPearlsHeroModulesA,
  ...highEndPearlsHeroModulesB,
});

const bellyChainsHeroModules = import.meta.glob(
  "../../assets/products/body-jewelry/belly-chains/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;
const bellyChainsHeroBySlug = buildHeroMap(bellyChainsHeroModules);

const handChainsHeroModules = import.meta.glob(
  "../../assets/products/body-jewelry/hand-chains/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;
const handChainsHeroBySlug = buildHeroMap(handChainsHeroModules);

const ankletsHeroModules = import.meta.glob(
  "../../assets/products/body-jewelry/anklets/Hero/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;
const ankletsHeroBySlug = buildHeroMap(ankletsHeroModules);

const heroByCategory: Record<ExtendedCategoryKey, Record<string, string>> = {
  necklaces: necklaceHeroBySlug,
  bracelets: braceletHeroBySlug,
  earrings: earringHeroBySlug,
  "high-end-pearls": highEndPearlsHeroBySlug,
  "belly-chains": bellyChainsHeroBySlug,
  "hand-chains": handChainsHeroBySlug,
  anklets: ankletsHeroBySlug,
};

export default function ProductPage() {
  const { category, slug } = useParams<Params>();
  const [searchParams] = useSearchParams();

  const clickedImg = searchParams.get("img") || "";
  const { scrollY } = useScroll();

  const isFamilyNecklace = slug === "mothers-necklace";
  const isInitialBirthstoneProduct =
    !!slug && INITIAL_BIRTHSTONE_PRODUCT_SLUGS.includes(slug);

  const isInitialOnlyProduct =
    !!slug && INITIAL_ONLY_PRODUCT_SLUGS.includes(slug);

  const [pendants, setPendants] = useState<Pendant[]>([
    { type: "girl", month: "jan" },
  ]);

  const [charmSets, setCharmSets] = useState<CharmSet[]>([
    { initial: "A", birthstone: "January" },
  ]);

  const [singleInitial, setSingleInitial] = useState("A");

  const [previewItem, setPreviewItem] = useState<PreviewItem | null>(null);

  const titleOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const titleY = useTransform(scrollY, [0, 120], [0, -18]);

  function updateCharmSet(
    index: number,
    field: "initial" | "birthstone",
    value: string
  ) {
    setCharmSets((prev) =>
      prev.map((set, idx) =>
        idx === index
          ? {
              ...set,
              [field]: value,
            }
          : set
      )
    );
  }

  function addCharmSet() {
    setCharmSets((prev) => {
      if (prev.length >= MAX_CHARM_SETS) return prev;

      return [...prev, { initial: "A", birthstone: "January" }];
    });
  }

  function removeCharmSet(index: number) {
    setCharmSets((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, idx) => idx !== index);
    });
  }

  if (!category || !slug) {
    return (
      <div className="min-h-[70vh] bg-white text-black flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <p className="text-black/70">That product could not be found.</p>
          <Link
            to="/archive/necklaces"
            className="mt-6 inline-block underline underline-offset-4"
          >
            Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  const categoryHeroMap = heroByCategory[category] || {};
  const heroImg = categoryHeroMap[slug] || clickedImg;

  const custom = (
    productCopy as Record<string, Record<string, any> | undefined>
  )?.[category]?.[slug];

  const fallback = isBaseCategory(category)
    ? getFallbackCopy(category)
    : {
        shortDescription: "A refined Katherine Sterling Designs piece.",
        description:
          "Designed with an elevated coastal-luxury sensibility, this piece blends softness, shine, and feminine detail for an effortlessly refined finish.",
        details: [
          "Designed with an elevated coastal aesthetic",
          "Lightweight, refined construction",
          "Feminine and versatile styling",
          "Hand-assembled in small batches",
        ],
      };

  const title = custom?.title ?? titleFromSlug(slug);
  const shortDescription = custom?.shortDescription ?? fallback.shortDescription;
  const description = custom?.description ?? fallback.description;
  const details = custom?.details ?? fallback.details;

  const priceNumber = custom?.price ?? 0;
  const priceText = formatUSD(priceNumber);

  const firstCharmSet = charmSets[0] ?? {
    initial: "A",
    birthstone: "January",
  };

  const selectedInitialImage =
    initialCharmByKey[firstCharmSet.initial.toLowerCase()];
  const selectedBirthstoneImage =
    birthstoneCharmByKey[firstCharmSet.birthstone.toLowerCase()];

  const activePreviewImage =
    previewItem?.image || selectedBirthstoneImage || selectedInitialImage;

  const activePreviewLabel =
    previewItem?.label ||
    `Set 1: ${firstCharmSet.initial} Initial + ${firstCharmSet.birthstone} Birthstone`;

  return (
    <div className="bg-white text-black">
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[60vh] md:h-[68vh]">
          {heroImg ? (
            <img
              src={heroImg}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-black/5" />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />

          <div className="absolute top-0 left-0 right-0 z-10 mx-auto max-w-6xl px-6 pt-6">
            <div className="flex items-center justify-between">
              <Link
                to={categoryBackHref(category)}
                className="text-black/60 hover:text-black transition text-sm tracking-wide"
              >
                ← Back to {categoryLabel(category)}
              </Link>

              <div className="text-black/45 text-xs tracking-[0.28em] uppercase">
                Katherine Sterling Designs
              </div>
            </div>
          </div>

          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute bottom-0 left-0 right-0 z-10 mx-auto max-w-6xl px-6 pb-10 md:pb-12"
          >
            <div className="max-w-3xl">
              <div className="text-black/45 text-xs tracking-[0.28em] uppercase">
                {categoryLabel(category)}
              </div>

              <h1
                className="mt-3 text-4xl md:text-6xl leading-[1.02] tracking-[-0.01em] text-black"
                style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
              >
                {title}
              </h1>

              <p className="mt-5 text-black/60 text-base md:text-lg leading-relaxed">
                {shortDescription}
              </p>

              {priceText ? (
                <div className="mt-3 text-black/55 text-sm tracking-wide">
                  {priceText}
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="text-black/55 text-xs tracking-[0.28em] uppercase">
                Product Description
              </div>

              <p className="mt-6 text-black/70 leading-relaxed">
                {description}
              </p>

              {details?.length ? (
                <ul className="mt-8 space-y-3 text-black/65 text-sm">
                  {details.map((d: string, idx: number) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mt-[7px] h-[5px] w-[5px] rounded-full bg-black/35 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-black/10 bg-white p-8 sticky top-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="text-black/55 text-xs tracking-[0.28em] uppercase">
                Purchase
              </div>

              <div className="mt-5">
                <div className="text-black/90 text-lg">{title}</div>

                {priceText ? (
                  <div className="text-black/70 mt-2 text-sm tracking-wide">
                    {priceText}
                  </div>
                ) : (
                  <div className="text-black/55 mt-2 text-sm">
                    Add a price in{" "}
                    <span className="font-mono">productCopy.ts</span>
                  </div>
                )}
              </div>

              {isFamilyNecklace && (
                <div className="mt-6 space-y-4">
                  <div className="text-black/60 text-xs tracking-[0.28em] uppercase">
                    Customize Your Necklace
                  </div>

                  {pendants.map((p, i) => (
                    <div
                      key={i}
                      className="border border-black/10 rounded-xl p-4 space-y-3"
                    >
                      <div className="text-sm text-black/70">
                        Pendant {i + 1}
                      </div>

                      <div className="flex gap-2">
                        {["boy", "girl"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() =>
                              setPendants((prev) =>
                                prev.map((item, idx) =>
                                  idx === i
                                    ? {
                                        ...item,
                                        type: t as "boy" | "girl",
                                      }
                                    : item
                                )
                              )
                            }
                            className={`px-3 py-1 rounded-full text-xs border ${
                              p.type === t
                                ? "bg-black text-white"
                                : "border-black/20 text-black/70"
                            }`}
                          >
                            {t.toUpperCase()}
                          </button>
                        ))}
                      </div>

                      <select
                        value={p.month}
                        onChange={(e) =>
                          setPendants((prev) =>
                            prev.map((item, idx) =>
                              idx === i
                                ? { ...item, month: e.target.value }
                                : item
                            )
                          )
                        }
                        className="w-full border border-black/15 rounded-md px-3 py-2 text-sm"
                      >
                        {[
                          "jan",
                          "feb",
                          "mar",
                          "apr",
                          "may",
                          "jun",
                          "jul",
                          "aug",
                          "sep",
                          "oct",
                          "nov",
                          "dec",
                        ].map((m) => (
                          <option key={m} value={m}>
                            {m.toUpperCase()}
                          </option>
                        ))}
                      </select>

                      {pendants.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setPendants((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            )
                          }
                          className="text-xs text-red-500"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      setPendants((prev) => [
                        ...prev,
                        { type: "girl", month: "jan" },
                      ])
                    }
                    className="w-full border border-black/20 rounded-xl py-2 text-sm hover:bg-black hover:text-white transition"
                  >
                    + Add Another Pendant
                  </button>
                </div>
              )}

              {isInitialBirthstoneProduct && (
                <div className="mt-6 space-y-5">
                  <div>
                    <div className="text-black/60 text-xs tracking-[0.28em] uppercase">
                      Personalize Your Piece
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-black/50">
                      Add one or more charm sets. Each set includes one initial
                      and one birthstone. Your selections will be attached to
                      your order before checkout.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-[#faf7f2] p-4">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.24em] text-black/45">
                          Preview
                        </div>
                        <div className="mt-1 text-sm text-black/75">
                          {activePreviewLabel}
                        </div>
                      </div>

                      <div className="text-right text-[10px] uppercase tracking-[0.18em] text-black/35">
                        Hover options
                      </div>
                    </div>

                    {activePreviewImage ? (
                      <img
                        src={activePreviewImage}
                        alt={activePreviewLabel}
                        className="h-28 w-full rounded-xl border border-black/10 bg-white object-contain p-3"
                      />
                    ) : (
                      <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-black/15 bg-white text-center text-xs leading-relaxed text-black/40">
                        Add charm images to
                        <br />
                        src/assets/customizations
                      </div>
                    )}
                  </div>

                  {charmSets.map((set, setIndex) => (
                    <div
                      key={setIndex}
                      className="rounded-2xl border border-black/10 p-4"
                    >
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.24em] text-black/45">
                            Charm Set {setIndex + 1}
                          </div>

                          <div className="mt-1 text-xs text-black/55">
                            Initial {set.initial} · {set.birthstone}
                          </div>
                        </div>

                        {charmSets.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => removeCharmSet(setIndex)}
                            className="text-xs text-red-500"
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>

                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <div className="text-[10px] uppercase tracking-[0.24em] text-black/45">
                            Initial
                          </div>

                          <div className="text-xs text-black/55">
                            Selected: {set.initial}
                          </div>
                        </div>

                        <div className="grid grid-cols-6 gap-2 sm:grid-cols-9">
                          {INITIAL_OPTIONS.map((letter) => {
                            const image =
                              initialCharmByKey[letter.toLowerCase()];
                            const isSelected = set.initial === letter;

                            return (
                              <button
                                key={letter}
                                type="button"
                                onClick={() =>
                                  updateCharmSet(
                                    setIndex,
                                    "initial",
                                    letter
                                  )
                                }
                                onMouseEnter={() =>
                                  setPreviewItem({
                                    type: "initial",
                                    label: `Set ${
                                      setIndex + 1
                                    }: ${letter} Initial Charm`,
                                    image,
                                  })
                                }
                                onMouseLeave={() => setPreviewItem(null)}
                                onFocus={() =>
                                  setPreviewItem({
                                    type: "initial",
                                    label: `Set ${
                                      setIndex + 1
                                    }: ${letter} Initial Charm`,
                                    image,
                                  })
                                }
                                onBlur={() => setPreviewItem(null)}
                                className={`rounded-full border px-3 py-2 text-xs transition ${
                                  isSelected
                                    ? "border-black bg-black text-white"
                                    : "border-black/15 text-black/65 hover:border-black/50"
                                }`}
                              >
                                {letter}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="text-[10px] uppercase tracking-[0.24em] text-black/45">
                            Birthstone
                          </div>

                          <div className="text-xs text-black/55">
                            Selected: {set.birthstone}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {BIRTHSTONE_OPTIONS.map((month) => {
                            const image =
                              birthstoneCharmByKey[month.toLowerCase()];
                            const isSelected = set.birthstone === month;

                            return (
                              <button
                                key={month}
                                type="button"
                                onClick={() =>
                                  updateCharmSet(
                                    setIndex,
                                    "birthstone",
                                    month
                                  )
                                }
                                onMouseEnter={() =>
                                  setPreviewItem({
                                    type: "birthstone",
                                    label: `Set ${
                                      setIndex + 1
                                    }: ${month} Birthstone Charm`,
                                    image,
                                  })
                                }
                                onMouseLeave={() => setPreviewItem(null)}
                                onFocus={() =>
                                  setPreviewItem({
                                    type: "birthstone",
                                    label: `Set ${
                                      setIndex + 1
                                    }: ${month} Birthstone Charm`,
                                    image,
                                  })
                                }
                                onBlur={() => setPreviewItem(null)}
                                className={`rounded-full border px-3 py-2 text-xs transition ${
                                  isSelected
                                    ? "border-black bg-black text-white"
                                    : "border-black/15 text-black/65 hover:border-black/50"
                                }`}
                              >
                                {month}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addCharmSet}
                    disabled={charmSets.length >= MAX_CHARM_SETS}
                    className={[
                      "w-full rounded-xl border py-2 text-sm transition",
                      charmSets.length >= MAX_CHARM_SETS
                        ? "cursor-not-allowed border-black/10 bg-black/5 text-black/35"
                        : "border-black/20 hover:bg-black hover:text-white",
                    ].join(" ")}
                  >
                    {charmSets.length >= MAX_CHARM_SETS
                      ? "Maximum Charm Sets Added"
                      : "+ Add Another Charm Set"}
                  </button>
                </div>
              )}

              {isInitialOnlyProduct && (
                <div className="mt-6 space-y-5">
                  <div>
                    <div className="text-black/60 text-xs tracking-[0.28em] uppercase">
                      Choose Your Initial
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-black/50">
                      Select one initial for your necklace. Your selection will be attached to
                      your order before checkout.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-[#faf7f2] p-4">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.24em] text-black/45">
                          Preview
                        </div>
                        <div className="mt-1 text-sm text-black/75">
                          {previewItem?.label || `${singleInitial} Initial Charm`}
                        </div>
                      </div>

                      <div className="text-right text-[10px] uppercase tracking-[0.18em] text-black/35">
                        Hover options
                      </div>
                    </div>

                    {previewItem?.image || initialCharmByKey[singleInitial.toLowerCase()] ? (
                      <img
                        src={
                          previewItem?.image ||
                          initialCharmByKey[singleInitial.toLowerCase()]
                        }
                        alt={previewItem?.label || `${singleInitial} Initial Charm`}
                        className="h-28 w-full rounded-xl border border-black/10 bg-white object-contain p-3"
                      />
                    ) : (
                      <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-black/15 bg-white text-center text-xs leading-relaxed text-black/40">
                        Add initial images to
                        <br />
                        src/assets/customizations/initials
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-[10px] uppercase tracking-[0.24em] text-black/45">
                        Initial
                      </div>

                      <div className="text-xs text-black/55">
                        Selected: {singleInitial}
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-2 sm:grid-cols-9">
                      {INITIAL_OPTIONS.map((letter) => {
                        const image = initialCharmByKey[letter.toLowerCase()];
                        const isSelected = singleInitial === letter;

                        return (
                          <button
                            key={letter}
                            type="button"
                            onClick={() => setSingleInitial(letter)}
                            onMouseEnter={() =>
                              setPreviewItem({
                                type: "initial",
                                label: `${letter} Initial Charm`,
                                image,
                              })
                            }
                            onMouseLeave={() => setPreviewItem(null)}
                            onFocus={() =>
                              setPreviewItem({
                                type: "initial",
                                label: `${letter} Initial Charm`,
                                image,
                              })
                            }
                            onBlur={() => setPreviewItem(null)}
                            className={`rounded-full border px-3 py-2 text-xs transition ${
                              isSelected
                                ? "border-black bg-black text-white"
                                : "border-black/15 text-black/65 hover:border-black/50"
                            }`}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <AddToBagButton
                category={category}
                slug={slug}
                title={title}
                price={priceNumber}
                status={custom?.status}
                preorderShipDate={custom?.preorderShipDate}
                squareVariationId={custom?.squareVariationId}
                customizations={
                  isFamilyNecklace
                    ? { pendants }
                    : isInitialBirthstoneProduct
                    ? { charmSets }
                    : isInitialOnlyProduct
                    ? { initial: singleInitial }
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}