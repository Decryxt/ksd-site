import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

// Update to your actual hero image filename
import hero from "../../assets/MainHero.png";
// Use your white transparent logo for the hero overlay if you have a separate one
import heroLogo from "../../assets/KSDTransparentWhite.png";

export default function Home() {
  const { scrollY } = useScroll();

  // fast Gucci-like “any scroll collapses hero branding”
  const [hasScrolled, setHasScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!hasScrolled && latest > 2) setHasScrolled(true);
    if (hasScrolled && latest <= 0) setHasScrolled(false);
  });

  // Hero overlay fades quickly
  const overlayOpacity = useTransform(scrollY, [0, 35], [1, 0]);
  const overlayY = useTransform(scrollY, [0, 35], [0, -10]);

  return (
    <div className="-mt-16">
      {/* Fullscreen hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        />

        {/* Optional subtle gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/35" />

        {/* Center logo + slogan overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: overlayOpacity, y: overlayY }}
        >
          <div className="flex flex-col items-center px-6 text-center">
            <img
              src={heroLogo}
              alt="Katherine Sterling Designs"
              className="w-[280px] max-w-[70vw] select-none"
              draggable={false}
            />

            <p className="mt-4 text-[11px] uppercase tracking-[0.34em] text-white/90">
              Coastal luxury jewelry, refined in detail.
            </p>
          </div>
        </motion.div>

        {/* Optional: a tiny scroll hint that disappears after scroll */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.32em] text-white/80"
          animate={{ opacity: hasScrolled ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          Scroll
        </motion.div>
      </section>

      {/* Content after hero (placeholder) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl tracking-tight">Archive</h2>
          <p className="mt-3 max-w-xl text-black/70">
            Next step: editorial grid, category cards, and product filtering from pieces.ts.
          </p>
        </div>
      </section>
    </div>
  );
}