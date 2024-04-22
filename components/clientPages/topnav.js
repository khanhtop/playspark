import { logout } from "@/helpers/firebase";
import { groupPrizes } from "@/helpers/rewards";
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
import { useState, useEffect } from "react";

export default function TopNav({
  data,
  context,
  totalScore,
  totalXp,
  showLogin,
  setScreen,
  prizes,
}) {
  const [shouldBounce, setShouldBounce] = useState(false);

  return (
    <div
      style={{ backgroundColor: data.primaryColor, color: data.textColor }}
      className={`border-b-[1px] h-20 w-full flex py-4 px-6`}
    >
      <img src={data?.brandLogo} className="h-full py-0 md:py-0" />
      <div className="h-full flex-1 flex py-2 md:py-1">
        {context?.loggedIn?.uid ? (
          <div className="h-full flex-1 justify-end flex items-center gap-2 md:gap-4">
            {prizes?.length > 0 && (
              <Pill
                value={groupPrizes(prizes).length}
                colorA={data.accentColor}
                colorB={data.accentColor}
                image="/clientPages/prizes.png"
                Icon={XMarkIcon}
                data={data}
                onClick={() => setScreen("prizes")}
              />
            )}
            <Pill
              value={totalXp}
              colorA={data.textColor}
              colorB={data.accentColor}
              image="/clientPages/xp.png"
              Icon={XMarkIcon}
              data={data}
              onClick={() => setScreen("xp")}
            />
            <Pill
              value={totalScore}
              colorA={data.accentColor}
              colorB={data.accentColor}
              image="/clientPages/coins.png"
              Icon={CurrencyDollarIcon}
              data={data}
              onClick={() => setScreen("coins")}
            />
            <div className="h-full relative">
              <BellIcon
                onClick={() => {
                  setScreen("notifications");
                  context.setHasNewNotification(false);
                }}
                className={`h-full pb-0 opacity-20 ${
                  context.hasNewNotification && "animate-bounce"
                }`}
              />
              <div className="absolute bg-black/80 -top-2 -right-1 h-6 w-6 text-xs flex items-center justify-center border-2 border-white rounded-full">
                {context?.notifications?.filter((a) => !a.read)?.length}
              </div>
            </div>

            <Avatar
              context={context}
              onClick={() => setScreen("profile")}
              name={context?.profile?.companyName || "?"}
              data={data}
            />
          </div>
        ) : (
          <div
            onClick={showLogin}
            className="flex-1 flex items-center justify-end font-octo text-2xl"
          >
            <p className="cursor-pointer hover:opacity-80">Sign In/Up</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Avatar({ name, context, data, onClick }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      onClick={onClick}
      style={{
        borderColor: data.accentColor,
        color: data.textColor,
        backgroundColor: data.primaryColor,
      }}
      className="z-10 overflow-hidden relative border-2 h-full cursor-pointer hover:opacity-80 transition aspect-square rounded-full flex items-center justify-center"
    >
      <img className="scale-110" src={context?.profile?.profilePhoto} />
      {/* <p className="font-octo md:text-2xl">{name?.substring(0, 1)}</p> */}
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

function Pill({ value, Icon, image, data, onClick, colorA, colorB }) {
  return (
    <div
      style={{ borderColor: colorA }}
      className="relative border-2 rounded-full gap-1 md:gap-2 h-full py-2 flex items-center px-4 flex justify-center"
    >
      {image ? (
        <img src={image} className="h-full" />
      ) : (
        <Icon style={{ color: data.accentColor }} className="h-full" />
      )}
      <p className="font-octo md:text-2xl">{value}</p>
      <PlusCircleIcon
        onClick={onClick}
        style={{ color: colorA }}
        className="absolute rounded-full -top-3 -right-2 h-6 w-6"
      />
    </div>
  );
}
