import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

type Props = {
  title: string;
  subtitle?: string;
  imageUrl: string; // pass imported asset or a URL
  heightClassName?: string; // optional override
};

export default function CategoryHero({
  title,
  subtitle,
  imageUrl,
  heightClassName = "h-[72vh] min-h-[520px] md:h-[78vh]",
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasMoved, setHasMoved] = useState(false);

  // Track scroll progress relative to this hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Fade title quickly with a tiny scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.08], [0, -10]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!hasMoved && v > 0.01) setHasMoved(true);
    if (hasMoved && v <= 0.001) setHasMoved(false);
  });

  return (
    <section ref={sectionRef} className={`relative w-full overflow-hidden ${heightClassName}`}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Editorial gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/45" />

      {/* Title overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6 text-center"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <div className="max-w-3xl">
          <h1 className="perandory-proof text-[42px] md:text-[76px] leading-[1.05] tracking-tight text-white">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 text-[11px] uppercase tracking-[0.34em] text-white/90">
              {subtitle}
            </p>
          ) : null}
        </div>
      </motion.div>

      {/* Subtle scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.32em] text-white/85"
        animate={{ opacity: hasMoved ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        Scroll
      </motion.div>
    </section>
  );
}