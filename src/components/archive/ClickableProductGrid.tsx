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
    cardClassName: string;
    titleStyle?: CSSProperties;
  }
> = {
  "golden-hour-muse": {
    label: "Golden Hour Muse",
    cardClassName:
      "border-[2px] border-[#d4b26a] shadow-[0_10px_30px_rgba(212,178,106,0.16)]",
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
              <div className="relative overflow-hidden rounded-2xl">
                {collection ? (
                  <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(120deg,rgba(212,178,106,0.22)_0%,rgba(255,244,214,0.85)_20%,rgba(212,178,106,0.28)_38%,rgba(255,245,225,0.92)_50%,rgba(212,178,106,0.24)_62%,rgba(255,244,214,0.85)_80%,rgba(212,178,106,0.22)_100%)] bg-[length:240%_240%] animate-[goldShimmer_7s_linear_infinite] blur-[10px] group-hover:animate-[goldShimmer_2.2s_linear_infinite]" />
                    <div className="absolute inset-[1.5px] rounded-[15px] bg-white" />
                  </div>
                ) : null}

                <div
                  className={[
                    "relative z-20 overflow-hidden rounded-2xl border bg-white transition-all duration-700",
                    collection
                      ? `${collection.cardClassName} group-hover:shadow-[0_18px_70px_rgba(212,178,106,0.38)] group-hover:-translate-y-[2px]`
                      : "border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
                  ].join(" ")}
                >
                  <div className="aspect-[4/5] overflow-hidden bg-black/5">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div
                        className={[
                          "leading-snug text-black/90",
                          collection ? "text-[1.05rem]" : "text-[0.95rem] tracking-wide",
                        ].join(" ")}
                        style={collection?.titleStyle}
                      >
                        {item.name}
                      </div>

                      {collection ? (
                        <div
                          className="shrink-0 text-[0.68rem] uppercase tracking-[0.28em] text-black"
                          style={{ fontFamily: '"Luxeline", serif', fontWeight: 400 }}
                        >
                          {collection.label}
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-3 text-xs tracking-[0.22em] uppercase text-black/45">
                      View details
                    </div>
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