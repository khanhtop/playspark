import { useAppContext } from "@/helpers/store";
import ClientPageWrapper from "../clientPageWrapper";
import DMHeader from "../directMessaging/dmHeader";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import DMMessages from "../directMessaging/dmMessages";

export default function ClientChat({ user, screen, setScreen }) {
  const context = useAppContext();
  const [phase, setPhase] = useState("list");
  const [selectedChatter, setSelectedChatter] = useState();

  useEffect(() => {
    if (context.latestChat) {
      getDoc(doc(firestore, "users", context.latestChat)).then((doc) => {
        setSelectedChatter(doc.data());
        setPhase("dm");
      });
    }
  }, [context.latestChat]);

  return (
    <ClientPageWrapper
      withBackNav="Direct Messages"
      onBackNav={() => setScreen("home")}
      user={user}
    >
      <div className="text-xl px-6 h-full">
        {phase === "dm" ? (
          <div className="flex flex-col h-full pb-4 gap-2">
            <DMHeader
              onBack={() => setPhase("list")}
              chatter={selectedChatter}
            />
            <DMMessages chatter={selectedChatter} />
          </div>
        ) : (
          <div className="py-4">
            <p>No Messages Yet</p>
          </div>
        )}
      </div>
    </ClientPageWrapper>
  );
}
