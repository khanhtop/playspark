import { setDocument } from "@/helpers/firebaseApi";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";

export default function StripeSuccess({
  currentCredits,
  stripePayload,
  onClose,
}) {
  const context = useAppContext();
  const [updated, setUpdated] = useState(false);

  const updateCredits = async () => {
    await setDocument("users", context?.loggedIn?.uid, {
      creditBalance: currentCredits + stripePayload.amount,
    });
    // await setDoc(
    //   doc(firestore, "users", context?.loggedIn?.uid),
    //   {
    //     creditBalance: currentCredits + stripePayload.amount,
    //   },
    //   { merge: true }
    // );
    setUpdated(currentCredits + stripePayload.amount);
    return;
  };

  useMemo(() => {
    if (!stripePayload || updated) return;
    updateCredits();
  }, [stripePayload]);

  if (!updated) {
    return (
      <div className="min-w-[400px] flex justify-center py-4">
        <ArrowPathIcon className="h-12 w-12 text-black/50 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-w-[400px]">
      <p className="text-sm text-black/60">Current Balance: {currentCredits}</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-8 py-2 rounded-xl"
        >
          Return To PlaySpark
        </button>
      </div>
    </div>
  );
}
