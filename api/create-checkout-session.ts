import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type Body = {
  items: Array<{
    stripePriceId: string;
    quantity: number;
  }>;
};

// $125 threshold (in cents)
const FREE_SHIPPING_THRESHOLD_CENTS = 12500;

// Your Stripe Price ID for “Standard Shipping $10”
const SHIPPING_PRICE_ID = "price_1T4Wu6QXLBKalpyYvyEqQpSy";

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

    // Build line items from Stripe Price IDs (trust price/amount from Stripe, not frontend)
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((i) => ({
      price: i.stripePriceId,
      quantity: Math.max(1, Math.min(99, Number(i.quantity) || 1)),
    }));

    // --- NEW: compute subtotal from Stripe prices ---
    // Get unique price IDs to minimize API calls
    const uniquePriceIds = Array.from(new Set(items.map((i) => i.stripePriceId)));

    const prices = await Promise.all(
      uniquePriceIds.map((pid) => stripe.prices.retrieve(pid))
    );

    const priceMap = new Map<string, Stripe.Price>();
    for (const p of prices) priceMap.set(p.id, p);

    // Subtotal in cents
    let subtotalCents = 0;

    for (const item of items) {
      const qty = Math.max(1, Math.min(99, Number(item.quantity) || 1));
      const priceObj = priceMap.get(item.stripePriceId);

      if (!priceObj) {
        res.status(400).send(`Invalid price id: ${item.stripePriceId}`);
        return;
      }

      // Only supports fixed, one-time prices for now
      const unitAmount = priceObj.unit_amount;
      if (typeof unitAmount !== "number") {
        res.status(400).send(`Price has no unit_amount: ${item.stripePriceId}`);
        return;
      }

      subtotalCents += unitAmount * qty;
    }

    // Add shipping line item only if under $125
    if (subtotalCents < FREE_SHIPPING_THRESHOLD_CENTS) {
      line_items.push({
        price: SHIPPING_PRICE_ID,
        quantity: 1,
      });
    }

    // Determine site origin (works on Vercel)
    const origin =
      req.headers?.origin ||
      (req.headers?.host ? `https://${req.headers.host}` : process.env.PUBLIC_SITE_URL);

    if (!origin) {
      res.status(500).send("Could not determine site origin.");
      return;
    }

    const successUrl = `${origin}/bag?success=1`;
    const cancelUrl = `${origin}/bag?canceled=1`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,

      shipping_address_collection: {
        allowed_countries: ["US"],
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err: any) {
    res.status(500).send(err?.message || "Server error");
  }
}