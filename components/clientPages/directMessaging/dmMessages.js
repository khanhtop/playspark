import { useAppContext } from "@/helpers/store";
import DMPost from "./dmPost";
import { createChatName } from "@/helpers/chat";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import { timeAgo } from "@/helpers/datetime";

export default function DMMessages({ chatter }) {
  const context = useAppContext();
  const chatRef = useRef(null);
  const [chats, setChats] = useState();

  useEffect(() => {
    if (chatter && !chatRef.current) {
      const q = query(
        collection(
          firestore,
          "chats",
          createChatName(context?.loggedIn?.uid, chatter.id),
          "messages"
        ),
        orderBy("timestamp", "desc"),
        limit(30)
      );
      chatRef.current = onSnapshot(q, (querySnapshot) => {
        const _chats = [];
        querySnapshot.forEach((doc) => {
          _chats.push({ ...doc.data(), id: doc.id });
        });
        setChats(_chats);
      });
    }
  }, [chatter]);

  useEffect(() => {
    return () => {
      chatRef?.current();
      chatRef.current = null;
      setChats();
    };
  }, []);

  return (
    <div className="flex-1 bg-white/5 rounded-xl flex flex-col">
      <div className="flex-1 px-4 py-4 flex flex-col-reverse gap-4">
        {chats?.map((item, key) => (
          <ChatBubble item={item} key={key} mine={true} />
        ))}
      </div>
      <DMPost
        chatId={createChatName(context?.loggedIn?.uid, chatter.id)}
        chatter={chatter}
      />
    </div>
  );
}

function ChatBubble({ item, mine }) {
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[50%] flex flex-col ${
          mine ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-lg px-4 py-1 ${
            mine ? "bg-green-500" : "bg-white/5"
          }`}
        >
          <p>{item.content}</p>
        </div>
        <p className="text-xs mt-1 text-white/50">{timeAgo(item.timestamp)}</p>
      </div>
    </div>
  );
}
