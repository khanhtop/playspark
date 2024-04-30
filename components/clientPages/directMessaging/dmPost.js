import { createChatName, sortUsers } from "@/helpers/chat";
import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function DMPost({ chatId, chatter }) {
  const context = useAppContext();
  const [text, setText] = useState("");

  const onPost = async () => {
    if (text.length > 0) {
      const sortedParticipants = sortUsers(context?.loggedIn?.uid, chatter.id);
      await setDoc(
        doc(firestore, "chats", chatId),
        {
          updatedAt: Date.now(),
          chatterA:
            sortedParticipants[0] === chatter.id
              ? {
                  name: chatter.companyName,
                  avatar: chatter.profilePhoto,
                  id: chatter.id,
                }
              : {
                  name: context?.profile?.companyName,
                  avatar: context?.profile?.profilePhoto,
                  id: context?.loggedIn?.uid,
                },
          chatterB:
            sortedParticipants[1] === chatter.id
              ? {
                  name: chatter.companyName,
                  avatar: chatter.profilePhoto,
                  id: chatter.id,
                }
              : {
                  name: context?.profile?.companyName,
                  avatar: context?.profile?.profilePhoto,
                  id: context?.loggedIn?.uid,
                },
        },
        { merge: true }
      );
      addDoc(collection(firestore, "chats", chatId, "messages"), {
        timestamp: Date.now(),
        content: text,
        senderId: context.loggedIn?.uid,
      });
    }
  };

  return (
    <div className=" px-2 py-2">
      <div className="bg-white border-cyan-500 border-2 h-12 rounded-full overflow-hidden flex">
        <input
          onChange={(e) => setText(e.target.value)}
          className="flex-1 text-black/80 px-4 outline-none text-sm"
          placeholder="Enter Message..."
        />
        <div className="flex py-1 px-2">
          <button
            onClick={() => {
              onPost(text);
            }}
            className="bg-cyan-500 rounded-full px-4"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
