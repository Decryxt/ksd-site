import { useEffect, useRef } from "react";

export default function StudioSignup() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formRef.current) return;

    const script = document.createElement("script");

    script.async = true;
    script.src =
      "https://katherine-sterling-designs.kit.com/69c250a2a2/index.js";

    formRef.current.appendChild(script);

    return () => {
      if (formRef.current) {
        formRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f7f2e9] text-black">
      <style>
        {`
          @keyframes studio-glow {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 0.35;
            }

            50% {
              transform: translate3d(18px, -12px, 0) scale(1.08);
              opacity: 0.55;
            }
          }

          @keyframes studio-shimmer {
            0% {
              transform: translateX(-120%);
            }

            100% {
              transform: translateX(120%);
            }
          }

          .studio-glow {
            animation: studio-glow 9s ease-in-out infinite;
          }

          .studio-shimmer {
            animation: studio-shimmer 8s ease-in-out infinite;
          }

          .studio-signup-input input {
            width: 100% !important;
            min-height: 56px !important;
            border: 0 !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.18) !important;
            border-radius: 0 !important;
            background: transparent !important;
            padding: 14px 4px !important;
            font-family: inherit !important;
            font-size: 13px !important;
            color: #171513 !important;
            outline: none !important;
            box-shadow: none !important;
          }

          .studio-signup-input input::placeholder {
            color: rgba(0, 0, 0, 0.45) !important;
          }

          .studio-signup-input input:focus {
            border-bottom-color: rgba(151, 97, 61, 0.65) !important;
          }

          .studio-signup-button button,
          .studio-signup-button input[type="submit"] {
            min-height: 56px !important;
            border: 1px solid rgba(0, 0, 0, 0.10) !important;
            border-radius: 0 !important;
            background: #171513 !important;
            color: white !important;
            padding: 0 30px !important;
            font-family: inherit !important;
            font-size: 10px !important;
            font-weight: 500 !important;
            letter-spacing: 0.22em !important;
            text-transform: uppercase !important;
            cursor: pointer !important;
            transition:
              background-color 200ms ease,
              transform 200ms ease,
              box-shadow 200ms ease !important;
          }

          .studio-signup-button button:hover,
          .studio-signup-button input[type="submit"]:hover {
            background: #000 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12) !important;
          }

          .studio-signup-button button:focus-visible,
          .studio-signup-button input[type="submit"]:focus-visible {
            outline: 2px solid rgba(151, 97, 61, 0.55) !important;
            outline-offset: 3px !important;
          }

          .studio-signup-form form {
            margin: 0 !important;
          }

          .studio-signup-form [data-element="fields"] {
            display: flex !important;
            align-items: flex-end !important;
            gap: 14px !important;
          }

          .studio-signup-form [data-element="fields"] > div:first-child {
            flex: 1 !important;
            min-width: 0 !important;
          }

          .studio-signup-form [data-element="fields"] > div:last-child {
            flex-shrink: 0 !important;
          }

          .studio-signup-form label {
            display: none !important;
          }

          .studio-signup-form [data-element="submit"] {
            width: auto !important;
          }

          .studio-signup-form [data-element="powered-by"] {
            display: none !important;
          }

          @media (max-width: 640px) {
            .studio-signup-form [data-element="fields"] {
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 12px !important;
            }

            .studio-signup-button button,
            .studio-signup-button input[type="submit"] {
              width: 100% !important;
            }
          }
        `}
      </style>

      {/* Ambient jewelry-inspired light */}
      <div
        className="studio-glow pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-[#d4b26a]/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="studio-glow pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#9b6b3d]/15 blur-3xl"
        style={{ animationDelay: "-4s" }}
        aria-hidden="true"
      />

      {/* Subtle moving highlight */}
      <div
        className="studio-shimmer pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <div className="relative overflow-hidden border border-black/10 bg-white/55 px-6 py-14 shadow-[0_20px_80px_rgba(0,0,0,0.04)] backdrop-blur-sm md:px-14 md:py-20">
          {/* Editorial top line */}
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-black/10" />

            <span className="text-[10px] uppercase tracking-[0.32em] text-black/40">
              Katherine Sterling Designs
            </span>

            <div className="h-px flex-1 bg-black/10" />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] uppercase tracking-[0.38em] text-black/45">
              From the Studio
            </p>

            <h2
              className="mt-5 text-5xl leading-[0.9] text-black md:text-7xl lg:text-8xl"
              style={{
                fontFamily: '"Perandory", serif',
                fontWeight: 400,
              }}
            >
              Come a little closer.
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-black/60 md:text-base">
              Notes from Alyssa, new pieces, one-of-one designs, and the
              little moments behind the jewelry. A glimpse into what is being
              made, collected, and imagined next.
            </p>
          </div>

          {/* Decorative jewelry-inspired divider */}
          <div className="mx-auto my-12 flex max-w-md items-center justify-center gap-4">
            <div className="h-px flex-1 bg-black/10" />

            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute h-5 w-5 rotate-45 border border-[#b99558]/55" />
              <div className="h-2 w-2 rounded-full bg-[#d4b26a]/70" />
            </div>

            <div className="h-px flex-1 bg-black/10" />
          </div>

          {/* Kit signup */}
          <div className="mx-auto max-w-3xl">
            <div className="studio-signup-form">
              <div
                ref={formRef}
                className="min-h-[70px]"
                aria-label="Email signup"
              />
            </div>
          </div>

          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.24em] text-black/35">
            New collections · Studio notes · First looks
          </p>

          {/* Bottom editorial detail */}
          <div className="mt-14 flex items-center justify-center gap-3">
            <span className="h-1 w-1 rounded-full bg-[#b99558]/70" />
            <span className="text-[9px] uppercase tracking-[0.28em] text-black/30">
              Occasionally, and always with intention.
            </span>
            <span className="h-1 w-1 rounded-full bg-[#b99558]/70" />
          </div>
        </div>
      </div>
    </section>
  );
}