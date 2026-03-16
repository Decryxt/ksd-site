type Body = {
  items: Array<{
    title: string;
    price: number;
    quantity: number;
  }>;
};

function generateIdempotencyKey() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const body: Body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const items = body?.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).send("No items provided.");
      return;
    }

    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;

    if (!accessToken || !locationId) {
      res.status(500).send("Missing Square environment variables.");
      return;
    }

    const line_items = items.map((item) => ({
      name: item.title,
      quantity: String(Math.max(1, Math.min(99, item.quantity))),
      base_price_money: {
        amount: Math.round(item.price * 100),
        currency: "USD",
      },
    }));

    const origin =
      req.headers?.origin ||
      (req.headers?.host ? `https://${req.headers.host}` : null);

    if (!origin) {
      res.status(500).send("Could not determine site origin.");
      return;
    }

    const payload = {
      idempotency_key: generateIdempotencyKey(),
      order: {
        location_id: locationId,
        line_items,
        pricing_options: {
          auto_apply_taxes: true,
        },
        service_charges: [
          {
            uid: "shipping-fee",
            name: "Shipping",
            amount_money: {
              amount: 800,
              currency: "USD",
            },
            calculation_phase: "SUBTOTAL_PHASE",
            taxable: false,
            scope: "ORDER",
          },
        ],
      },
      checkout_options: {
        redirect_url: `${origin}/bag?success=1`,
        ask_for_shipping_address: true,
        merchant_support_email: "alyssa@katherinesterlingdesigns.com",
      },
    };

    const response = await fetch(
      "https://connect.squareup.com/v2/online-checkout/payment-links",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data: any = await response.json();

    if (!response.ok) {
      console.error("Square error:", data);
      res.status(500).json(data);
      return;
    }

    const url = data?.payment_link?.url;

    if (!url) {
      res.status(500).send("Square checkout URL not returned.");
      return;
    }

    res.status(200).json({ url });
  } catch (err: any) {
    console.error("Checkout session error:", err);
    res.status(500).send(err?.message || "Server error");
  }
}