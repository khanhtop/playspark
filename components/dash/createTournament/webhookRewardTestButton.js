// import Button from "@/components/forms/button";
import { useAppContext } from "@/helpers/store";
import { fireHook } from "@/helpers/webhooks";
import { Button } from "flowbite-react";
import { useState } from "react";

export default function WebhookRewardsTestButton({ rewards }) {
  const context = useAppContext();
  const [firing, setFiring] = useState(false);
  const handleClick = async () => {
    if (
      typeof rewards.outputValue !== "string" ||
      !rewards?.outputValue?.length ||
      rewards?.outputValue?.length < 5 ||
      !rewards?.outputValue?.startsWith("https://")
    ) {
      alert(
        "Please ensure you use a correctly formated URL that begins with https://"
      );
    } else {
      setFiring(true);
      await fireHook(rewards.outputValue, {
        hookType: "REWARD CLAIMED",
        rewardName: rewards.name,
        rewardInput: rewards.input,
        rewardValue: rewards.inputValue,
        rewardId: rewards.id,
        userName: context?.profile?.companyName || null,
        userEmail: context?.profile?.email || null,
      });
      alert("Webhook Fired");
      setFiring(false);
    }
  };

  if (rewards.outputAction !== "webhook") return <div />;

  return (
    <Button
      isProcessing={firing}
      onClick={handleClick}
      className="min-w-12 mt-[23px] rounded-lg bg-green-500 enabled:hover:bg-green-600"
    >
      Test
    </Button>
  );
}
