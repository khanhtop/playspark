import { useAppContext } from "@/helpers/store";
import ClientPageWrapper from "../clientPageWrapper";
import { useState, useEffect } from "react";
import DMMessages from "../directMessaging/dmMessages";
import { timeAgo } from "@/helpers/datetime";
import { getDocument } from "@/helpers/firebaseApi";

export default function ClientChat({ user, screen, setScreen }) {
  const context = useAppContext();
  const [phase, setPhase] = useState("list");
  const [selectedChatter, setSelectedChatter] = useState();

  useEffect(() => {
    if (context.latestChat) {
      getDocument("users", context.latestChat).then((document) => {
        setSelectedChatter({ ...document.data(), id: document.id });
        setPhase("dm");
      });
      // getDoc(doc(firestore, "users", context.latestChat)).then((document) => {
      //   setSelectedChatter({ ...document.data(), id: document.id });

      //   setPhase("dm");
      // });
    }
  }, [context.latestChat]);

  return (
    <ClientPageWrapper
      withBackNav={
        selectedChatter ? selectedChatter.companyName : "Direct Messages"
      }
      onBackNav={() => {
        if (selectedChatter) {
          context.setLatestChat();
          setSelectedChatter();
          setPhase("list");
        } else {
          setScreen("home");
        }
      }}
      user={user}
    >
      <div className="text-xl px-6 h-full">
        {phase === "dm" ? (
          <div className="flex flex-col h-full pb-4 gap-2">
            <DMMessages chatter={selectedChatter} />
          </div>
        ) : (
          <div className="py-4 flex flex-col gap-2">
            {context.chats?.map((item, key) => (
              <ChatLink
                item={item}
                onClick={(a) => context.setLatestChat(a)}
                key={key}
                theyAre={
                  item.chatterA?.id === context.loggedIn?.uid
                    ? item.chatterB
                    : item.chatterA
                }
              />
            ))}
          </div>
        )}
      </div>
    </ClientPageWrapper>
  );
}

function ChatLink({ item, theyAre, onClick }) {
  return (
    <div
      onClick={() => onClick(theyAre.id)}
      className="bg-white/10 px-2 py-1 rounded-xl flex text-xs gap-2 cursor-pointer hover:bg-white/20 transition"
    >
      <div className="h-12 w-12 rounded-full overflow-hidden">
        <img src={theyAre.avatar} className="h-full w-full scale-110" />
      </div>
      <div>
        <p className="text-lg font-octo">{theyAre.name}</p>
        <p className="text-white/70">{timeAgo(item.updatedAt)}</p>
      </div>
    </div>
  );
}
