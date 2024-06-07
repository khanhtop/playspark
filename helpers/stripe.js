export const getStripeCustomer = async (email) => {
  const response = await fetch("/api/stripe/create-customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });

  const data = await response.json();
  return data.customerId;
};
