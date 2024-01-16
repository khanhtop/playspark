import Areas from "../areas";
import ClientPageWrapper from "../clientPageWrapper";
import Hero from "../hero";
import HorizontalGamesScroll from "../horizontalGamesScroll";

export default function ClientHome({
  context,
  user,
  tournaments,
  tournamentsByDate,
  tournamentsByPlayCount,
  leaderboard,
  screen,
  setScreen,
}) {
  return (
    <ClientPageWrapper user={user}>
      <Hero
        data={user}
        context={context}
        totalXp={context?.profile?.totalXp || 0}
      />
      <HorizontalGamesScroll
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
