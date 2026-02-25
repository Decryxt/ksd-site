import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function Bag() {
  const { items, removeFromCart, setQty, subtotal, totalItems, clearCart } = useCart();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const success = searchParams.get("success") === "1";
  const canceled = searchParams.get("canceled") === "1";

  // If they return from successful checkout, clear bag (lean mode)
  useEffect(() => {
    if (success) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const canCheckout = useMemo(() => {
    if (items.length === 0) return false;
    // every item needs a stripePriceId
    return items.every((i) => Boolean(i.stripePriceId));
  }, [items]);

  const onCheckout = async () => {
    setError(null);

    if (!items.length) {
      setError("Your bag is empty.");
      return;
    }

    if (!canCheckout) {
      setError("One or more items are missing Stripe Price IDs.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            stripePriceId: i.stripePriceId,
            quantity: i.quantity,
          })),
        }),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Failed to start checkout.");
      }

      const data = (await res.json()) as { url?: string };
      if (!data.url) throw new Error("No checkout URL returned.");

      window.location.href = data.url;
    } catch (e: any) {
      setError(e?.message || "Checkout failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center justify-between">
          <h1
            className="text-4xl tracking-[-0.01em]"
            style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
          >
            Bag
          </h1>

          <Link to="/" className="text-sm text-black/60 hover:text-black underline underline-offset-4">
            Continue Shopping
          </Link>
        </div>

        <div className="mt-2 text-sm text-black/60">
          {totalItems} item{totalItems === 1 ? "" : "s"}
        </div>

        {/* RETURN BANNERS */}
        {success && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900">
            <div className="text-sm font-medium">Payment successful.</div>
            <div className="text-xs mt-1 text-emerald-900/70">
              Your order is confirmed. A receipt will be sent by Stripe.
            </div>
          </div>
        )}

        {canceled && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900">
            <div className="text-sm font-medium">Checkout canceled.</div>
            <div className="text-xs mt-1 text-amber-900/70">
              No worries — your bag is still here.
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-black/10 p-8">
            <p className="text-black/70">Your bag is empty.</p>
            <Link
              to="/archive/necklaces"
              className="mt-4 inline-block text-sm underline underline-offset-4 text-black/70 hover:text-black"
            >
              Browse the Archive
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ITEMS */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((i) => (
                <div
                  key={i.slug}
                  className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="text-xl"
                        style={{ fontFamily: '"Perandory", serif', fontWeight: 400 }}
                      >
                        {i.title}
                      </div>
                      <div className="mt-1 text-sm text-black/60">
                        {formatUSD(i.price)}
                      </div>
                      <div className="mt-2 text-xs text-black/45 uppercase tracking-[0.28em]">
                        {i.category}
                      </div>

                      {!i.stripePriceId && (
                        <div className="mt-2 text-xs text-red-600">
                          Missing Stripe Price ID (cannot checkout yet)
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(i.slug)}
                      className="text-sm text-black/55 hover:text-black underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQty(i.slug, i.quantity - 1)}
                        className="h-9 w-9 rounded-full border border-black/15 bg-black/5 hover:bg-black/10 transition"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>

                      <div className="w-10 text-center text-sm">{i.quantity}</div>

                      <button
                        onClick={() => setQty(i.slug, i.quantity + 1)}
                        className="h-9 w-9 rounded-full border border-black/15 bg-black/5 hover:bg-black/10 transition"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-sm text-black/70">
                      Line total: {formatUSD(i.price * i.quantity)}
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-sm text-black/55 hover:text-black underline underline-offset-4"
              >
                Clear bag
              </button>
            </div>

            {/* SUMMARY */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-black/10 bg-white p-6 sticky top-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                <div className="text-xs text-black/55 uppercase tracking-[0.28em]">
                  Summary
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-black/60 text-sm">Subtotal</div>
                  <div className="text-black/90 text-sm">{formatUSD(subtotal)}</div>
                </div>

                <div className="mt-2 text-xs text-black/50 leading-relaxed">
                  Taxes & shipping will be calculated in Stripe Checkout (launch mode).
                </div>

                {error && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {error}
                  </div>
                )}

                <button
                  onClick={onCheckout}
                  disabled={loading}
                  className="mt-6 w-full rounded-xl border border-black/15 bg-black text-white py-3 text-sm tracking-wide hover:bg-black/90 transition disabled:opacity-60"
                  type="button"
                >
                  {loading ? "Redirecting to checkout..." : "Checkout"}
                </button>

                {!canCheckout && (
                  <div className="mt-3 text-xs text-black/55">
                    Add Stripe Price IDs to all items you want to sell before checkout will work.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}