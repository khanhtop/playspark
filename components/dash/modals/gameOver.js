import GameButton from "@/components/uiv2/gameButton";
import { useAppContext } from "@/helpers/store";

export default function ModalGameOver({ data }) {
  const context = useAppContext();
  console.log(data);
  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-2 font-octo text-black text-2xl items-center">
      <div className="flex flex-col items-center mb-4">
        <h1 className="">Your Score</h1>
        <h1
          className="text-4xl font-titan"
          style={{
            color: data.data?.primaryColor,
          }}
        >
          {data.gameOverScore}
        </h1>
      </div>
      {!context?.loggedIn?.uid && (
        <div className="flex flex-col items-center gap-2 mb-4 max-w-[400px]">
          <p className="font-roboto text-lg text-center text-black/50">
            Signup or login to get your score on the leaderboard + access to
            prizes
          </p>
          <GameButton
            onClick={() => data.onAuth()}
            bgColor="red"
            textColor="white"
            theme={data?.theme}
          >
            Sign Up / Login
          </GameButton>
        </div>
      )}

      <GameButton
        disabled={data?.gameOverRevives === 0}
        bgColor="blue"
        textColor="white"
        theme={data?.theme}
        badge={data.gameOverRevives}
        onClick={() => data?.onRevive()}
      >
        Revive
      </GameButton>
    </div>
  );
}
