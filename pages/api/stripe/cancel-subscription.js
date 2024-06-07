// pages/api/cancel-subscription.js

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { email } = req.body;

    // Retrieve the customer ID using the email
    const customer = await stripe.customers.list({
      email,
      limit: 1, // Limit to 1 result since email should be unique
    });

    if (customer.data.length === 0) {
      return res.status(404).json({ error: { message: "Customer not found" } });
    }

    const customerId = customer.data[0].id;

    // Retrieve the customer's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active", // You may adjust the status filter based on your requirements
    });

    // Cancel each active subscription
    await Promise.all(
      subscriptions.data.map(async (subscription) => {
        await stripe.subscriptions.update(subscription.id, {
          cancel_at_period_end: true,
        });
      })
    );

    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
}
