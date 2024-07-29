import UIButton from "@/components/ui/button";
import Text from "@/components/ui/text";
import GameButton from "@/components/uiv2/gameButton";
import useGoogleFont from "@/helpers/useGoogleFont";

export default function CreatePreview({ tournament }) {
  useGoogleFont(tournament.font || "Play");
  return (
    <div
      style={{ backgroundColor: tournament.primaryColor }}
      className={`mt-4 w-[212px] h-[400px] rounded-lg overflow-hidden relative flex flex-col items-center justify-end`}
    >
      <img
        src={tournament.backgroundImage}
        className="object-cover absolute h-full w-full"
      />
      <div className="text-white z-20 flex flex-col items-center mb-12">
        {/* <Text {...tournament}>{tournament.name}</Text> */}
        {/* <UIButton {...tournament} className="mt-2 custom-font" text="Start" /> */}
        <GameButton
          style={{ width: 140, height: 50 }}
          bgColor={tournament.primaryColor}
          textColor={tournament.textColor}
          theme={tournament.theme}
        >
          Start
        </GameButton>
      </div>
    </div>
  );
}
