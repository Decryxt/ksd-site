import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-3xl tracking-tight">Page not found</h1>
      <p className="mt-3 text-white/70">That route doesn’t exist.</p>

      <Link
        to="/"
        className="mt-8 inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm hover:border-white/30"
      >
        Back to Home
      </Link>
    </div>
  );
}