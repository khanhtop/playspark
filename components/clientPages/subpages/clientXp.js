import ClientPageWrapper from "../clientPageWrapper";

export default function ClientXP({ user, screen, setScreen }) {
  return (
    <ClientPageWrapper
      withBackNav="Earning XP"
      onBackNav={() => setScreen("home")}
      user={user}
    ></ClientPageWrapper>
  );
}
