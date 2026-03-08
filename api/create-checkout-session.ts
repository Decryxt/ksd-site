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

// Your Stripe Shipping Rate ID for “Standard Shipping $10”
const SHIPPING_RATE_ID = "shr_1T8WtiQfJ3BDSPk8WtU8hUt1";

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

    const body: Body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const items = body?.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).send("No items provided.");
      return;
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (i) => ({
        price: i.stripePriceId,
        quantity: Math.max(1, Math.min(99, Number(i.quantity) || 1)),
      })
    );

    const uniquePriceIds = Array.from(new Set(items.map((i) => i.stripePriceId)));

    const prices = await Promise.all(
      uniquePriceIds.map((pid) => stripe.prices.retrieve(pid))
    );

    const priceMap = new Map<string, Stripe.Price>();
    for (const p of prices) {
      priceMap.set(p.id, p);
    }

    let subtotalCents = 0;

    for (const item of items) {
      const qty = Math.max(1, Math.min(99, Number(item.quantity) || 1));
      const priceObj = priceMap.get(item.stripePriceId);

      if (!priceObj) {
        res.status(400).send(`Invalid price id: ${item.stripePriceId}`);
        return;
      }

      const unitAmount = priceObj.unit_amount;
      if (typeof unitAmount !== "number") {
        res.status(400).send(`Price has no unit_amount: ${item.stripePriceId}`);
        return;
      }

      subtotalCents += unitAmount * qty;
    }

    const origin =
      req.headers?.origin ||
      (req.headers?.host ? `https://${req.headers.host}` : process.env.PUBLIC_SITE_URL);

    if (!origin) {
      res.status(500).send("Could not determine site origin.");
      return;
    }

    const successUrl = `${origin}/bag?success=1`;
    const cancelUrl = `${origin}/bag?canceled=1`;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      phone_number_collection: {
        enabled: true,
      },
    };

    if (subtotalCents < FREE_SHIPPING_THRESHOLD_CENTS) {
      sessionParams.shipping_options = [
        {
          shipping_rate: SHIPPING_RATE_ID,
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    res.status(200).json({ url: session.url });
  } catch (err: any) {
    res.status(500).send(err?.message || "Server error");
  }
}