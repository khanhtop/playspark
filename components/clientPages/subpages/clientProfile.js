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
    </ClientPageWrapper>
  );
}
