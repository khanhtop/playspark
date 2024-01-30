import { useAppContext } from "@/helpers/store";
import AccountInfo from "../accountInfo";
import ClientPageWrapper from "../clientPageWrapper";
import Hero from "../hero";
import Achievements from "../achievements";

export default function ClientProfile({ user, setScreen }) {
  const context = useAppContext();
  return (
    <ClientPageWrapper
      user={user}
      withBackNav="Return Home"
      onBackNav={() => setScreen("home")}
    >
      <AccountInfo
        vertical
        data={user}
        context={context}
        totalXp={context?.profile?.totalXp || 0}
        totalCoins={context?.profile?.totalScore || 0}
      />
      <Hero
        data={user}
        context={context}
        totalXp={context?.profile?.totalXp || 0}
      />
      <div className="shadow shadow-lg mx-5 my-4 border-[1px] border-[#DDD]/50 rounded-xl">
        <h3 className="font-octo text-3xl ml-4 mt-4">My Achievements</h3>
        <Achievements
          data={{
            xp: user.totalXp,
          }}
        />
      </div>
      <div className="mt-8">
        <ProfileButton
          heading="Invite Friends And Win"
          text="Refer friends and get coins when they sign up PLUS when they play a game."
          bgColor={user.accentColor}
          textColor={user.primaryColor}
        />
        <ProfileButton
          heading="My Items"
          text="View your earned or redeemed items."
          bgColor={user.accentColor}
          textColor={user.primaryColor}
        />
        <ProfileButton
          heading="My Games"
          text="View your active games."
          bgColor={user.accentColor}
          textColor={user.primaryColor}
        />
      </div>
    </ClientPageWrapper>
  );
}

function ProfileButton({ bgColor, textColor, heading, text }) {
  return (
    <div
      className="cursor-pointer mx-5 rounded-2xl px-4 py-4 font-roboto mb-4 max-w-[500px]"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div></div>
      <div>
        <h1 className="uppercase font-extrabold text-xl">{heading}</h1>
        <p className="font-light">{text}</p>
      </div>
    </div>
  );
}
