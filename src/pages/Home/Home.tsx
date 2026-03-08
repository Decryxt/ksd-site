import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

import hero from "../../assets/MainHero.png";
import heroLogo from "../../assets/KSDTransparentWhite.png";
import swimWeekPiece from "../../assets/MaimiSwimWeekExclusive.png";

export default function Home() {
  const { scrollY } = useScroll();

  const [hasScrolled, setHasScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!hasScrolled && latest > 2) setHasScrolled(true);
    if (hasScrolled && latest <= 0) setHasScrolled(false);
  });

  const overlayOpacity = useTransform(scrollY, [0, 35], [1, 0]);
  const overlayY = useTransform(scrollY, [0, 35], [0, -10]);

  const exclusiveRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: exclusiveProgress } = useScroll({
    target: exclusiveRef,
    offset: ["start end", "end start"],
  });

  const exclusiveImageY = useTransform(exclusiveProgress, [0, 1], [30, -30]);
  const exclusiveImageScale = useTransform(exclusiveProgress, [0, 1], [1.04, 1]);

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
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl text-black md:text-6xl"
            style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
          >
            Headlines
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16"
          >
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="text-xs uppercase text-black/40"
            >
              Upcoming Event
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-7xl uppercase tracking-[0.08em] text-black md:text-8xl"
              style={{ fontFamily: '"BebasNeue", sans-serif' }}
            >
              Miami Swim Week
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.85, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl tracking-[0.45em] text-black/70"
              style={{ fontFamily: '"BebasNeue", sans-serif' }}
            >
              2026
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-6 max-w-xl text-black/60"
            >
              Katherine Sterling Designs will appear at Miami Swim Week,
              showcasing coastal luxury pearl and gold jewelry during the 2026
              runway events.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Miami Swim Week Exclusive Piece */}
      <section ref={exclusiveRef} className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl"
          >
            <motion.img
              src={swimWeekPiece}
              alt="Miami Swim Week Exclusive Piece"
              className="h-[520px] w-full object-cover"
              style={{
                y: exclusiveImageY,
                scale: exclusiveImageScale,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-10 left-10 pr-6 text-white"
            >
              <div className="text-[11px] uppercase tracking-[0.35em] text-white/80">
                Miami Swim Week Exclusive
              </div>

              <div
                className="mt-2 text-4xl tracking-[0.08em] md:text-6xl"
                style={{ fontFamily: '"BebasNeue", sans-serif' }}
              >
                Runway Piece
              </div>

              <p className="mt-3 max-w-md text-sm text-white/85">
                A limited pearl design created exclusively for the Miami Swim
                Week runway.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}