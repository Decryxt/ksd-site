import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import hero from "../../assets/MainHero.png";
import heroLogo from "../../assets/KSDTransparentWhite.png";
import swimWeekPiece from "../../assets/MaimiSwimWeekExclusive.png";

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const BODY_JEWELRY_LAUNCH_DATE = "2026-04-02T11:11:00";

function getTimeRemaining(targetDate: string) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const distance = Math.max(target - now, 0);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return {
    distance,
    days,
    hours,
    minutes,
    seconds,
  };
}

function padNumber(value: number) {
  return value.toString().padStart(2, "0");
}

function AnimatedCounter({
  value,
  label,
  delay = 0,
}: {
  value: number;
  label: string;
  delay?: number;
}) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let rafId = 0;
    const start = performance.now();
    const duration = 650;

    const initialJitter = value + Math.floor(Math.random() * 20) + 8;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 0.72) {
        const jitterRange = Math.max(2, Math.floor((1 - progress) * 18));
        const next =
          value + Math.max(0, Math.floor(Math.random() * jitterRange));
        setDisplayValue(next);
      } else {
        const settleProgress = (progress - 0.72) / 0.28;
        const current = Math.round(
          initialJitter + (value - initialJitter) * settleProgress
        );
        setDisplayValue(current);
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
      }
    }

    const timeoutId = window.setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: luxuryEase }}
      className="relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/70 px-5 py-6 backdrop-blur-sm md:px-7 md:py-8"
    >
      <motion.div
        initial={{ opacity: 0, scaleY: 0.7 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.9, delay: delay / 1000 + 0.06, ease: luxuryEase }}
        className="absolute inset-x-0 top-0 h-px origin-center bg-black/10"
      />

      <div
        className="text-5xl leading-none tracking-[-0.03em] text-black md:text-7xl"
        style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
      >
        {padNumber(displayValue)}
      </div>

      <div className="mt-3 text-[10px] uppercase tracking-[0.34em] text-black/45 md:text-[11px]">
        {label}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();

  const [hasScrolled, setHasScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeRemaining(BODY_JEWELRY_LAUNCH_DATE)
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeRemaining(BODY_JEWELRY_LAUNCH_DATE));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

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

  const launchDateLabel = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(BODY_JEWELRY_LAUNCH_DATE));
  }, []);

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
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="text-5xl text-black md:text-6xl"
            style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
          >
            Headlines
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, delay: 0.12, ease: luxuryEase }}
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
              transition={{ duration: 0.95, delay: 0.22, ease: luxuryEase }}
              className="mt-4 text-7xl uppercase tracking-[0.08em] text-black md:text-8xl"
              style={{ fontFamily: '"BebasNeue", sans-serif' }}
            >
              Miami Swim Week
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.85, delay: 0.32, ease: luxuryEase }}
              className="text-3xl tracking-[0.45em] text-black/70"
              style={{ fontFamily: '"BebasNeue", sans-serif' }}
            >
              2026
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: 0.8, delay: 0.42, ease: luxuryEase }}
              className="mx-auto mt-6 max-w-xl text-black/60"
            >
              Katherine Sterling Designs will appear at Miami Swim Week,
              showcasing coastal luxury pearl and gold jewelry during the 2026
              runway events.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Body Jewelry Launch Countdown */}
      <section className="border-t border-black/10 bg-[#fbfaf8]">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: luxuryEase }}
            className="overflow-hidden rounded-[2rem] border border-black/10 bg-white px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:px-10 md:py-14"
          >
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.34em" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.75, ease: luxuryEase }}
                className="text-[10px] uppercase text-black/40 md:text-[11px]"
              >
                Launch Date For Select Body Jewelry Pieces
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.85, delay: 0.08, ease: luxuryEase }}
                className="mt-5 text-4xl text-black md:text-6xl"
                style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
              >
                The Drop Is Approaching
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.8, delay: 0.14, ease: luxuryEase }}
                className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-black/60 md:text-base"
              >
                A limited release of body jewelry pieces is set to launch on{" "}
                {launchDateLabel}. Explore the countdown below as the collection
                moves closer to release.
              </motion.p>

              <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                <AnimatedCounter value={timeLeft.days} label="Days" delay={0} />
                <AnimatedCounter value={timeLeft.hours} label="Hours" delay={90} />
                <AnimatedCounter value={timeLeft.minutes} label="Minutes" delay={180} />
                <AnimatedCounter value={timeLeft.seconds} label="Seconds" delay={270} />
              </div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0.85 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.2, ease: luxuryEase }}
                className="mx-auto mt-10 h-px w-full max-w-2xl origin-center bg-black/10"
              />

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.75, delay: 0.26, ease: luxuryEase }}
                className="mx-auto mt-6 max-w-xl text-xs uppercase tracking-[0.28em] text-black/38"
              >
                Preorder availability and release timing may vary by piece.
              </motion.p>
            </div>
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
            transition={{ duration: 1, ease: luxuryEase }}
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
              transition={{ duration: 0.9, delay: 0.15, ease: luxuryEase }}
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