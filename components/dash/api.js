import { useState } from "react";
import Button from "../forms/button";
import Input from "../forms/input";
import { useAppContext } from "@/helpers/store";
import Toggle from "react-toggle";
import { updateDocument } from "@/helpers/firebaseApi";

export default function API() {
  const context = useAppContext();
  const [loading, setLoading] = useState();
  const [xpWebhook, setXpWebhook] = useState(context?.profile?.xpWebhook);

  const handleUpdateKey = async () => {
    setLoading(true);
    const response = await fetch("/api/internal/generateApiKey", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    await updateDocument("users", context.loggedIn?.uid, {
      apiKey: json.message,
    });
    // await updateDoc(doc(firestore, "users", context.loggedIn?.uid), {
    //   apiKey: json.message,
    // });
    setLoading(false);
  };

  const updateWebhook = async () => {
    if (!xpWebhook) return;
    await updateDocument("users", context.loggedIn?.uid, {
      xpWebhook: xpWebhook,
    });
    // await updateDoc(doc(firestore, "users", context.loggedIn?.uid), {
    //   xpWebhook: xpWebhook,
    // });
  };

  const testWebhook = async () => {
    if (!context.profile.xpWebhook) return;
    fetch(context.profile.xpWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "3b2ae20d-9b36-40b6-88b8-25ce021c4b96",
        kudosAmount: 0,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        alert("Success");
      })
      .catch((error) => alert("Error"));
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
        <p className="text-white">Sportzfan Kudos Webhook</p>
        <Toggle
          checked={xpWebhook}
          onChange={() => setXpWebhook(xpWebhook ? null : "https://")}
        />
      </div>

      <Input
        className={`w-full h-10 ${xpWebhook ? "opacity-100" : "opacity-10"}`}
        label="Kudos Webhook"
        labelColor="text-white/70"
        placeholder="Click Generate To Generate an API Key"
        value={xpWebhook}
        readonly={!xpWebhook}
        onChange={(a) => setXpWebhook(a.target.value)}
      />
      <div className="flex-1 flex gap-4">
        <Button
          className="flex-1"
          disabled={!xpWebhook}
          onClick={() => updateWebhook()}
        >
          Update Webhook
        </Button>
        {context?.profile?.xpWebhook && (
          <Button
            className="w-36"
            disabled={!xpWebhook}
            onClick={() => testWebhook()}
          >
            Test
          </Button>
        )}
      </div>
    </>
  );
}
