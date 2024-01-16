import { logout } from "@/helpers/firebase";
import {
  CurrencyDollarIcon,
  PlayIcon,
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
}) {
  return (
    <div
      style={{ backgroundColor: data.primaryColor, color: data.textColor }}
      className={`h-20 w-full flex py-4 px-4`}
    >
      <img src={data?.brandLogo} className="h-full" />
      <div className="h-full flex-1 flex">
        {context?.loggedIn?.uid ? (
          <div className="h-full flex-1 justify-end flex items-center gap-4">
            <Pill value={totalXp} Icon={XMarkIcon} data={data} />
            <Pill value={totalScore} Icon={CurrencyDollarIcon} data={data} />
            <Avatar name={data?.companyName} data={data} />
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

function Avatar({ name, data }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      onClick={() => setShowMenu(!showMenu)}
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

function Pill({ value, Icon, data }) {
  return (
    <div
      style={{ borderColor: data.accentColor }}
      className="border-2 rounded-full gap-2 h-10 py-1 flex items-center px-4"
    >
      <Icon style={{ color: data.accentColor }} className="h-full" />
      <p className="font-octo text-2xl">{value}</p>
    </div>
  );
}
