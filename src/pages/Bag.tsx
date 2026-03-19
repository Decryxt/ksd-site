import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatShipDate(value?: string) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
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
    return items.length > 0;
  }, [items]);

  const preorderItems = useMemo(
    () => items.filter((i) => i.status === "preorder"),
    [items]
  );

  const hasPreorderItems = preorderItems.length > 0;

  const preorderNoticeText = useMemo(() => {
    if (!hasPreorderItems) return null;

    const shipDates = Array.from(
      new Set(
        preorderItems
          .map((i) => i.preorderShipDate)
          .filter(Boolean)
      )
    ) as string[];

    if (shipDates.length === 1) {
      return `Your bag contains one or more preorder items and will ship on or after ${formatShipDate(
        shipDates[0]
      )}.`;
    }

    if (shipDates.length > 1) {
      return "Your bag contains one or more preorder items. Items will ship on or after their listed launch dates.";
    }

    return "Your bag contains one or more preorder items and will ship on or after their launch date.";
  }, [hasPreorderItems, preorderItems]);

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
            title: i.title,
            price: i.price,
            quantity: i.quantity,
            slug: i.slug,
            category: i.category,
            squareVariationId: i.squareVariationId,
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

        {hasPreorderItems && items.length > 0 && (
          <div className="mt-6 rounded-2xl bg-black px-5 py-4 text-white">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/70">
              Preorder Notice
            </div>
            <div className="mt-2 text-sm leading-relaxed text-white/90">
              {preorderNoticeText}
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
              {items.map((i) => {
                const shipDate = formatShipDate(i.preorderShipDate);

                return (
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

                        {i.status === "preorder" && (
                          <div className="mt-3 space-y-1">
                            <div className="text-[10px] uppercase tracking-[0.24em] text-black/40">
                              Preorder
                            </div>

                            {shipDate && (
                              <div className="text-xs text-black/55">
                                Ships on or after {shipDate}
                              </div>
                            )}
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
                );
              })}

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
                  Taxes & shipping will be calculated during checkout.
                </div>

                {hasPreorderItems && (
                  <div className="mt-4 rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-xs text-black/70 leading-relaxed">
                    Preorder items in this bag will ship on or after their listed launch date.
                  </div>
                )}

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