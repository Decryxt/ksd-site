import { useState } from "react";
import { useCart } from "../context/CartContext";

type Props = {
  category: string;
  slug: string;
  title: string;
  price: number;
  stripePriceId?: string; // optional so we can show a clean error if missing
};

export default function AddToBagButton({
  category,
  slug,
  title,
  price,
  stripePriceId,
}: Props) {
  const { addToCart } = useCart();
  const [msg, setMsg] = useState<string | null>(null);

  const onAdd = () => {
    setMsg(null);

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
        className="w-full rounded-2xl border border-white/15 bg-white text-black py-3 font-medium hover:bg-white/90"
      >
        Add to Bag
      </button>

      {msg && <div className="mt-2 text-xs text-white/60">{msg}</div>}
    </div>
  );
}