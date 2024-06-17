import { useAppContext } from "@/helpers/store";
import {
  ChartBarIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  GiftIcon,
  ScaleIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Button from "../forms/button";
import { logout } from "@/helpers/firebase";
import { switchTier } from "@/helpers/api";
import Avatar from "./avatar";

export default function Sidebar({ selectedPane, setSelectedPane }) {
  const context = useAppContext();
  return (
    <div className="w-[300px] h-full bg-[#364153] flex flex-col items-center px-8 pb-8 text-white">
      <img src="/branding/logo2.png" className="-mb-2" />

      <div className="flex-1 w-full overflow-y-scroll">
        <Row
          text="Dashboard"
          selected={selectedPane === 4}
          setSelectedPane={() => setSelectedPane(4)}
          icon={<Squares2X2Icon className="h-5" />}
        />
        <Row
          text="Analytics"
          selected={selectedPane === 5}
          setSelectedPane={() => setSelectedPane(5)}
          icon={<ChartBarIcon className="h-5" />}
        />
        <Row
          text="Audience & Data"
          selected={selectedPane === 6}
          setSelectedPane={() => setSelectedPane(6)}
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
          text="Rewards"
          selected={selectedPane === 8}
          setSelectedPane={() => setSelectedPane(8)}
          icon={<GiftIcon className="h-5" />}
        />
        <Row
          text="Account"
          selected={selectedPane === 7}
          setSelectedPane={() => setSelectedPane(7)}
          icon={<Cog6ToothIcon className="h-5" />}
        />
      </div>
      <div
        onClick={() => setSelectedPane(3)}
        className="flex items-center gap-4 "
      >
        <Avatar />
        <div>
          <h3 className="text-sm mb-0 font-roboto">
            {context.profile?.companyName}
          </h3>
          <p
            onClick={() =>
              switchTier(
                context?.loggedIn?.uid,
                context?.profile?.subscription?.tier < 4
                  ? context?.profile?.subscription?.tier + 1
                  : 0
              )
            }
            className="text-sm mb-0 font-roboto"
          >
            {context?.profile?.subscription?.name} Plan
          </p>
        </div>
      </div>
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
