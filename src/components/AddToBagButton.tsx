import { useState } from "react";
import { useCart } from "../context/CartContext";

type Props = {
  category: string;
  slug: string;
  title: string;
  price: number;
  stripePriceId?: string;
  status?: "active" | "coming-soon" | "sold-out";
};

export default function AddToBagButton({
  category,
  slug,
  title,
  price,
  stripePriceId,
  status = "active",
}: Props) {
  const { addToCart } = useCart();
  const [msg, setMsg] = useState<string | null>(null);

  const isUnavailable = status === "coming-soon" || status === "sold-out";

  const buttonLabel =
    status === "coming-soon"
      ? "Coming Soon"
      : status === "sold-out"
      ? "Sold Out"
      : "Add to Bag";

  const onAdd = () => {
    setMsg(null);

    if (isUnavailable) {
      return;
    }

    if (!stripePriceId) {
      setMsg("Missing Stripe Price ID for this item.");
      return;
    }

    addToCart(
      {
        category,
        slug,
        title,
        price,
        stripePriceId,
      },
      1
    );

    setMsg("Added to bag.");
    setTimeout(() => setMsg(null), 1200);
  };

  return (
    <div className="mt-6">
      <button
        onClick={onAdd}
        disabled={isUnavailable}
        className={`w-full rounded-2xl py-3 font-medium transition ${
          isUnavailable
            ? "cursor-not-allowed border border-white/10 bg-white/5 text-white/40"
            : "border border-white/15 bg-white text-black hover:bg-white/90"
        }`}
      >
        {buttonLabel}
      </button>

      {msg && <div className="mt-2 text-xs text-white/60">{msg}</div>}
    </div>
  );
}