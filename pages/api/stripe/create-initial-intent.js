// pages/api/create-setup-intent.js

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { customerId, plan } = req.body;
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: plan,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });
    res.status(200).json({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
}
