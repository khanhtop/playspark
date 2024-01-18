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
}) {
  const context = useAppContext();
  return (
    <ClientPageWrapper user={user}>
      <AccountInfo
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
      <HorizontalGamesScroll
        first
        data={tournamentsByPlayCount}
        user={user}
        label="Trending Now"
      />
      <HorizontalGamesScroll
        data={tournamentsByDate}
        user={user}
        label="Latest"
      />
      <Areas
        aggregateLeaderboard={leaderboard}
        user={user}
        tournaments={tournaments}
      />
    </ClientPageWrapper>
  );
}
