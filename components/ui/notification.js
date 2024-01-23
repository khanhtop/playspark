import { useEffect, useState } from "react";

export default function NotificationBar({ notification }) {
  if (!notification) return null;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (notification) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [notification]);
  return (
    <div
      style={{
        right: open ? 0 : "-50%",
        transition: "0.25s right",
      }}
      className="absolute top-12 bg-black z-30 w-1/2 py-2 px-4 rounded-tl-lg rounded-bl-lg border-t-[1px] border-l-[1px] border-b-[1px] border-cyan-500/30"
    >
      <h3>{notification.title}</h3>
      <p className="text-sm text-white/70">{notification.text}</p>
    </div>
  );
}
