export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#fbf7ef] px-6 py-20 text-black">
      <section className="mx-auto max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">
          Katherine Sterling Designs
        </p>

        <h1
          className="mt-4 text-4xl leading-none md:text-6xl"
          style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
        >
          Privacy Policy
        </h1>

        <p className="mt-6 text-sm leading-relaxed text-black/60">
          Last updated: June 2026
        </p>

        <div className="mt-12 space-y-10 rounded-[2rem] border border-black/10 bg-white/60 p-6 leading-relaxed text-black/70 shadow-[0_20px_70px_rgba(0,0,0,0.04)] md:p-8">
          <section>
            <h2 className="text-xl text-black">Overview</h2>
            <p className="mt-3">
              Katherine Sterling Designs respects your privacy. This policy
              explains how we collect, use, and protect information when you
              visit our website, place an order, or contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Information We Collect</h2>
            <p className="mt-3">
              We may collect information you provide directly, such as your
              name, email address, shipping address, billing details, order
              information, and messages submitted through our contact form.
            </p>
            <p className="mt-3">
              Payment information is processed securely through our payment
              provider. Katherine Sterling Designs does not store your full
              payment card information.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">How We Use Your Information</h2>
            <p className="mt-3">
              We use your information to process orders, ship purchases, respond
              to customer service requests, send order updates, prevent fraud,
              and improve our website and customer experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Sharing Your Information</h2>
            <p className="mt-3">
              We do not sell your personal information. We may share necessary
              information with trusted service providers, such as payment
              processors, shipping carriers, website hosting providers, and
              customer support tools, only as needed to operate our business.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Cookies and Website Data</h2>
            <p className="mt-3">
              Our website may use cookies or similar technologies to support
              basic site functionality, improve performance, and understand how
              visitors interact with the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Your Choices</h2>
            <p className="mt-3">
              You may contact us to request updates, corrections, or deletion of
              certain personal information, subject to order, legal, and business
              record requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Contact</h2>
            <p className="mt-3">
              For privacy questions, contact us at{" "}
              <a
                href="mailto:alyssa@katherinesterlingdesigns.com"
                className="underline underline-offset-4 hover:text-black"
              >
                alyssa@katherinesterlingdesigns.com
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}