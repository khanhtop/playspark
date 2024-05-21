import { useAppContext } from "@/helpers/store";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

export default function DMButton({ userData, setScreen }) {
  const context = useAppContext();
  return (
    <div
      onClick={() => {
        context.setLatestChat(userData.id);
        setScreen("chat");
      }}
      className="h-8 px-4 gap-2 py-1 flex items-center bg-emerald-500 rounded-full cursor-pointer hover:opacity/80 transition"
    >
      <EnvelopeIcon className="h-full" />
      <p>Message {userData?.companyName}</p>
    </div>
  );
}
