import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type Body = {
  items: Array<{
    stripePriceId: string;
    quantity: number;
  }>;
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      res.status(500).send("Missing STRIPE_SECRET_KEY env var.");
      return;
    }

    const body: Body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const items = body?.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).send("No items provided.");
      return;
    }

    // Build line items from Stripe Price IDs
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((i) => ({
      price: i.stripePriceId,
      quantity: Math.max(1, Math.min(99, Number(i.quantity) || 1)),
    }));

    // Determine site origin (works on Vercel)
    const origin =
      req.headers?.origin ||
      (req.headers?.host ? `https://${req.headers.host}` : process.env.PUBLIC_SITE_URL);

    if (!origin) {
      res.status(500).send("Could not determine site origin.");
      return;
    }

    // Lean mode: return to /bag with query flags (so we don't need new pages yet)
    const successUrl = `${origin}/bag?success=1`;
    const cancelUrl = `${origin}/bag?canceled=1`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.status(200).json({ url: session.url });
  } catch (err: any) {
    res.status(500).send(err?.message || "Server error");
  }
}