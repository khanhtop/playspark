import Advert from "@/components/ad";
import ClientPageWrapper from "../clientPageWrapper";

export default function ClientEmbeddedGame({ user, setScreen, activeGame }) {
  return (
    <ClientPageWrapper
      user={user}
      withGame
      // withBackNav="Quit The Game"
      withPopoutBackNav
      onBackNav={() => setScreen("home")}
    >
      <div className="bg-black h-full flex items-center justify-center">
        <Advert
          data={activeGame}
          clientCredits={999}
          withPopoutBackNav={() => setScreen("home")}
        />
        {/* <iframe
          src={`https://playspark.co/ad/${activeGame}`}
          className="h-full"
        /> */}
      </div>
    </ClientPageWrapper>
  );
}
