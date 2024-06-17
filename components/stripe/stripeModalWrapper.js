import { useAppContext } from "@/helpers/store";
import { getStripeCustomer } from "@/helpers/stripe";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import StripeSelectCredits from "./stripeSelectCredits";
import StripeConfirmCredits from "./stripeConfirmCredits";
import StripeCheckout from "./stripeCheckout";
import StripeSuccess from "./stripeSuccess";

export default function StripeModalWrapper({ children }) {
  const context = useAppContext();

  if (!context.showStripe) return <div />;
  const [phase, setPhase] = useState(0);
  const [stripePayload, setStripePayload] = useState(null);

  const currentCredits = context?.profile?.creditBalance || 0;

  const flow = [
    {
      title: "Add Credits",
      component: (
        <StripeSelectCredits
          currentCredits={currentCredits}
          onSelect={(payload) => {
            setStripePayload(payload);
            setPhase(1);
          }}
        />
      ),
    },
    {
      title: "Confirm Selection",
      component: (
        <StripeConfirmCredits
          currentCredits={currentCredits}
          stripePayload={stripePayload}
          onConfirm={() => setPhase(2)}
        />
      ),
    },
    {
      title: "Checkout",
      component: (
        <StripeCheckout
          currentCredits={currentCredits}
          stripePayload={stripePayload}
          onSuccess={() => {
            setPhase(3);
          }}
        />
      ),
    },
    {
      title: "Success!",
      component: (
        <StripeSuccess
          currentCredits={currentCredits}
          stripePayload={stripePayload}
          onClose={() => context.setShowStripe(false)}
        />
      ),
    },
  ];

  return (
    <div className="absolute flex items-center justify-center top-0 left-0 h-screen w-screen bg-black/20 backdrop-blur-sm">
      <div className="bg-white px-8 py-8 rounded-3xl min-w-[300px]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{flow[phase].title}</h1>
          <XCircleIcon
            onClick={() => context.setShowStripe(false)}
            className="h-12 w-12 text-blue-200 hover:text-blue-300 transition cursor-pointer"
          />
        </div>

        {flow[phase].component}
      </div>
    </div>
  );
}
