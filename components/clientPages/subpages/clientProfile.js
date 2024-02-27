import { useAppContext } from "@/helpers/store";
import AccountInfo from "../accountInfo";
import ClientPageWrapper from "../clientPageWrapper";
import Hero from "../hero";
import Achievements from "../achievements";
import { firestore, logout } from "@/helpers/firebase";
import { useEffect, useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export default function ClientProfile({ user, setScreen }) {
  const context = useAppContext();

  // useEffect(() => {
  //   context.fetchAvatars();
  // }, []);

  // useEffect(() => {
  //   if (context?.avatars && context.profile && !context.profile.profilePhoto) {
  //     setDoc(
  //       doc(firestore, "users", context?.loggedIn?.uid),
  //       {
  //         profilePhoto:
  //           context?.avatars[
  //             Math.floor(Math.random() * context?.avatars.length)
  //           ],
  //       },
  //       { merge: true }
  //     );
  //   }
  // }, [context?.avatars, context.profile]);

  return (
    <ClientPageWrapper
      user={user}
      withBackNav="Return Home"
      onBackNav={() => setScreen("home")}
    >
      <AccountInfo
        vertical
        data={user}
        user={context.profile}
        context={context}
        totalXp={context?.profile?.dataByClient?.[user.id]?.xp || 0}
        totalCoins={context?.profile?.dataByClient?.[user.id]?.coins || 0}
        avatars={context?.avatars}
      />
      <Hero
        data={user}
        context={context}
        totalXp={context?.profile?.dataByClient?.[user.id]?.xp || 0}
      />
      <div className="shadow shadow-lg mx-5 my-4 border-[1px] border-[#DDD]/50 rounded-xl">
        <h3 className="font-octo text-3xl ml-4 mt-4">My Achievements</h3>
        <Achievements
          data={{
            xp: context?.profile?.dataByClient?.[user.id]?.xp || 0,
          }}
        />
      </div>
      <div className="mt-8">
        {/* <ProfileButton
          heading="Invite Friends And Win"
          text="Refer friends and get coins when they sign up PLUS when they play a game."
          bgColor={user.accentColor}
          textColor={user.primaryColor}
          img="/badges/wallet.png"
        />
        <ProfileButton
          heading="My Items"
          text="View your earned or redeemed items."
          bgColor={user.accentColor}
          textColor={user.primaryColor}
          img="/badges/items.png"
        />
        <ProfileButton
          heading="My Games"
          text="View your active games."
          bgColor={user.accentColor}
          textColor={user.primaryColor}
          img="/badges/pad.png"
        /> */}
        <ProfileButton
          heading="Sign Out"
          text="Sign out."
          bgColor={user.accentColor}
          textColor={user.primaryColor}
          onClick={() => logout()}
          img="/clientPages/signout.png"
        />
      </div>
    </ClientPageWrapper>
  );
}

function ProfileButton({ bgColor, textColor, heading, text, img, onClick }) {
  return (
    <div
      onClick={() => (onClick ? onClick() : null)}
      className="flex gap-4 cursor-pointer mx-5 rounded-2xl px-4 py-4 font-roboto mb-4 max-w-[500px]"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="h-8 w-8">
        <img src={img} />
      </div>
      <div>
        <h1 className="uppercase font-extrabold text-xl">{heading}</h1>
        <p className="font-light">{text}</p>
      </div>
    </div>
  );
}
