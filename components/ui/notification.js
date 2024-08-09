import { useAppContext } from "@/helpers/store";
import { useEffect, useState } from "react";

export default function NotificationBar({ notification, theme }) {
  const context = useAppContext();
  const [open, setOpen] = useState(false);

  const determineIcon = (title) => {
    const xpIconName = `/clientPages/xp.png`;
    const coinsIconsName = `/clientPages/coins.png`;
    if (title?.includes("xp")) return xpIconName;
    return coinsIconsName;
  };

  useEffect(() => {
    if (notification) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [notification]);

  if (!context.settings.notifications) {
    return <div />;
  }

  return (
    <div
      style={{
        left: open ? 0 : -300,
        transition: "0.25s left",
      }}
      className="animate-pulse text-white absolute bg-black/50 top-32 rounded-br-md rounded-tr-md backdrop-blur z-50 w-[200px] py-2 px-4"
    >
      <div className="h-[32px] flex gap-2 items-center">
        <img
          className="h-full mt-2"
          src={determineIcon(notification?.title?.toLowerCase())}
        />
        <h3 style={{ lineHeight: 1 }} className="font-octo font-bold text-lg">
          {notification?.title}
        </h3>
      </div>

      <p className="text-md text-white/70 font-octo mt-2">
        {notification?.text}
      </p>
    </div>
  );
}
