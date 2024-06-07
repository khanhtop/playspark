// pages/api/create-customer.js

import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: { message: "Email is required" } });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Check if a customer with the email already exists
    const existingCustomers = await stripe.customers.list({ email: email });

    if (existingCustomers.data.length > 0) {
      const existingCustomer = existingCustomers.data[0];
      console.log(
        "Customer already exists. Returning existing customer ID:",
        existingCustomer.id
      );
      return res.status(200).json({ customerId: existingCustomer.id });
    }

    // If no existing customer, create a new one
    const customer = await stripe.customers.create({
      email: email,
    });

    // Access the customer ID
    const customerId = customer.id;
    console.log("New customer created. Customer ID:", customerId);

    res.status(200).json({ customerId });
  } catch (error) {
    console.error("Error creating or retrieving customer:", error);
    res.status(500).json({ error: { message: "Internal Server Error" } });
  }
}
