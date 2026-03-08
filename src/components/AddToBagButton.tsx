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
      setMsg(
        status === "coming-soon"
          ? "This piece is coming soon."
          : "This piece is sold out."
      );
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
        status,
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
        className={`w-full rounded-xl border py-3 font-medium tracking-wide transition ${
          isUnavailable
            ? "cursor-not-allowed border-black/15 bg-black/[0.03] text-black/40"
            : "border-black bg-white text-black hover:bg-black hover:text-white"
        }`}
      >
        {buttonLabel}
      </button>

      {msg && <div className="mt-2 text-xs text-black/50">{msg}</div>}
    </div>
  );
}