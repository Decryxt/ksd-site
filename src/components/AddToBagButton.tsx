import { useState } from "react";
import { useCart } from "../context/CartContext";

type ProductStatus = "active" | "coming-soon" | "sold-out" | "preorder";

type Pendant = {
  type: "boy" | "girl";
  month: string;
};

type Props = {
  category: string;
  slug: string;
  title: string;
  price: number;
  status?: ProductStatus;
  preorderShipDate?: string;
  squareVariationId?: string;

  customizations?: {
    pendants?: Pendant[];
  };
};

export default function AddToBagButton({
  category,
  slug,
  title,
  price,
  status = "active",
  preorderShipDate,
  squareVariationId,
  customizations,
}: Props) {
  const { addToCart } = useCart();
  const [msg, setMsg] = useState<string | null>(null);

  const isUnavailable = status === "coming-soon" || status === "sold-out";
  const isPreorder = status === "preorder";

  const buttonLabel =
    status === "coming-soon"
      ? "Coming Soon"
      : status === "sold-out"
      ? "Sold Out"
      : status === "preorder"
      ? "Preorder"
      : "Add to Bag";

  function handleAdd() {
    if (isUnavailable) return;

    addToCart({
      category,
      slug,
      title,
      price,
      status,
      preorderShipDate,
      squareVariationId,
      customizations,
    });

    setMsg(isPreorder ? "Added as preorder" : "Added to bag");

    window.setTimeout(() => {
      setMsg(null);
    }, 2200);
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleAdd}
        disabled={isUnavailable}
        className={[
          "w-full rounded-full border px-5 py-3 text-sm uppercase tracking-[0.22em] transition",
          isUnavailable
            ? "cursor-not-allowed border-black/10 bg-black/5 text-black/35"
            : "border-black bg-black text-white hover:bg-white hover:text-black",
        ].join(" ")}
      >
        {buttonLabel}
      </button>

      {isPreorder ? (
        <p className="mt-3 text-xs leading-relaxed text-black/55">
          This item is available for preorder and will ship on or after its launch date.
        </p>
      ) : null}

      {msg ? <p className="mt-3 text-xs text-black/55">{msg}</p> : null}
    </div>
  );
}