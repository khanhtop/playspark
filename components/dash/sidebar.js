import { useAppContext } from "@/helpers/store";
import {
  ChartBarIcon,
  ChevronRightIcon,
  ScaleIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Button from "../forms/button";
import { logout } from "@/helpers/firebase";
import { switchTier } from "@/helpers/api";

export default function Sidebar({ selectedPane, setSelectedPane }) {
  const context = useAppContext();
  return (
    <div className="w-[300px] h-full bg-[#364153] flex flex-col items-center px-8 pb-8 text-white">
      <img src="/branding/logo2.png" className="-mb-6" />
      <h3 className="text-sm mb-8 font-roboto">
        {context.profile?.companyName}
      </h3>
      <div className="flex-1 w-full overflow-y-scroll">
        <Row
          text="Dashboard"
          selected={false}
          setSelectedPane={() => null}
          icon={<Squares2X2Icon className="h-5" />}
        />
        <Row
          text="Analytics"
          selected={false}
          setSelectedPane={() => null}
          icon={<ChartBarIcon className="h-5" />}
        />
        <Row
          text="Users"
          selected={false}
          setSelectedPane={() => null}
          icon={<UsersIcon className="h-5" />}
        />
        <Row
          text="Marketplace"
          selected={selectedPane === 0}
          setSelectedPane={() => setSelectedPane(0)}
          icon={<ShoppingCartIcon className="h-5" />}
        />
        <Row
          text="My Games"
          selected={selectedPane === 1}
          setSelectedPane={() => setSelectedPane(1)}
          icon={<TrophyIcon className="h-5" />}
        />
        <Row
          text="Usage"
          selected={selectedPane === 2}
          setSelectedPane={() => setSelectedPane(2)}
          icon={<ScaleIcon className="h-5" />}
        />
      </div>
      <div className="mb-4 flex flex-col items-center">
        <p>{context?.profile?.subscription?.name} Plan</p>
        <button
          className="text-xs bg-white/20 py-1 px-4 rounded-full mt-1"
          onClick={() =>
            switchTier(
              context?.loggedIn?.uid,
              context?.profile?.subscription?.tier < 4
                ? context?.profile?.subscription?.tier + 1
                : 0
            )
          }
        >
          CHANGE
        </button>
      </div>
      <Button onClick={() => logout()} className="w-full">
        Logout
      </Button>
    </div>
  );
}

function Row({ text, selected, setSelectedPane, icon }) {
  return (
    <div
      onClick={setSelectedPane}
      className={`${
        selected ? "text-cyan-500" : "text-white hover:text-white/50"
      } flex h-8 mb-3 justify-between cursor-pointer transition  items-center w-full`}
    >
      {icon}
      <h5 className="flex-1 ml-2">{text}</h5>
    </div>
  );
}
