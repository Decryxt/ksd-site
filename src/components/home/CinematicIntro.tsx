import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import piece1 from "../../assets/heroScenes/scene1.png";
import piece2 from "../../assets/heroScenes/scene2.png";
import piece3 from "../../assets/heroScenes/scene3.png";
import piece4 from "../../assets/heroScenes/scene4.png";

const scenes = [
  {
    image: piece1,
    eyebrow: "Signature Gold",
    title: "Sunlit forms, shaped for the shoreline.",
    description:
      "A warm opening in polished gold and coastal light.",
    align: "left" as const,
  },
  {
    image: piece2,
    eyebrow: "Pearl Focus",
    title: "Soft radiance, held close to the skin.",
    description:
      "Refined pearl detail captured in a quieter golden hour frame.",
    align: "right" as const,
  },
  {
    image: piece3,
    eyebrow: "Layered Light",
    title: "Depth, glow, and a more statement silhouette.",
    description:
      "A richer composition with movement, texture, and warmth.",
    align: "left" as const,
  },
  {
    image: piece4,
    eyebrow: "Coastal Finish",
    title: "An ending that settles into the world of the brand.",
    description:
      "Pearl, skin, sunset, and a final transition into Katherine Sterling Designs.",
    align: "right" as const,
  },
];

function sceneRange(index: number) {
  const start = index * 0.22;
  const mid = start + 0.1;
  const end = start + 0.22;
  return { start, mid, end };
}

export default function CinematicIntro() {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const introMaskOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.88, 1],
    [0.72, 0.5, 0.4, 0.15]
  );

  const outroOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[760vh] bg-[#0d0907]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0d0907]">
        <motion.div className="absolute inset-0" style={{ opacity: outroOpacity }}>
          {scenes.map((scene, index) => {
            const { start, mid, end } = sceneRange(index);

            const opacity = useTransform(
              scrollYProgress,
              [start, start + 0.04, mid, end - 0.04, end],
              [0, 1, 1, 1, 0]
            );

            const scale = useTransform(
              scrollYProgress,
              [start, end],
              [1.1, 1.02]
            );

            const y = useTransform(
              scrollYProgress,
              [start, end],
              [24, -18]
            );

            const x =
              scene.align === "left"
                ? useTransform(scrollYProgress, [start, end], [0, -18])
                : useTransform(scrollYProgress, [start, end], [0, 18]);

            const copyOpacity = useTransform(
              scrollYProgress,
              [start + 0.03, start + 0.08, end - 0.06, end],
              [0, 1, 1, 0]
            );

            const copyY = useTransform(
              scrollYProgress,
              [start + 0.03, start + 0.08],
              [18, 0]
            );

            return (
              <div key={index} className="absolute inset-0">
                <motion.img
                  src={scene.image}
                  alt={scene.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ opacity, scale, x, y }}
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,153,0.12),transparent_34%),linear-gradient(to_bottom,rgba(10,7,5,0.38),rgba(10,7,5,0.08),rgba(10,7,5,0.52))]" />

                <motion.div
                  className={[
                    "absolute bottom-14 z-20 max-w-[520px] px-8 md:bottom-20 md:px-12",
                    scene.align === "left"
                      ? "left-0 text-left"
                      : "right-0 text-right",
                  ].join(" ")}
                  style={{ opacity: copyOpacity, y: copyY }}
                >
                  <div className="text-[10px] uppercase tracking-[0.42em] text-white/72 md:text-[11px]">
                    {scene.eyebrow}
                  </div>

                  <h2
                    className="mt-4 text-3xl leading-[1.02] text-white md:text-5xl"
                    style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
                  >
                    {scene.title}
                  </h2>

                  <p className="mt-4 max-w-[420px] text-sm leading-relaxed text-white/78 md:text-[15px]">
                    {scene.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: introMaskOpacity }}
        />

        <div className="pointer-events-none absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 md:block">
          <div className="flex flex-col gap-4">
            {scenes.map((_, index) => {
              const { start, mid, end } = sceneRange(index);

              const segmentOpacity = useTransform(
                scrollYProgress,
                [start, start + 0.04, mid, end],
                [0.28, 1, 1, 0.28]
              );

              const segmentScale = useTransform(
                scrollYProgress,
                [start, start + 0.04, mid, end],
                [1, 1, 1.08, 1]
              );

              return (
                <motion.div
                  key={index}
                  className="h-10 w-[2px] origin-center bg-white/80"
                  style={{ opacity: segmentOpacity, scaleY: segmentScale }}
                />
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-[10px] uppercase tracking-[0.34em] text-white/72">
          Scroll
        </div>
      </div>
    </section>
  );
}