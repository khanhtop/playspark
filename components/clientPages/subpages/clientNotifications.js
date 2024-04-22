import { useAppContext } from "@/helpers/store";
import ClientPageWrapper from "../clientPageWrapper";
import { useRouter } from "next/router";
import {
  BellAlertIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { formatTimeDifference } from "@/helpers/datetime";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";

export default function ClientNotifications({ user, setScreen }) {
  const context = useAppContext();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  return (
    <ClientPageWrapper
      user={user}
      withBackNav="Notifications"
      onBackNav={() => setScreen("home")}
    >
      <div className="flex flex-col gap-4 px-4 pb-8 pt-4">
        {context.notifications?.map((item, key) => (
          <NotificationItem
            item={item}
            key={key}
            onClick={() => setShowMessage(item)}
          />
        ))}
      </div>
      <NotificationModal
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
    </ClientPageWrapper>
  );
}

function NotificationModal({ showMessage, setShowMessage }) {
  if (!showMessage) return <div />;

  useEffect(() => {
    updateDoc(doc(firestore, "notifications", showMessage.id), {
      read: true,
    });
  }, [showMessage]);

  return (
    <div className="fixed h-screen w-screen top-0 left-0 bg-black/50 backdrop-blur flex items-center justify-center">
      <div className="max-h-[90%] max-w-[90%] relative bg-white p-8 rounded-2xl text-black">
        <p className="font-extrabold text-xl">{showMessage.text}</p>
        <p className="text-black/50">
          {formatTimeDifference(showMessage.timestamp)}
        </p>
        {showMessage.link && (
          <button className="flex px-4 items-center bg-black hover:bg-black/80 transition text-white w-full py-2 rounded-full mt-4">
            <p className="flex-1 pl-4">Continue</p>
            <ChevronRightIcon className="h-5 w-5 text-white" />
          </button>
        )}

        <div
          onClick={() => setShowMessage(false)}
          className="absolute -top-4 -right-4 bg-black h-10 w-10 border-white border-2 rounded-full"
        >
          <XMarkIcon className="h-full w-full text-white p-1" />
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-full bg-black/5 px-4 py-2 flex rounded-xl gap-4 group cursor-pointer hover:bg-black/10"
    >
      <div
        className={`w-4 h-4 ${
          item.read ? "bg-green-500" : "bg-red-500"
        } rounded-full mt-1`}
      />
      {/* <BellAlertIcon className="h-6 w-6 text-white/50 pt-1" /> */}
      <div className="flex-1">
        <p className="font-extrabold">{item.text}</p>
        <p className="opacity-50">{formatTimeDifference(item.timestamp)}</p>
      </div>
      <ChevronRightIcon
        className={`h-12 w-12 text-white/0 group-hover:text-white/100`}
      />
    </div>
  );
}
