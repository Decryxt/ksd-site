export default function Terms() {
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
          Terms of Service
        </h1>

        <p className="mt-6 text-sm leading-relaxed text-black/60">
          Last updated: June 2026
        </p>

        <div className="mt-12 space-y-10 rounded-[2rem] border border-black/10 bg-white/60 p-6 leading-relaxed text-black/70 shadow-[0_20px_70px_rgba(0,0,0,0.04)] md:p-8">
          <section>
            <h2 className="text-xl text-black">Overview</h2>
            <p className="mt-3">
              By using the Katherine Sterling Designs website, placing an order,
              or interacting with our services, you agree to these Terms of
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Products</h2>
            <p className="mt-3">
              Many Katherine Sterling Designs pieces are handcrafted in small
              batches or one of one. Because of this, slight variations in
              pearls, stones, charms, color, texture, and finish may occur. These
              variations are part of the character of handmade jewelry.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Pricing and Availability</h2>
            <p className="mt-3">
              Prices and availability may change without notice. Adding an item
              to your bag does not reserve inventory. Orders are confirmed once
              checkout is completed successfully.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Order Accuracy</h2>
            <p className="mt-3">
              Please review your order, shipping address, email address, and any
              customization details before checkout. Katherine Sterling Designs
              is not responsible for delays or delivery issues caused by
              incorrect customer-provided information.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Custom and Personalized Items</h2>
            <p className="mt-3">
              Customized, personalized, preorder, and made-to-order pieces may
              not be eligible for cancellation, return, or exchange once
              production has started unless the item arrives damaged or there was
              an error with your order.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Jewelry Care</h2>
            <p className="mt-3">
              Jewelry should be kept away from water, perfumes, lotions, sweat,
              and harsh chemicals unless specifically stated otherwise. Proper
              care helps preserve the finish and longevity of your piece.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Website Use</h2>
            <p className="mt-3">
              You agree not to misuse the website, interfere with checkout,
              attempt unauthorized access, copy site content for commercial use,
              or use Katherine Sterling Designs branding, product photography,
              or written content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Limitation of Liability</h2>
            <p className="mt-3">
              Katherine Sterling Designs is not liable for indirect, incidental,
              or consequential damages related to use of the website, product
              wear, delayed shipping carriers, or customer misuse of jewelry.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Contact</h2>
            <p className="mt-3">
              For questions about these terms, contact us at{" "}
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