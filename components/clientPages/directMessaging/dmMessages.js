import { useAppContext } from "@/helpers/store";
import DMPost from "./dmPost";
import { createChatName } from "@/helpers/chat";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "@/helpers/firebase";

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

  console.log(chats);

  return (
    <div className="flex-1 bg-white/40 rounded-xl flex flex-col">
      <div className="flex-1">
        {chats?.map((item, key) => (
          <p>{item.content}</p>
        ))}
      </div>
      <DMPost
        chatId={createChatName(context?.loggedIn?.uid, chatter.id)}
        chatter={chatter}
      />
    </div>
  );
}
