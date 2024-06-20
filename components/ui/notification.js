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
        right: open ? 0 : "-50%",
        transition: "0.25s right",
      }}
      className="text-white absolute top-12 bg-black z-50 w-1/2 py-2 px-4 rounded-tl-lg rounded-bl-lg border-t-[1px] border-l-[1px] border-b-[1px] border-cyan-500/30"
    >
      <div className="h-8 flex gap-2 items-center">
        <img
          className="h-full"
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
