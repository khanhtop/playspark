import ClientPageWrapper from "../clientPageWrapper";

export default function ClientCoins({ user, screen, setScreen }) {
  return (
    <ClientPageWrapper
      user={user}
      withBackNav="Earning Coins"
      onBackNav={() => setScreen("home")}
    ></ClientPageWrapper>
  );
}
