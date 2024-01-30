import ClientPageWrapper from "../clientPageWrapper";

export default function ClientAchievements({ user, screen, setScreen }) {
  return (
    <ClientPageWrapper
      withBackNav="Achievements"
      onBackNav={() => setScreen("home")}
      user={user}
    ></ClientPageWrapper>
  );
}
