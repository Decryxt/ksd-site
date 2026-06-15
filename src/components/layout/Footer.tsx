import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = [
    { label: "Necklaces", to: "/archive/necklaces" },
    { label: "Bracelets", to: "/archive/bracelets" },
    { label: "Earrings", to: "/archive/earrings" },
    { label: "High End Pearls", to: "/archive/high-end-pearls" },
    { label: "Body Jewelry", to: "/body-jewelry" },
  ];

  const collectionLinks = [
    { label: "Southern Solstice", to: "/collection/southern-solstice" },
    { label: "Golden Hour Muse", to: "/collection/golden-hour-muse" },
    { label: "One of One", to: "/collection/one-of-one" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[#fbf7ef] text-black">
      <style>
        {`
          @keyframes ksd-border-drift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes ksd-soft-float {
            0%, 100% { transform: translateY(0px); opacity: 0.55; }
            50% { transform: translateY(-8px); opacity: 0.85; }
          }

          .ksd-animated-border {
            position: relative;
            border-radius: 1.5rem;
            isolation: isolate;
          }

          .ksd-animated-border::before {
            content: "";
            position: absolute;
            inset: 0;
            padding: 1px;
            border-radius: inherit;
            background: linear-gradient(
              120deg,
              rgba(212, 178, 106, 0.25),
              rgba(0, 0, 0, 0.10),
              rgba(175, 126, 78, 0.28),
              rgba(212, 178, 106, 0.25)
            );
            background-size: 250% 250%;
            animation: ksd-border-drift 8s ease infinite;
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            z-index: -1;
          }

          .ksd-footer-orb {
            animation: ksd-soft-float 7s ease-in-out infinite;
          }
        `}
      </style>

      {/* Soft background detail */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#d4b26a]/10 blur-3xl ksd-footer-orb" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-[#9b6b3d]/10 blur-3xl ksd-footer-orb" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="ksd-animated-border bg-white/55 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.04)] backdrop-blur-sm md:p-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            {/* Brand */}
            <div className="md:col-span-5">
              <Link
                to="/"
                className="inline-block text-3xl leading-none text-black transition hover:opacity-75 md:text-4xl"
                style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
              >
                Katherine Sterling Designs
              </Link>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-black/60">
                One-of-one coastal jewelry with a bohemian soul — handcrafted in
                small batches with luminous pearls, golden details, and pieces
                made to feel collected, not copied.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-black/50">
                  Handcrafted
                </span>

                <span className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-black/50">
                  One of One
                </span>

                <span className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-black/50">
                  Coastal Boho
                </span>
              </div>
            </div>

            {/* Shop */}
            <div className="md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.28em] text-black/45">
                Shop
              </div>

              <div className="mt-5 space-y-3 text-sm text-black/75">
                {footerLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block transition hover:translate-x-1 hover:text-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Collections */}
            <div className="md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.28em] text-black/45">
                Collections
              </div>

              <div className="mt-5 space-y-3 text-sm text-black/75">
                {collectionLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block transition hover:translate-x-1 hover:text-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div className="md:col-span-3">
              <div className="text-[11px] uppercase tracking-[0.28em] text-black/45">
                Connect
              </div>

              <div className="mt-5 space-y-3 text-sm text-black/75">
                <a
                  href="mailto:alyssa@katherinesterlingdesigns.com"
                  className="block transition hover:translate-x-1 hover:text-black"
                >
                  alyssa@katherinesterlingdesigns.com
                </a>

                <a
                  href="https://www.instagram.com/katherinesterlingdesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:translate-x-1 hover:text-black"
                >
                  Instagram
                </a>

                <a
                  href="https://www.tiktok.com/@katherinesterlingdesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:translate-x-1 hover:text-black"
                >
                  TikTok
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61588342836636"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:translate-x-1 hover:text-black"
                >
                  Facebook
                </a>
              </div>

              <div className="mt-7 rounded-2xl border border-black/10 bg-white/50 p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-black/40">
                  Made for
                </p>

                <p
                  className="mt-2 text-2xl leading-none text-black/80"
                  style={{
                    fontFamily: '"Perandory", serif',
                    fontWeight: 400,
                  }}
                >
                  sunlit days & collected moments
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 border-t border-black/10 pt-6">
            <div className="flex flex-col gap-4 text-xs text-black/45 md:flex-row md:items-center md:justify-between">
              <div>
                © {year} Katherine Sterling Designs. All rights reserved.
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <Link to="/" className="transition hover:text-black">
                  Home
                </Link>

                <Link to="/about" className="transition hover:text-black">
                  About
                </Link>

                <Link to="/contact" className="transition hover:text-black">
                  Contact
                </Link>

                <Link to="/privacy" className="transition hover:text-black">
                  Privacy Policy
                </Link>

                <Link to="/terms" className="transition hover:text-black">
                  Terms
                </Link>

                <Link to="/shipping" className="transition hover:text-black">
                  Shipping & Returns
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}