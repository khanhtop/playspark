import ClientPageWrapper from "../clientPageWrapper";

export default function ClientXP({ user, screen, setScreen }) {
  return (
    <ClientPageWrapper
      withBackNav="Earning XP"
      onBackNav={() => setScreen("home")}
      user={user}
    >
      <div className="px-8 py-4 text-xl">
        <p>
          Earning XP is simple and a lot of fun! Every time you play a new game
          you can earn XP. Earn XP for:
        </p>
        <ul className="list-decimal px-7 py-4 font-bold">
          <li>Playing a game for the first time</li>
          <li>Scoring points in a game</li>
          <li>
            Engaging with sponsored activities, such as surveys, videos and
            playable ads.
          </li>
        </ul>
        <p>
          As you build your XP, you will notice you will improve your position
          on the overall leaderboard, and you will increase your level.
        </p>
      </div>
    </ClientPageWrapper>
  );
}
