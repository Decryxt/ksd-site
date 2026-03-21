type Pendant = {
  type: "boy" | "girl";
  month: string;
};

type Body = {
  items: Array<{
    title: string;
    price: number;
    quantity: number;
    squareVariationId?: string;
    customizations?: {
      pendants?: Pendant[];
    };
  }>;
};

function generateIdempotencyKey() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function buildCustomizationNote(
  customizations?: {
    pendants?: Pendant[];
  }
) {
  const pendants = customizations?.pendants ?? [];

  if (!pendants.length) return undefined;

  return pendants
    .map((p, index) => `Pendant ${index + 1}: ${p.type === "boy" ? "Boy" : "Girl"} - ${p.month}`)
    .join(" | ");
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

    for (const item of items) {
      if (!item.squareVariationId) {
        res.status(400).json({
          error: `Missing squareVariationId for item: ${item.title}`,
        });
        return;
      }
    }

    const line_items = items.map((item) => {
      const note = buildCustomizationNote(item.customizations);

      return {
        catalog_object_id: item.squareVariationId,
        quantity: String(Math.max(1, Math.min(99, item.quantity))),
        ...(note ? { note } : {}),
      };
    });

    console.log("KSD line_items being sent to Square:", JSON.stringify(line_items, null, 2));

    const subtotal = items.reduce((sum, item) => {
      const quantity = Math.max(1, Math.min(99, item.quantity));
      return sum + Math.round(item.price * 100) * quantity;
    }, 0);

    const shippingAmount = subtotal >= 12000 ? 0 : 800;

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
        service_charges:
          shippingAmount > 0
            ? [
                {
                  uid: "standard-shipping",
                  name: "Standard Shipping",
                  amount_money: {
                    amount: shippingAmount,
                    currency: "USD",
                  },
                  calculation_phase: "SUBTOTAL_PHASE",
                  taxable: false,
                  scope: "ORDER",
                },
              ]
            : [],
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
    
    console.log("Square create payment link response:", JSON.stringify(data, null, 2));

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