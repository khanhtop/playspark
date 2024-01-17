import { logout } from "@/helpers/firebase";
import {
  BellAlertIcon,
  BellIcon,
  CurrencyDollarIcon,
  PlayIcon,
  PlusCircleIcon,
  PowerIcon,
  TrophyIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function TopNav({
  data,
  context,
  totalScore,
  totalXp,
  showLogin,
  setScreen,
}) {
  return (
    <div
      style={{ backgroundColor: data.primaryColor, color: data.textColor }}
      className={`h-20 w-full flex py-4 px-6`}
    >
      <img src={data?.sponsorLogo} className="h-full" />
      <div className="h-full flex-1 flex">
        {context?.loggedIn?.uid ? (
          <div className="h-full flex-1 justify-end flex items-center gap-4">
            <Pill
              value={totalXp}
              image="/clientPages/xp.png"
              Icon={XMarkIcon}
              data={data}
              onClick={() => setScreen("xp")}
            />
            <Pill
              value={totalScore}
              image="/clientPages/coins.png"
              Icon={CurrencyDollarIcon}
              data={data}
              onClick={() => setScreen("coins")}
            />
            <BellIcon
              onClick={() => setScreen("notifications")}
              className="h-full pb-1 text-yellow-400"
            />
            <Avatar
              onClick={() => setScreen("profile")}
              name={data?.companyName}
              data={data}
            />
          </div>
        ) : (
          <div
            onClick={showLogin}
            className="flex-1 flex items-center justify-end font-octo text-2xl"
          >
            <p className="cursor-pointer hover:opacity-80">Sign In</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Avatar({ name, data, onClick }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      onClick={onClick}
      style={{ borderColor: data.accentColor, color: data.textColor }}
      className="z-10 relative border-2 h-10 cursor-pointer hover:opacity-80 transition aspect-square bg-[#666] rounded-full flex items-center justify-center"
    >
      <p className="font-octo text-2xl">{name?.substring(0, 1)}</p>
      {showMenu && (
        <div
          style={{ borderColor: data.accentColor, color: data.textColor }}
          className="rounded-xl z-10 w-60 absolute top-12 right-0 bg-black border-2"
        >
          <MenuItem text="Logout" />
        </div>
      )}
    </div>
  );
}

function MenuItem({ text }) {
  return (
    <div
      onClick={() => logout(window.location.pathname)}
      className="cursor-pointer h-12 font-octo text-2xl flex items-center justify-center"
    >
      <p>{text}</p>
    </div>
  );
}

function Pill({ value, Icon, image, data, onClick }) {
  return (
    <div
      style={{ borderColor: data.accentColor }}
      className="relative border-2 rounded-full gap-2 h-10 py-1 flex items-center px-4"
    >
      {image ? (
        <img src={image} className="h-full" />
      ) : (
        <Icon style={{ color: data.accentColor }} className="h-full" />
      )}
      <p className="font-octo text-2xl">{value}</p>
      <PlusCircleIcon
        onClick={onClick}
        style={{ color: data.textColor }}
        className="absolute rounded-full -top-2 -right-2 h-6 w-6"
      />
    </div>
  );
}
