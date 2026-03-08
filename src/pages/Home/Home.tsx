import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

import hero from "../../assets/MainHero.png";
import heroLogo from "../../assets/KSDTransparentWhite.png";

export default function Home() {
  const { scrollY } = useScroll();

  const [hasScrolled, setHasScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!hasScrolled && latest > 2) setHasScrolled(true);
    if (hasScrolled && latest <= 0) setHasScrolled(false);
  });

  const overlayOpacity = useTransform(scrollY, [0, 35], [1, 0]);
  const overlayY = useTransform(scrollY, [0, 35], [0, -10]);

  return (
    <div className="-mt-16">
      {/* Fullscreen hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/35" />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: overlayOpacity, y: overlayY }}
        >
          <div className="flex flex-col items-center px-6 text-center">
            <img
              src={heroLogo}
              alt="Katherine Sterling Designs"
              className="w-[320px] max-w-[70vw] select-none"
              draggable={false}
            />

            <p className="mt-4 text-[11px] uppercase tracking-[0.34em] text-white/90">
              Coastal luxury jewelry, refined in detail.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.32em] text-white/80"
          animate={{ opacity: hasScrolled ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          Scroll
        </motion.div>
      </section>

      {/* Headlines section */}
      <section className="bg-white border-t border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <h2
            className="text-5xl font-bold text-black md:text-6xl"
            style={{ fontFamily: '"Perandory", serif' }}
          >
            Headlines
          </h2>

          <div className="mt-16">
            <div className="text-xs uppercase tracking-[0.35em] text-black/40">
              Upcoming Event
            </div>

            <div
              className="mt-4 text-7xl uppercase tracking-[0.08em] text-black md:text-8xl"
              style={{ fontFamily: '"BebasNeue", sans-serif' }}
            >
              Miami Swim Week
            </div>

            <div
              className="text-3xl tracking-[0.45em] text-black/70"
              style={{ fontFamily: '"BebasNeue", sans-serif' }}
            >
              2026
            </div>

            <p className="mx-auto mt-6 max-w-xl text-black/60">
              Katherine Sterling Designs will appear at Miami Swim Week,
              showcasing coastal luxury pearl and gold jewelry during the 2026
              runway events.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}