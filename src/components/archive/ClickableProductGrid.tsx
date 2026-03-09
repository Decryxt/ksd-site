import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

export type ClickableGridItem = {
  id: string;
  name: string;
  imageUrl: string;
  href: string;
  collection?: string;
};

const collectionStyles: Record<
  string,
  {
    label: string;
    badgeClassName: string;
    cardClassName: string;
    titleClassName?: string;
    titleStyle?: CSSProperties;
  }
> = {
  "golden-hour-muse": {
    label: "GOLDEN HOUR MUSE",
    badgeClassName:
      "text-[0.72rem] uppercase tracking-[0.40em] text-[#b98a3e]",
    cardClassName:
      "border-[#d8c19a] shadow-[0_14px_40px_rgba(184,138,62,0.16)]",
    titleClassName: "tracking-[0.02em]",
    titleStyle: {
      fontFamily: '"Luxeline", serif',
      fontWeight: 400,
    },
  },
};

export default function ClickableProductGrid({ items }: { items: ClickableGridItem[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
        {items.map((item) => {
          const collection = item.collection ? collectionStyles[item.collection] : null;

          return (
            <Link key={item.id} to={item.href} className="group block">
              <div
                className={[
                  "overflow-hidden rounded-2xl border bg-white transition-all duration-500",
                  collection
                    ? collection.cardClassName
                    : "border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
                ].join(" ")}
              >
                <div className="aspect-[4/5] overflow-hidden bg-black/5">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <div className="p-4 min-h-[122px] flex flex-col justify-end">
                  {collection ? (
                    <div
                      className={collection.badgeClassName}
                      style={{ fontFamily: '"Luxeline", serif' }}
                    >
                      {collection.label}
                    </div>
                  ) : null}

                  <div
                    className={[
                      "leading-snug text-black/90",
                      collection
                        ? "mt-2 text-[1.15rem]"
                        : "text-[0.95rem] tracking-wide",
                      collection?.titleClassName ?? "",
                    ].join(" ")}
                    style={collection?.titleStyle}
                  >
                    {item.name}
                  </div>

                  <div className="mt-2 text-xs tracking-[0.22em] uppercase text-black/45">
                    View details
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}