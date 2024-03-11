import { useAppContext } from "@/helpers/store";
import ClientPageWrapper from "../clientPageWrapper";
import { useRouter } from "next/router";
import { BellAlertIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { formatTimeDifference } from "@/helpers/datetime";

export default function ClientNotifications({ user, setScreen }) {
  const context = useAppContext();
  const router = useRouter();

  return (
    <ClientPageWrapper
      user={user}
      withBackNav="Notifications"
      onBackNav={() => setScreen("home")}
    >
      <div className="flex flex-col gap-4 px-4">
        {context.notifications?.map((item, key) => (
          <NotificationItem
            item={item}
            key={key}
            onClick={() => router.push(item.link)}
          />
        ))}
      </div>
    </ClientPageWrapper>
  );
}

function NotificationItem({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-full bg-white/5 px-4 py-2 flex rounded-xl gap-4 group cursor-pointer hover:bg-white/10"
    >
      <BellAlertIcon className="h-6 w-6 text-white/50 pt-1" />
      <div className="flex-1">
        <p className="font-extrabold">{item.text}</p>
        <p className="text-white/50">{formatTimeDifference(item.timestamp)}</p>
      </div>
      <ChevronRightIcon
        className={`h-12 w-12 text-white/0 group-hover:text-white/100`}
      />
    </div>
  );
}
