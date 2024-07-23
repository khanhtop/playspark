import { useAppContext } from "@/helpers/store";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  GiftIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { switchTier } from "@/helpers/api";
import Avatar from "./avatar";

export default function Sidebar({ selectedPane, setSelectedPane }) {
  const context = useAppContext();
  console.log(context.profile);
  return (
    <div className="w-[300px] h-full rounded-r-2xl bg-[#FFF] flex flex-col items-center px-8 pb-8 text-[#364153] shadow-xl">
      <img src="/ui/logo.png" className="mt-3 -ml-7" />

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
        selected
          ? "text-[#364153]"
          : "text-[#364153]/50 hover:text-[#364153]/80"
      } flex h-8 mb-3 justify-between cursor-pointer transition  items-center w-full`}
    >
      {icon}
      <h5 className="flex-1 ml-2">{text}</h5>
    </div>
  );
}
