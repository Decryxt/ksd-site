import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import hero from "../../assets/MainHero.png";
import heroLogo from "../../assets/KSDTransparentWhite.png";
import mothersNecklaceHero from "../../assets/products/necklaces/Hero/Mothers Necklace Hero.png";

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Home() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const [hasScrolled, setHasScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!hasScrolled && latest > 2) setHasScrolled(true);
    if (hasScrolled && latest <= 0) setHasScrolled(false);
  });

  const overlayOpacity = useTransform(scrollY, [0, 35], [1, 0]);
  const overlayY = useTransform(scrollY, [0, 35], [0, -10]);

  const mothersRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: mothersProgress } = useScroll({
    target: mothersRef,
    offset: ["start end", "end start"],
  });

  const mothersImageY = useTransform(mothersProgress, [0, 1], [26, -26]);
  const mothersImageScale = useTransform(mothersProgress, [0, 1], [1.05, 1]);

  function handleViewMothersNecklace() {
    setIsNavigating(true);

    window.setTimeout(() => {
      navigate(
        "/product/necklaces/mothers-necklace?img=%2Fassets%2FMothers%2520Necklace-Dj-XzDZj.png"
      );
    }, 650);
  }

  return (
    <div className="-mt-16">
      <motion.div
        initial={false}
        animate={{
          opacity: isNavigating ? 1 : 0,
          pointerEvents: isNavigating ? "auto" : "none",
        }}
        transition={{ duration: 0.55, ease: luxuryEase }}
        className="fixed inset-0 z-[100] bg-white"
      />

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

      {/* Mother's Day Feature */}
      <section
        ref={mothersRef}
        className="border-t border-black/10 bg-[#faf7f2]"
      >
        <div className="mx-auto max-w-6xl px-6 pb-32 pt-24 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 1, ease: luxuryEase }}
            className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_22px_70px_rgba(0,0,0,0.07)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <motion.div
                className="relative h-[520px] overflow-hidden md:h-[690px]"
                initial={{ opacity: 0, scale: 1.02 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.05, ease: luxuryEase }}
              >
                <motion.img
                  src={mothersNecklaceHero}
                  alt="The Mother's Necklace"
                  className="h-full w-full object-cover"
                  style={{
                    y: mothersImageY,
                    scale: mothersImageScale,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10" />
              </motion.div>

              <div className="relative flex items-center">
                <div className="w-full px-8 py-14 md:px-14 md:py-16">
                  <motion.div
                    initial={{ opacity: 0, letterSpacing: "0.18em" }}
                    whileInView={{ opacity: 1, letterSpacing: "0.32em" }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.8, ease: luxuryEase }}
                    className="text-[10px] uppercase text-black/38 md:text-[11px]"
                  >
                    Mother’s Day Exclusive
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.95, delay: 0.06, ease: luxuryEase }}
                    className="mt-5 text-5xl leading-[0.92] text-black md:text-7xl"
                    style={{ fontFamily: '"Alyana", serif', fontWeight: 400 }}
                  >
                    The Mother&apos;s
                    <br />
                    Necklace
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.7 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.85, delay: 0.14, ease: luxuryEase }}
                    className="mt-8 h-px w-full max-w-[170px] origin-left bg-black/12"
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, delay: 0.16, ease: luxuryEase }}
                    className="mt-8 max-w-xl text-sm leading-relaxed text-black/62 md:text-base"
                  >
                    A sentimental keepsake designed to hold the ones she loves
                    most close. The Mother&apos;s Necklace pairs an elevated
                    gold-filled silhouette with personalized charm detailing,
                    creating a piece that feels deeply meaningful, soft in
                    presence, and refined enough to wear as an everyday heirloom.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.82, delay: 0.22, ease: luxuryEase }}
                    className="mt-6 text-xs uppercase tracking-[0.28em] text-black/36"
                  >
                    Personalized · Limited Release · Preorder
                  </motion.p>

                  <motion.button
                    type="button"
                    onClick={handleViewMothersNecklace}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    whileHover={{ y: -2, scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.32, ease: luxuryEase }}
                    className="mt-10 inline-flex items-center justify-center rounded-full border border-black px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-black transition hover:bg-black hover:text-white"
                  >
                    View
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}