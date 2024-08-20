import GameButton from "@/components/uiv2/gameButton";
import { useAppContext } from "@/helpers/store";

export default function WelcomeModal({ data, playAudio }) {
  const context = useAppContext();

  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4 h-full overflow-y-scroll">
      <div className="flex items-center flex-col">
        {data.brandLogo && <img src={data.brandLogo} className="max-h-20" />}
        <div className="max-w-[300px] text-center mt-4">
          <p className="primary-font text-xl">Welcome to {data.name}!</p>
          <p className="primary-font mt-1">
            {data.instructions || "Click Continue to get started!"}
          </p>
          <div className="mt-4">
            <GameButton
              className="w-full"
              onClick={() => {
                if (context.settings.bgm) {
                  data.playAudio();
                }
                data.onClose();
              }}
              bgColor={data.primaryColor}
              textColor={data.textColor}
              theme={data?.theme}
            >
              Continue
            </GameButton>
          </div>
        </div>
      </div>
    </div>
  );
}
