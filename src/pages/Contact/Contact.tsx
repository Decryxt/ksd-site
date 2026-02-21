import { useMemo, useState } from "react";

type Status =
  | { type: "idle"; message?: string }
  | { type: "sending"; message?: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const EMAIL_TO = "alyssa@katherinesterlingdesigns.com";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>({ type: "idle" });

  const formEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as
    | string
    | undefined;

  const canSubmit = useMemo(() => {
    if (!name.trim()) return false;
    if (!email.trim() || !isValidEmail(email)) return false;
    if (!message.trim()) return false;
    return true;
  }, [name, email, message]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "idle" });

    if (!name.trim()) {
      setStatus({ type: "error", message: "Please enter your name." });
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      setStatus({ type: "error", message: "Please enter a valid email." });
      return;
    }
    if (!message.trim()) {
      setStatus({ type: "error", message: "Please enter a message." });
      return;
    }

    if (!formEndpoint) {
      const subject = encodeURIComponent("Katherine Sterling Designs Inquiry");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
      );
      window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
      setStatus({
        type: "success",
        message:
          "Your email app should open now. If it didn’t, copy the message and send it to the email on the right.",
      });
      return;
    }

    try {
      setStatus({ type: "sending", message: "Sending…" });

      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: "Katherine Sterling Designs Inquiry",
        }),
      });

      if (!res.ok) {
        let detail = "";
        try {
          const data = await res.json();
          detail = data?.error || data?.message || "";
        } catch {
          // ignore
        }
        throw new Error(detail || "Unable to send message. Please try again.");
      }

      setStatus({
        type: "success",
        message: "Message sent. We’ll respond within 24–48 hours.",
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus({
        type: "error",
        message:
          err?.message ||
          "Something went wrong while sending. Please try again or email us directly.",
      });
    }
  }

  return (
    <div className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-16 md:pt-28 md:pb-24">
        <p className="text-[11px] uppercase tracking-[0.34em] text-black/55">
          Contact
        </p>

        <h1 className="mt-6 text-4xl tracking-tight md:text-5xl">
          Let’s connect.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/70 break-words">
          For collaborations, styling requests, wholesale inquiries, or press,
          send a message below and we’ll respond as soon as possible.
        </p>

        <div className="mt-12 grid grid-cols-12 gap-10">
          {/* Form */}
          <div className="col-span-12 md:col-span-7 min-w-0">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-[11px] uppercase tracking-[0.34em] text-black/55">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-[0.34em] text-black/55">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="mt-2 w-full border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30"
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-[0.34em] text-black/55">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 min-h-[160px] w-full resize-none border border-black/10 px-4 py-3 text-sm outline-none focus:border-black/30"
                  placeholder="Tell us what you're looking for..."
                />
              </div>

              {status.type !== "idle" ? (
                <div
                  className={[
                    "border px-4 py-3 text-sm break-words",
                    status.type === "success"
                      ? "border-black/15 text-black/80"
                      : status.type === "error"
                      ? "border-black/20 text-black/80"
                      : "border-black/10 text-black/60",
                  ].join(" ")}
                >
                  {status.message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!canSubmit || status.type === "sending"}
                className={[
                  "inline-flex items-center justify-center border px-6 py-3 text-[11px] uppercase tracking-[0.34em] transition-colors",
                  !canSubmit || status.type === "sending"
                    ? "border-black/10 text-black/35 cursor-not-allowed"
                    : "border-black/15 text-black hover:border-black/30",
                ].join(" ")}
              >
                {status.type === "sending" ? "Sending…" : "Send Message"}
              </button>

              {!formEndpoint ? (
                <p className="text-xs text-black/50 leading-relaxed break-words">
                  This form will open your email app (mailto) unless you set a
                  form endpoint. If you want it to send directly from the site,
                  connect Formspree and add{" "}
                  <span className="font-medium text-black/70">
                    VITE_CONTACT_FORM_ENDPOINT
                  </span>
                  .
                </p>
              ) : null}
            </form>
          </div>

          {/* Info */}
          <div className="col-span-12 md:col-span-5 min-w-0">
            <div className="border border-black/10 p-8">
              <p className="text-[11px] uppercase tracking-[0.34em] text-black/55">
                Inquiries
              </p>

              <div className="mt-6 space-y-4 text-sm text-black/75">
                <p className="break-words">
                  <span className="font-medium text-black">Email:</span>{" "}
                  {EMAIL_TO}
                </p>
                <p className="break-words">
                  <span className="font-medium text-black">Response time:</span>{" "}
                  24–48 hours
                </p>
                <p className="break-words">
                  <span className="font-medium text-black">
                    Collabs / Styling:
                  </span>{" "}
                  Include brand, date, and deliverables.
                </p>
              </div>

              <div className="mt-8 h-px w-full bg-black/10" />

              <p className="mt-8 text-sm text-black/70 break-words">
                For urgent updates, check Instagram stories for announcements.
              </p>
            </div>
          </div>
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
}