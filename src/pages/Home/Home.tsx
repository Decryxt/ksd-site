import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import hero from "../../assets/MainHero.png";
import heroLogo from "../../assets/KSDTransparentWhite.png";

import queenOfHearts from "../../assets/products/bracelets/Queen Of Hearts Bracelet.jpg";
import goldenSpur from "../../assets/products/bracelets/Golden Spur Bracelet.jpg";
import lydiaNecklace from "../../assets/products/necklaces/Lydia Necklace.png";

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

  function handleViewSouthernSolstice() {
    setIsNavigating(true);

    window.setTimeout(() => {
      navigate(
        "/product/bracelets/golden-spur-bracelet?img=%2Fassets%2FGolden%2520Spur%2520Bracelet-DODqSCu-.jpg"
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

      {/* Southern Solstice Collection Feature */}
      <section className="relative overflow-hidden border-t border-black/10 bg-[#f7efe4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(199,127,69,0.28),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(247,239,228,1))]" />

        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#c77f45]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#9f4f2c]/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1, ease: luxuryEase }}
            className="mb-16 text-center"
          >
            <div className="text-[11px] uppercase tracking-[0.45em] text-black/45">
              New Collection
            </div>

            <h2
              className="mt-6 text-6xl uppercase leading-[0.9] tracking-[0.04em] text-[#8f472a] md:text-8xl lg:text-9xl"
              style={{ fontFamily: '"Durango Western", serif' }}
            >
              Southern
              <br />
              Solstice
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-black/60 md:text-base">
              A sun-warmed collection inspired by Alyssa’s Texas roots —
              polished gold, feminine keepsakes, Western romance, and heirloom
              details shaped by Southern light.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 42, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 1, ease: luxuryEase }}
            className="relative overflow-hidden rounded-[2rem] border border-[#c77f45]/35 bg-white/80 shadow-[0_28px_90px_rgba(143,71,42,0.18)] backdrop-blur"
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(199,127,69,0.16)_0%,rgba(255,244,224,0.65)_30%,rgba(177,98,51,0.14)_55%,rgba(255,239,218,0.72)_80%,rgba(199,127,69,0.16)_100%)]" />

            <div className="relative grid grid-cols-1 md:grid-cols-2">
              {/* Product Image Collage */}
              <div className="relative min-h-[560px] overflow-hidden bg-[#3a2118] md:min-h-[680px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,211,142,0.45),transparent_34%),linear-gradient(145deg,#2a1711,#8f472a_48%,#d59a61)]" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 1.05, delay: 0.1, ease: luxuryEase }}
                  className="absolute left-[9%] top-[10%] h-[52%] w-[58%] overflow-hidden rounded-[1.5rem] border border-white/25 bg-white shadow-[0_22px_70px_rgba(0,0,0,0.28)]"
                >
                  <img
                    src={lydiaNecklace}
                    alt="Lydia Necklace"
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.94, rotate: 3 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 1.05, delay: 0.22, ease: luxuryEase }}
                  className="absolute bottom-[11%] right-[8%] h-[46%] w-[54%] overflow-hidden rounded-[1.5rem] border border-white/25 bg-white shadow-[0_22px_70px_rgba(0,0,0,0.3)]"
                >
                  <img
                    src={goldenSpur}
                    alt="Golden Spur Bracelet"
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 1.05, delay: 0.34, ease: luxuryEase }}
                  className="absolute bottom-[8%] left-[10%] h-[34%] w-[36%] overflow-hidden rounded-full border border-white/30 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.32)]"
                >
                  <img
                    src={queenOfHearts}
                    alt="Queen Of Hearts Bracelet"
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                <div className="absolute left-8 top-8 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-white/80 backdrop-blur">
                  Southern Solstice
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
              </div>

              {/* Text Side */}
              <div className="relative flex items-center">
                <div className="w-full px-8 py-14 md:px-14 md:py-16">
                  <motion.div
                    initial={{ opacity: 0, letterSpacing: "0.18em" }}
                    whileInView={{ opacity: 1, letterSpacing: "0.32em" }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.8, ease: luxuryEase }}
                    className="text-[10px] uppercase text-[#8f472a]/70 md:text-[11px]"
                  >
                    Southern Solstice
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.95,
                      delay: 0.06,
                      ease: luxuryEase,
                    }}
                    className="mt-5 text-5xl uppercase leading-[0.95] tracking-[0.04em] text-black md:text-7xl"
                    style={{
                      fontFamily: '"Durango Western", serif',
                      fontWeight: 400,
                    }}
                  >
                    New pieces
                    <br />
                    have arrived
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.7 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.14,
                      ease: luxuryEase,
                    }}
                    className="mt-8 h-px w-full max-w-[190px] origin-left bg-[#8f472a]/25"
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.16,
                      ease: luxuryEase,
                    }}
                    className="mt-8 max-w-xl text-sm leading-relaxed text-black/62 md:text-base"
                  >
                    Discover the first pieces from Southern Solstice — golden
                    beaded silhouettes, romantic charms, and bold feminine
                    details inspired by Texas warmth and Alyssa’s Southern
                    heritage.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{
                      duration: 0.82,
                      delay: 0.22,
                      ease: luxuryEase,
                    }}
                    className="mt-7 grid grid-cols-1 gap-3 text-xs uppercase tracking-[0.22em] text-black/45 sm:grid-cols-3"
                  >
                    <div className="rounded-full border border-[#c77f45]/25 px-4 py-3 text-center">
                      Lydia
                    </div>
                    <div className="rounded-full border border-[#c77f45]/25 px-4 py-3 text-center">
                      Golden Spur
                    </div>
                    <div className="rounded-full border border-[#c77f45]/25 px-4 py-3 text-center">
                      Queen Of Hearts
                    </div>
                  </motion.div>

                  <motion.button
                    type="button"
                    onClick={handleViewSouthernSolstice}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    whileHover={{ y: -2, scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.32, ease: luxuryEase }}
                    className="mt-10 inline-flex items-center justify-center rounded-full border border-[#8f472a] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#8f472a] transition hover:bg-[#8f472a] hover:text-white"
                  >
                    Explore Golden Spur
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