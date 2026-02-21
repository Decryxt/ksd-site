export default function About() {
  return (
    <div className="bg-white text-black">
      {/* Add top padding so content never sits under the fixed TopBar */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-14 md:pt-28 md:pb-24">
        <p className="text-[11px] uppercase tracking-[0.34em] text-black/55">
          About
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl tracking-tight md:text-5xl break-words">
          Coastal luxury jewelry, designed to feel effortless — and unforgettable.
        </h1>

        <div className="mt-10 grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-7 min-w-0">
            <p className="text-base leading-relaxed text-black/75 break-words">
              Katherine Sterling Designs is a coastal-luxury jewelry brand rooted in
              freshwater pearls, gold-filled detailing, and celestial motifs. Every
              piece is designed to elevate the everyday — refined, romantic, and
              intentionally made to move with you.
            </p>

            <p className="mt-6 text-base leading-relaxed text-black/75 break-words">
              The collection blends soft coastal femininity with a high-end editorial
              sensibility: luminous pearls, warm gold tones, delicate layers, and
              modern heirloom silhouettes. Whether styled for beach light or city
              nights, each design is built for longevity and presence.
            </p>

            <p className="mt-6 text-base leading-relaxed text-black/75 break-words">
              We focus on craftsmanship, balance, and finish — pieces that feel light,
              look elevated, and photograph beautifully. Designed to be worn often,
              layered effortlessly, and kept for years.
            </p>

            <p className="mt-10 text-[11px] uppercase tracking-[0.34em] text-black/60 break-words">
              Pearls • Gold-filled • Celestial details
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 min-w-0">
            <div className="border border-black/10 p-8">
              <p className="text-[11px] uppercase tracking-[0.34em] text-black/55">
                Brand Notes
              </p>

              <ul className="mt-6 space-y-4 text-sm text-black/75">
                <li className="break-words">
                  <span className="font-medium text-black">Materials:</span>{" "}
                  Freshwater pearls, gold-filled hardware, premium beading.
                </li>
                <li className="break-words">
                  <span className="font-medium text-black">Aesthetic:</span>{" "}
                  Coastal romantic, elevated, editorial.
                </li>
                <li className="break-words">
                  <span className="font-medium text-black">Styling:</span>{" "}
                  Layered necklaces, huggies, statement pearls.
                </li>
                <li className="break-words">
                  <span className="font-medium text-black">Made for:</span>{" "}
                  Everyday luxury and special moments.
                </li>
              </ul>

              <div className="mt-8 h-px w-full bg-black/10" />

              <p className="mt-8 text-sm text-black/70 break-words">
                For collaborations, styling, or press inquiries, reach out through the
                Contact page.
              </p>
            </div>
          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}