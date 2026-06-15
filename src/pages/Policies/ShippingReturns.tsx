export default function ShippingReturns() {
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
          Shipping & Returns
        </h1>

        <p className="mt-6 text-sm leading-relaxed text-black/60">
          Last updated: June 2026
        </p>

        <div className="mt-12 space-y-10 rounded-[2rem] border border-black/10 bg-white/60 p-6 leading-relaxed text-black/70 shadow-[0_20px_70px_rgba(0,0,0,0.04)] md:p-8">
          <section>
            <h2 className="text-xl text-black">Shipping</h2>
            <p className="mt-3">
              Katherine Sterling Designs currently ships within the United
              States. Orders are processed as quickly as possible, usually within
              a few business days unless the item is listed as preorder,
              customized, made-to-order, or otherwise noted on the product page.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Free Shipping</h2>
            <p className="mt-3">
              We offer free shipping on orders over $120. Shipping costs for
              orders below $120 are calculated during checkout.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Processing Times</h2>
            <p className="mt-3">
              Ready-to-ship items typically process within 2–5 business days.
              Handmade, customized, preorder, and small-batch pieces may require
              additional time. If a product has a special shipping timeline, it
              will be noted on the product page when possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Delivery</h2>
            <p className="mt-3">
              Once your order has been handed to the shipping carrier, delivery
              timing is controlled by the carrier. Katherine Sterling Designs is
              not responsible for carrier delays, lost packages marked as
              delivered, or incorrect addresses entered at checkout.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Returns and Exchanges</h2>
            <p className="mt-3">
              Because many pieces are handmade, one of one, limited quantity, or
              customized, returns and exchanges are limited. Please contact us
              within 7 days of delivery if there is an issue with your order.
            </p>
            <p className="mt-3">
              Items must be unworn, unused, and in their original condition to be
              considered for a return or exchange.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Final Sale Items</h2>
            <p className="mt-3">
              Custom, personalized, preorder, made-to-order, sale, and one-of-one
              items may be final sale unless they arrive damaged or there was an
              error with your order.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Damaged or Incorrect Orders</h2>
            <p className="mt-3">
              If your order arrives damaged or incorrect, please contact us
              within 7 days of delivery with your order number and clear photos
              of the item and packaging. We will review the issue and help make
              it right.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Return Shipping</h2>
            <p className="mt-3">
              Customers are responsible for return shipping costs unless the item
              arrived damaged or the wrong item was sent. Original shipping costs
              are non-refundable unless required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-black">Contact</h2>
            <p className="mt-3">
              For shipping or return questions, contact us at{" "}
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