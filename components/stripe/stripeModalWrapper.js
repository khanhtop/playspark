import { useAppContext } from "@/helpers/store";
import { getStripeCustomer } from "@/helpers/stripe";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import StripeSelectCredits from "./stripeSelectCredits";

export default function StripeModalWrapper({ children }) {
  const context = useAppContext();

  if (!context.showStripe) return <div />;
  const [phase, setPhase] = useState(0);
  const [customerId, setCustomerId] = useState(null);
  const [stripePayload, setStripePayload] = useState(null);

  useEffect(() => {
    if (!customerId && context.profile?.email) {
      getStripeCustomer(context.profile.email).then((cId) => {
        console.log(cId);
        setCustomerId(cId);
      });
    }
  }, [customerId]);

  const flow = [
    {
      title: "Add Credits",
      component: (
        <StripeSelectCredits
          onSelect={(payload) => {
            setStripePayload(payload);
            setPhase(1);
          }}
        />
      ),
    },
    {
      title: "Confirm Selection",
      component: <div className="min-w-[400px]">{stripePayload?.amount}</div>,
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
