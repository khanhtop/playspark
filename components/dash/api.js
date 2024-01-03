import { useState } from "react";
import Button from "../forms/button";
import Input from "../forms/input";
import { useAppContext } from "@/helpers/store";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";

export default function API() {
  const context = useAppContext();
  const [loading, setLoading] = useState();

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
    </>
  );
}
