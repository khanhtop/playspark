import ClientPageWrapper from "../clientPageWrapper";

export default function ClientEmbeddedGame({ user, setScreen, activeGame }) {
  return (
    <ClientPageWrapper
      user={user}
      withBackNav="Quit The Game"
      onBackNav={() => setScreen("home")}
    >
      <div className="bg-black h-full flex items-center justify-center">
        <iframe
          src={`https://playspark.co/ad/${activeGame}`}
          className="h-full"
        />
      </div>
    </ClientPageWrapper>
  );
}
