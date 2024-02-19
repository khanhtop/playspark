import { useState } from "react";
import Button from "../forms/button";
import Input from "../forms/input";
import { useAppContext } from "@/helpers/store";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import Toggle from "react-toggle";

export default function API() {
  const context = useAppContext();
  const [loading, setLoading] = useState();
  const [scoreWebhook, setScoreWebhook] = useState(
    context?.profile?.scoreWebhook
  );

  const handleUpdateKey = async () => {
    setLoading(true);
    const response = await fetch("/api/internal/generateApiKey", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    await updateDoc(doc(firestore, "users", context.loggedIn?.uid), {
      apiKey: json.message,
    });
    setLoading(false);
  };

  const updateWebhook = async () => {
    if (!scoreWebhook) return;
    await updateDoc(doc(firestore, "users", context.loggedIn?.uid), {
      scoreWebhook: scoreWebhook,
    });
  };

  return (
    <>
      <Input
        className="w-full h-10"
        label="API Key"
        labelColor="text-white/70"
        placeholder="Click Generate To Generate an API Key"
        value={context?.profile?.apiKey}
        readonly={true}
      />
      <Button disabled={context?.profile?.apiKey} onClick={handleUpdateKey}>
        Generate Key
      </Button>
      <div className="flex gap-2 mt-4">
        <p className="text-white">Score Webhook</p>
        <Toggle
          checked={scoreWebhook}
          onChange={() => setScoreWebhook(scoreWebhook ? null : "https://")}
        />
      </div>

      <Input
        className={`w-full h-10 ${scoreWebhook ? "opacity-100" : "opacity-10"}`}
        label="API Key"
        labelColor="text-white/70"
        placeholder="Click Generate To Generate an API Key"
        value={scoreWebhook}
        readonly={!scoreWebhook}
        onChange={(a) => setScoreWebhook(a.target.value)}
      />
      <Button disabled={!scoreWebhook} onClick={updateWebhook}>
        Update Webhook
      </Button>
    </>
  );
}
