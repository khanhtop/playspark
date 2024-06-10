import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const SinglePaymentForm = ({ amount, onSuccess }) => {
  const elements = useElements();
  const stripe = useStripe();
  const [isCardValid, setIsCardValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleCardChange = (event) => {
    setIsCardValid(event.complete && event.error === undefined);
  };

  const handleSubmit = async (event) => {
    if (!stripe || !elements) return;
    event.preventDefault();
    setLoading(true);
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });
    if (error) {
      setLoading(false);
      setError("Error confirming payment: " + error.message);
    } else if (paymentIntent.status === "succeeded") {
      setLoading(false);
      onSuccess();
    } else {
      setLoading(false);
      setError("Payment failed or was canceled: " + paymentIntent.status);
    }
  };

  return (
    <>
      <div className="px-4 py-4">
        <PaymentElement onChange={handleCardChange} />
        <button
          onClick={handleSubmit}
          className={`${
            !isCardValid || loading ? "bg-black/20" : "bg-black"
          } h-10 w-48 mt-6 text-white rounded-lg flex items-center justify-center`}
          type="submit"
          disabled={!stripe || loading}
        >
          {loading ? (
            <ArrowPathIcon className="h-6 w-6 animate-spin" />
          ) : (
            `Pay $${amount}`
          )}
        </button>
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </>
  );
};

export default SinglePaymentForm;
