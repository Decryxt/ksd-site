import { FormEvent, useState } from "react";

export default function StudioSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    setStatus("submitting");

    try {
      const formData = new FormData();
      formData.append("email_address", email.trim());

      const response = await fetch(
        "https://app.kit.com/forms/9971129/subscriptions",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#f7f2e9] text-black">
      <style>
        {`
          @keyframes studio-glow {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 0.30;
            }

            50% {
              transform: translate3d(18px, -12px, 0) scale(1.08);
              opacity: 0.50;
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
        `}
      </style>

      {/* Ambient light */}
      <div
        className="studio-glow pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-[#d4b26a]/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="studio-glow pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#9b6b3d]/15 blur-3xl"
        style={{ animationDelay: "-4s" }}
        aria-hidden="true"
      />

      {/* Soft moving highlight */}
      <div
        className="studio-shimmer pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <div className="relative overflow-hidden border border-black/10 bg-white/55 px-6 py-14 shadow-[0_20px_80px_rgba(0,0,0,0.04)] backdrop-blur-sm md:px-14 md:py-20">
          {/* Editorial top line */}
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-black/10" />

            <span className="text-center text-[10px] uppercase tracking-[0.32em] text-black/40">
              Katherine Sterling Designs
            </span>

            <div className="h-px flex-1 bg-black/10" />
          </div>

          {/* Heading */}
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

          {/* Jewelry-inspired divider */}
          <div className="mx-auto my-12 flex max-w-md items-center justify-center gap-4">
            <div className="h-px flex-1 bg-black/10" />

            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute h-5 w-5 rotate-45 border border-[#b99558]/55" />
              <div className="h-2 w-2 rounded-full bg-[#d4b26a]/70" />
            </div>

            <div className="h-px flex-1 bg-black/10" />
          </div>

          {/* Email signup */}
          <div className="mx-auto max-w-3xl">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row sm:items-end"
            >
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="studio-email"
                  className="mb-2 block text-[9px] uppercase tracking-[0.28em] text-black/40"
                >
                  Email Address
                </label>

                <input
                  id="studio-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (status !== "idle") {
                      setStatus("idle");
                    }
                  }}
                  placeholder="Your email address"
                  autoComplete="email"
                  required
                  disabled={status === "submitting"}
                  className="h-14 w-full border-0 border-b border-black/20 bg-transparent px-1 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-[#9b6b3d]/70 disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="h-14 shrink-0 border border-black/10 bg-[#171513] px-8 text-[10px] font-medium uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] disabled:cursor-not-allowed disabled:opacity-60 sm:px-10"
              >
                {status === "submitting" ? "Joining..." : "Join"}
              </button>
            </form>

            {/* Success */}
            {status === "success" && (
              <div className="mt-5 text-center">
                <p
                  className="text-2xl text-black"
                  style={{
                    fontFamily: '"Perandory", serif',
                    fontWeight: 400,
                  }}
                >
                  You're in.
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-black/40">
                  Welcome to the studio.
                </p>
              </div>
            )}

            {/* Error */}
            {status === "error" && (
              <p className="mt-4 text-center text-xs text-black/55">
                Something went wrong. Please try again.
              </p>
            )}
          </div>

          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.24em] text-black/35">
            New collections · Studio notes · First looks
          </p>

          {/* Bottom editorial detail */}
          <div className="mt-14 flex items-center justify-center gap-3">
            <span className="h-1 w-1 rounded-full bg-[#b99558]/70" />

            <span className="text-center text-[9px] uppercase tracking-[0.28em] text-black/30">
              Occasionally, and always with intention.
            </span>

            <span className="h-1 w-1 rounded-full bg-[#b99558]/70" />
          </div>
        </div>
      </div>
    </section>
  );
}