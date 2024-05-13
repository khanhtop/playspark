import { createChatName, sortUsers } from "@/helpers/chat";
import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function DMPost({ chatId, chatter }) {
  const context = useAppContext();
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  const onPost = async () => {
    if (text.length > 0) {
      setPosting(true);
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
      await addDoc(collection(firestore, "chats", chatId, "messages"), {
        timestamp: Date.now(),
        content: text,
        senderId: context.loggedIn?.uid,
      });
      setPosting(false);
      setText("");
    }
  };

  return (
    <div className=" px-2 py-2">
      <div className="bg-white border-cyan-500 border-2 h-12 rounded-full overflow-hidden flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 text-black/80 px-4 outline-none text-sm"
          placeholder="Enter Message..."
        />
        <div className="flex py-1 px-2">
          <button
            disabled={posting}
            onClick={() => {
              onPost(text);
            }}
            className={`${
              posting ? "bg-black/20" : "bg-cyan-500"
            } rounded-full w-24`}
          >
            {posting ? (
              <ArrowPathIcon className="h-5 w-full animate-spin" />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
