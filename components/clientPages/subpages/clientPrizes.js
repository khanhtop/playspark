import ClientPageWrapper from "../clientPageWrapper";

export default function ClientPrizes({ user, screen, setScreen }) {
  return (
    <ClientPageWrapper
      withBackNav="Prizes"
      onBackNav={() => setScreen("home")}
      user={user}
    >
      <div className="px-8 py-4 text-xl">
        <p>To Do: Add Prizes</p>
      </div>
    </ClientPageWrapper>
  );
}
