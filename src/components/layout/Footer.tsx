import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">

          {/* Brand */}
          <div className="md:col-span-5">
            <div
              className="text-3xl leading-none text-black md:text-4xl"
              style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
            >
              Katherine Sterling Designs
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-black/60">
              Coastal luxury jewelry designed with refined detail, luminous
              finishes, and an editorial feminine point of view.
            </p>

            <p className="mt-6 text-[11px] uppercase tracking-[0.30em] text-black/40">
              Coastal Luxury Jewelry
            </p>
          </div>

          {/* Shop */}
          <div className="md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.28em] text-black/45">
              Shop
            </div>

            <div className="mt-5 space-y-3 text-sm text-black/75">
              <Link to="/archive/necklaces" className="block transition hover:text-black">
                Necklaces
              </Link>

              <Link to="/archive/bracelets" className="block transition hover:text-black">
                Bracelets
              </Link>

              <Link to="/archive/earrings" className="block transition hover:text-black">
                Earrings
              </Link>

              <Link to="/archive/high-end-pearls" className="block transition hover:text-black">
                High End Pearls
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.28em] text-black/45">
              Company
            </div>

            <div className="mt-5 space-y-3 text-sm text-black/75">
              <Link to="/about" className="block transition hover:text-black">
                About
              </Link>

              <Link to="/contact" className="block transition hover:text-black">
                Contact
              </Link>

              <Link to="/" className="block transition hover:text-black">
                Home
              </Link>
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
                className="block transition hover:text-black"
              >
                alyssa@katherinesterlingdesigns.com
              </a>

              <a
                href="https://www.instagram.com/katherinesterlingdesigns"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-black"
              >
                Instagram
              </a>

              <a
                href="https://www.tiktok.com/@katherinesterlingdesigns"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-black"
              >
                TikTok
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61588342836636"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-black"
              >
                Facebook
              </a>

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
    </footer>
  );
}