import { useAppContext } from "@/helpers/store";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Button from "../forms/button";
import { logout } from "@/helpers/firebase";

export default function Sidebar({ selectedPane, setSelectedPane }) {
  const context = useAppContext();
  return (
    <div className="w-[300px] h-full bg-black flex flex-col items-center px-8 pb-8 text-white">
      <img src="/branding/logo2.png" className="-mb-6" />
      <h3 className="text-sm mb-8">{context.profile?.companyName}</h3>
      <div className="flex-1 w-full overflow-y-scroll">
        <Row
          text="Marketplace"
          selected={selectedPane === 0}
          setSelectedPane={() => setSelectedPane(0)}
        />
          <Row
          text="My Games"
          selected={selectedPane === 1}
          setSelectedPane={() => setSelectedPane(1)}
        />
      </div>
      <Button onClick={() => logout()} className="w-full">
        Logout
      </Button>
    </div>
  );
}

function Row({ text, selected, setSelectedPane }) {
  return (
    <div
      onClick={setSelectedPane}
      className={`${
        selected ? "text-cyan-500" : "text-white hover:text-white/50"
      } flex h-8 mb-3 justify-between cursor-pointer transition  items-center w-full`}
    >
      <h5>{text}</h5>
      <ChevronRightIcon className="h-full" />
    </div>
  );
}
