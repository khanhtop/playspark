import { useAppContext } from "@/helpers/store";
import AccountInfo from "../accountInfo";
import Areas from "../areas";
import ClientPageWrapper from "../clientPageWrapper";
import Hero from "../hero";
import HorizontalGamesScroll from "../horizontalGamesScroll";

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

  console.log(context?.loggedIn);

  return (
    <ClientPageWrapper user={user}>
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
      <HorizontalGamesScroll
        prizes={prizes}
        showPrizes
        first
        data={tournamentsByPlayCount}
        user={user}
        label="Trending Now"
        playGame={(id) => {
          setActiveGame(id);
          setScreen("game");
        }}
        changeScreen={(screen) => {
          setScreen(screen);
        }}
      />
      <Areas
        aggregateLeaderboard={leaderboard}
        totalXp={context?.profile?.totalXp || 0}
        totalCoins={context?.profile?.totalScore || 0}
        user={user}
        tournaments={tournaments}
        playGame={(id) => {
          setActiveGame(id);
          setScreen("game");
        }}
        viewAchievements={() => setScreen("achievements")}
      />
    </ClientPageWrapper>
  );
}
