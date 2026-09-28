import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = [
    { label: "Necklaces", to: "/archive/necklaces" },
    { label: "Bracelets", to: "/archive/bracelets" },
    { label: "Earrings", to: "/archive/earrings" },
    { label: "High End Pearls", to: "/archive/high-end-pearl-designs" },
  ];

  const bodyJewelryLinks = [
    { label: "Belly Chains", to: "/body-jewelry/belly-chains" },
    { label: "Hand Chains", to: "/body-jewelry/hand-chains" },
    { label: "Anklets", to: "/body-jewelry/anklets" },
  ];

  const collectionLabels = [
    "Southern Solstice",
    "Golden Hour Muse",
    "One of One",
  ];

  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[#fbf7ef] text-black">
      <style>
        {`
          @keyframes ksd-gradient-border {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes ksd-soft-float {
            0%, 100% { transform: translateY(0px); opacity: 0.55; }
            50% { transform: translateY(-8px); opacity: 0.85; }
          }

          .ksd-footer-shell {
            position: relative;
            border-radius: 1.75rem;
            background:
              linear-gradient(rgba(255,255,255,0.78), rgba(255,255,255,0.78)) padding-box,
              linear-gradient(
                120deg,
                rgba(212, 178, 106, 0.95),
                rgba(251, 247, 239, 0.75),
                rgba(151, 97, 61, 0.70),
                rgba(232, 205, 143, 0.95),
                rgba(72, 54, 39, 0.28),
                rgba(212, 178, 106, 0.95)
              ) border-box;
            border: 1.5px solid transparent;
            background-size: 100% 100%, 320% 320%;
            animation: ksd-gradient-border 9s ease infinite;
          }

          .ksd-footer-orb {
            animation: ksd-soft-float 7s ease-in-out infinite;
          }

          .ksd-letter-form {
            width: 100%;
          }

          .ksd-letter-fields {
            display: flex;
            width: 100%;
            gap: 8px;
          }

          .ksd-letter-input {
            min-width: 0;
            flex: 1;
            border: 1px solid rgba(0,0,0,0.12);
            border-radius: 999px;
            background: rgba(255,255,255,0.72);
            padding: 12px 16px;
            font-size: 13px;
            line-height: 1.4;
            color: #000;
            outline: none;
            transition:
              border-color 200ms ease,
              background-color 200ms ease,
              box-shadow 200ms ease;
          }

          .ksd-letter-input::placeholder {
            color: rgba(0,0,0,0.42);
          }

          .ksd-letter-input:focus {
            border-color: rgba(151,97,61,0.55);
            background: rgba(255,255,255,0.92);
            box-shadow: 0 0 0 3px rgba(212,178,106,0.10);
          }

          .ksd-letter-submit {
            flex-shrink: 0;
            border: 1px solid rgba(0,0,0,0.12);
            border-radius: 999px;
            background: #1d1a17;
            color: #fff;
            cursor: pointer;
            padding: 12px 18px;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.2em;
            line-height: 1;
            text-transform: uppercase;
            transition:
              transform 200ms ease,
              background-color 200ms ease,
              box-shadow 200ms ease;
          }

          .ksd-letter-submit:hover {
            background: #000;
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.10);
          }

          .ksd-letter-submit:focus-visible {
            outline: 2px solid rgba(151,97,61,0.55);
            outline-offset: 3px;
          }

          .ksd-letter-alert {
            margin-top: 10px;
            border-radius: 12px;
            padding: 10px 12px;
            font-size: 11px;
            line-height: 1.5;
          }

          .ksd-letter-alert:empty {
            display: none;
          }

          .ksd-letter-alert[data-group="alert"] {
            background: rgba(255,255,255,0.60);
            border: 1px solid rgba(0,0,0,0.08);
          }

          @media (max-width: 640px) {
            .ksd-letter-fields {
              flex-direction: column;
            }

            .ksd-letter-submit {
              width: 100%;
              padding: 13px 18px;
            }
          }
        `}
      </style>

      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#d4b26a]/10 blur-3xl ksd-footer-orb" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-[#9b6b3d]/10 blur-3xl ksd-footer-orb" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="ksd-footer-shell p-6 shadow-[0_20px_70px_rgba(0,0,0,0.05)] backdrop-blur-sm md:p-8">
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
                One-of-one coastal jewelry with a bohemian soul — handcrafted
                in small batches with luminous pearls, golden details, and
                pieces made to feel collected, not copied.
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

            {/* Body Jewelry */}
            <div className="md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.28em] text-black/45">
                Body Jewelry
              </div>

              <div className="mt-5 space-y-3 text-sm text-black/75">
                {bodyJewelryLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block transition hover:translate-x-1 hover:text-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-[11px] uppercase tracking-[0.28em] text-black/45">
                Collections
              </div>

              <div className="mt-5 space-y-3 text-sm text-black/45">
                {collectionLabels.map((label) => (
                  <span key={label} className="block cursor-default">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* From the Studio */}
            <div className="md:col-span-3">
              <div className="text-[11px] uppercase tracking-[0.28em] text-black/45">
                From the Studio
              </div>

              <p className="mt-5 text-sm leading-relaxed text-black/65">
                Notes from Alyssa. New pieces, stories, inspiration, and
                little moments from behind the scenes.
              </p>

              <form
                action="https://app.kit.com/forms/9971129/subscriptions"
                method="post"
                data-sv-form="9971129"
                data-uid="69c250a2a2"
                data-format="inline"
                data-version="5"
                className="ksd-letter-form mt-5"
              >
                <div data-style="clean">
                  <ul
                    className="ksd-letter-alert"
                    data-element="errors"
                    data-group="alert"
                  />

                  <div
                    data-element="fields"
                    data-stacked="false"
                    className="ksd-letter-fields"
                  >
                    <div className="min-w-0 flex-1">
                      <input
                        className="ksd-letter-input w-full"
                        name="email_address"
                        aria-label="Email Address"
                        placeholder="Your email address"
                        required
                        type="email"
                        autoComplete="email"
                      />
                    </div>

                    <button
                      data-element="submit"
                      type="submit"
                      className="ksd-letter-submit"
                    >
                      <span>Join</span>
                    </button>
                  </div>
                </div>
              </form>

              <p className="mt-2 text-[10px] leading-relaxed text-black/35">
                Occasionally, and always with intention.
              </p>

              <div className="mt-7 space-y-3 text-sm text-black/75">
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