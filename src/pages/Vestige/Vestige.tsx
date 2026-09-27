export default function Vestige() {
  return (
    <div className="min-h-screen bg-white text-black">
      <section className="px-6 pb-16 pt-28 text-center md:px-10 md:pb-24 md:pt-40">
        <p className="mb-5 text-[10px] uppercase tracking-[0.38em] text-black/50">
          Katherine Sterling Designs
        </p>

        <h1 className="font-[Perfandory] text-6xl tracking-wide md:text-8xl">
          Vestige
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-black/65 md:text-base">
          A collection of past Katherine Sterling Designs pieces, preserved as
          part of the story. Explore designs from seasons gone by—pieces that
          were once made for sale and remain part of the KSD archive.
        </p>
      </section>

      <section className="border-t border-black/10 px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-black/45">
            Past Designs
          </p>
        </div>
      </section>
    </div>
  );
}