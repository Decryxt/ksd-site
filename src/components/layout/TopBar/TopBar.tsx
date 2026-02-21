import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  type Transition,
} from "framer-motion";

import { FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

import logo from "../../../assets/KSD_logo_cropped.png";

type NavLink = {
  label: string;
  to: string;
};

const ARCHIVE_LINKS: NavLink[] = [
  { label: "Necklaces", to: "/archive/necklaces" },
  { label: "Bracelets", to: "/archive/bracelets" },
  { label: "Earrings", to: "/archive/earrings" },
  { label: "High End Pearl Designs", to: "/archive/high-end-pearl-designs" },
];

const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const barTransition: Transition = { duration: 0.42, ease: luxuryEase };
const panelTransition: Transition = { duration: 0.45, ease: luxuryEase };

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-4 w-5">
      <span
        className={[
          "absolute left-0 top-0 h-px w-full bg-black transition-transform duration-300",
          open ? "translate-y-[7px] rotate-45" : "",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 top-1/2 h-px w-full bg-black transition-opacity duration-200",
          open ? "opacity-0" : "opacity-100",
        ].join(" ")}
        style={{ transform: "translateY(-50%)" }}
      />
      <span
        className={[
          "absolute left-0 bottom-0 h-px w-full bg-black transition-transform duration-300",
          open ? "-translate-y-[7px] -rotate-45" : "",
        ].join(" ")}
      />
    </div>
  );
}

export default function TopBar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Home: force top and hide bar until scroll starts
  useEffect(() => {
    if (isHome) {
      setHasScrolled(false);
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
      );
    } else {
      setHasScrolled(true);
    }
  }, [isHome]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isHome) return;
    if (!hasScrolled && latest > 6) setHasScrolled(true);
    if (hasScrolled && latest <= 0) setHasScrolled(false);
  });

  const shouldShowBar = !isHome || hasScrolled;

  const [open, setOpen] = useState(false); // desktop archive panel (hover)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileArchiveOpen, setMobileArchiveOpen] = useState(false);

  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const isArchiveRoute = useMemo(
    () => location.pathname.startsWith("/archive"),
    [location.pathname]
  );

  useEffect(() => {
    setOpen(false);
    setMobileMenuOpen(false);
    setMobileArchiveOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    return () => {
      if (openTimer.current) window.clearTimeout(openTimer.current);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const scheduleOpen = () => {
    if (!shouldShowBar) return;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (openTimer.current) window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setOpen(true), 80);
  };

  const scheduleClose = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{
          opacity: shouldShowBar ? 1 : 0,
          y: shouldShowBar ? 0 : -10,
        }}
        transition={barTransition}
        style={{ pointerEvents: shouldShowBar ? "auto" : "none" }}
        className="w-full border-b border-black/10 bg-white/90 backdrop-blur-md"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* 3-column layout keeps logo perfectly centered */}
          <div className="h-16 grid grid-cols-3 items-center">
            {/* LEFT */}
            <div className="flex items-center justify-start">
              {/* Desktop socials */}
              <div className="hidden md:flex items-center gap-6 text-black/70">
                <a
                  href="https://www.instagram.com/katherinesterlingdesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-black transition-colors"
                >
                  <FaInstagram size={16} />
                </a>

                <a
                  href="https://www.tiktok.com/@katherinesterlingdesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="hover:text-black transition-colors"
                >
                  <SiTiktok size={15} />
                </a>
              </div>

              {/* Mobile spacer (matches button width so logo stays centered) */}
              <div className="md:hidden h-10 w-12" />
            </div>

            {/* CENTER — Logo */}
            <div className="flex items-center justify-center">
              <Link to="/" aria-label="Home" className="shrink-0">
                <img
                  src={logo}
                  alt="Katherine Sterling Designs"
                  className="h-[46px] md:h-[54px] w-auto object-contain"
                  draggable={false}
                />
              </Link>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-end">
              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-10">
                <div
                  className="relative flex items-center"
                  onMouseEnter={scheduleOpen}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    className={[
                      "text-[11px] uppercase tracking-[0.32em] leading-none transition-colors",
                      isArchiveRoute ? "text-black" : "text-black/70 hover:text-black",
                    ].join(" ")}
                  >
                    Archive
                  </button>

                  <div
                    className={[
                      "absolute -bottom-2 left-0 h-px w-full bg-black/60 transition-transform duration-300",
                      open || isArchiveRoute ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </div>

                <Link
                  to="/about"
                  className="text-[11px] uppercase tracking-[0.32em] leading-none text-black/70 hover:text-black transition-colors"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className="text-[11px] uppercase tracking-[0.32em] leading-none text-black/70 hover:text-black transition-colors"
                >
                  Contact
                </Link>
              </nav>

              {/* Mobile menu button (icon only; no cramped text) */}
              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden inline-flex h-10 w-12 items-center justify-center rounded-md border border-black/10 bg-white text-black hover:border-black/20 transition-colors"
                onClick={() => setMobileMenuOpen((v) => !v)}
              >
                <HamburgerIcon open={mobileMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ARCHIVE PANEL (desktop) */}
      <AnimatePresence>
        {open && shouldShowBar && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={panelTransition}
            className="hidden md:block w-full border-b border-black/10 bg-white"
            onMouseEnter={() => {
              if (closeTimer.current) window.clearTimeout(closeTimer.current);
            }}
            onMouseLeave={scheduleClose}
          >
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid grid-cols-12 gap-10 py-10">
                <div className="col-span-5">
                  <p className="text-[11px] uppercase tracking-[0.30em] text-black/55">
                    Archive
                  </p>
                  <h3 className="mt-4 text-2xl tracking-tight text-black">
                    Coastal luxury, curated.
                  </h3>
                </div>

                <div className="col-span-7">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    {ARCHIVE_LINKS.map((item) => (
                      <Link key={item.to} to={item.to} className="group block">
                        <div className="flex items-center justify-between">
                          <span className="text-sm uppercase tracking-[0.18em] text-black/80 group-hover:text-black transition-colors">
                            {item.label}
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.18em] text-black/40 group-hover:text-black/70 transition-colors">
                            View
                          </span>
                        </div>
                        <div className="mt-3 h-px w-full bg-black/10 group-hover:bg-black/20 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && shouldShowBar && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={panelTransition}
            className="md:hidden w-full border-b border-black/10 bg-white"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5">
              <div className="space-y-3">
                <Link
                  to="/about"
                  className="block border border-black/10 px-4 py-3 text-[11px] uppercase tracking-[0.32em] text-black/75"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className="block border border-black/10 px-4 py-3 text-[11px] uppercase tracking-[0.32em] text-black/75"
                >
                  Contact
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileArchiveOpen((v) => !v)}
                  className="w-full border border-black/10 px-4 py-3 text-left text-[11px] uppercase tracking-[0.32em] text-black/75"
                >
                  Archive
                </button>

                <AnimatePresence initial={false}>
                  {mobileArchiveOpen && (
                    <motion.div
                      key="mobileArchive"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: luxuryEase }}
                      className="overflow-hidden border border-black/10"
                    >
                      <div className="p-2">
                        {ARCHIVE_LINKS.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="block px-3 py-3 text-sm text-black/75"
                          >
                            {item.label}
                            <div className="mt-3 h-px w-full bg-black/10" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-2 flex items-center gap-6 text-black/70">
                  <a
                    href="https://www.instagram.com/katherinesterlingdesigns"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-black transition-colors"
                  >
                    <FaInstagram size={18} />
                  </a>

                  <a
                    href="https://www.tiktok.com/@katherinesterlingdesigns"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="hover:text-black transition-colors"
                  >
                    <SiTiktok size={17} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}