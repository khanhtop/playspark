import { useAppContext } from "@/helpers/store";
import AccountInfo from "../accountInfo";
import Areas from "../areas";
import ClientPageWrapper from "../clientPageWrapper";
import Hero from "../hero";
import HorizontalGamesScroll from "../horizontalGamesScroll";
import BattleSlider from "../battleSlider";

export default function ClientHome({
  user,
  tournaments,
  tournamentsByDate,
  tournamentsByPlayCount,
  leaderboard,
  screen,
  setScreen,
  setActiveGame,
  prizes,
}) {
  const context = useAppContext();

  return (
    <ClientPageWrapper user={user}>
      <HorizontalGamesScroll
        prizes={prizes}
        withBorder
        showPrizes
        first
        data={tournamentsByPlayCount}
        user={user}
        label="Play Now"
        playGame={(id) => {
          setActiveGame(id);
          setScreen("game");
        }}
        changeScreen={(screen) => {
          setScreen(screen);
        }}
      />
      <AccountInfo
        data={user}
        context={context}
        totalXp={context?.profile?.dataByClient?.[user.id]?.xp || 0}
        totalCoins={context?.profile?.dataByClient?.[user.id]?.coins || 0}
      />
      <Hero
        data={user}
        context={context}
        totalXp={context?.profile?.dataByClient?.[user.id]?.xp || 0}
      />
      <div className="h-[1px] w-screen bg-black/10 mt-8" />
      <BattleSlider
        clientId={user.id}
        user={user}
        tournaments={tournaments}
        leaderboard={leaderboard}
      />

      <Areas
        aggregateLeaderboard={leaderboard}
        totalXp={context?.profile?.dataByClient?.[user.id]?.xp || 0}
        totalCoins={context?.profile?.dataByClient?.[user.id]?.coins || 0}
        user={user}
        tournaments={tournaments}
        playGame={(id) => {
          setActiveGame(id);
          setScreen("game");
        }}
        viewAchievements={() => setScreen("achievements")}
        setScreen={setScreen}
      />
    </ClientPageWrapper>
  );
}
