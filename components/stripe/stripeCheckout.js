import { useAppContext } from "@/helpers/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { getStripeCustomer, stripeCreateOneOffIntent } from "@/helpers/stripe";
import SinglePaymentForm from "./singlePaymentForm";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function StripeCheckout({
  stripePayload,
  onSuccess,
  title,
  text,
}) {
  const context = useAppContext();
  const [clientSecret, setClientSecret] = useState();

  const initialiseStripe = async () => {
    const customerId = await getStripeCustomer(context?.profile?.email);
    const clientSecret = await stripeCreateOneOffIntent(
      stripePayload.price,
      customerId
    );
    setClientSecret(clientSecret);
  };

  useEffect(() => {
    if (!clientSecret) {
      initialiseStripe();
    }
  }, [clientSecret]);

  return (
    <div className="min-w-[500px]">
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <SinglePaymentForm
            title={title}
            text={text}
            onSuccess={onSuccess}
            amount={stripePayload.price}
          />
        </Elements>
      )}
    </div>
  );
}
