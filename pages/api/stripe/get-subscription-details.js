// pages/api/get-subscription-details.js

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { email } = req.body;

    // Retrieve the customer ID based on the email
    const customer = await stripe.customers.list({
      email,
      limit: 1, // Assuming there is at most one customer with the given email
    });

    if (customer.data.length === 0) {
      return res.status(200).json({ subscribed: false, customerId: null });
    }

    const customerId = customer.data[0].id;

    // Retrieve the customer's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1, // Assuming the customer has at most one subscription
    });

    if (subscriptions.data.length === 0) {
      return res.status(200).json({ subscribed: false, customerId });
    }

    const subscription = subscriptions.data[0];

    // Check if the subscription is canceled
    if (subscription.status === "canceled" && subscription.canceled_at) {
      return res.status(200).json({ subscribed: false, customerId });
    }

    // Retrieve upcoming invoice to get the amount due
    const upcomingInvoice = subscription.upcoming_invoice
      ? await stripe.invoices.retrieve(subscription.upcoming_invoice)
      : null;

    const nextBillingDate = new Date(subscription.current_period_end * 1000);
    const nextBillingAmount =
      subscription.items.data[0].price.unit_amount / 100; // Convert from cents to dollars

    let upcomingInvoiceAmount = 0;
    if (upcomingInvoice) {
      upcomingInvoiceAmount = upcomingInvoice.amount_due / 100; // Convert from cents to dollars
    }

    // Retrieve invoices (PDFs)
    const invoices = await stripe.invoices.list({
      customer: customerId,
      subscription: subscription.id,
      limit: 5, // Limit to the latest 5 invoices
    });

    const invoicePDFs = invoices.data.map((invoice) => {
      return {
        invoiceId: invoice.id,
        pdfLink: invoice.invoice_pdf,
      };
    });

    return res.status(200).json({
      subscribed: subscription.status,
      customerId,
      nextBillingDate,
      nextBillingAmount,
      upcomingInvoiceAmount,
      invoicePDFs,
      subscription: subscription,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
}
