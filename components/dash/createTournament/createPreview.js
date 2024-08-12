import UIButton from "@/components/ui/button";
import Text from "@/components/ui/text";
import GameButton from "@/components/uiv2/gameButton";
import useGoogleFont from "@/helpers/useGoogleFont";

export default function CreatePreview({ tournament }) {
  useGoogleFont(tournament.font || "Play", "custom-font");
  useGoogleFont(tournament.bodyFont || "Roboto", "primary-font");
  return (
    <div className="relative top-0 right-0 w-[212px] h-[400px] mr-4">
      <div
        style={{ backgroundColor: tournament.primaryColor }}
        className={`fixed mt-4 w-[212px] h-[400px] rounded-lg overflow-hidden  flex flex-col items-center justify-end`}
      >
        <img
          src={tournament.backgroundImage}
          className="object-cover absolute h-full w-full"
        />
        <div className="text-white z-20 flex flex-col items-center mb-12">
          {/* <Text {...tournament}>{tournament.name}</Text> */}
          {/* <UIButton {...tournament} className="mt-2 custom-font" text="Start" /> */}
          <div
            style={{ backgroundColor: tournament.primaryColor }}
            className="p-2 rounded-xl mb-2"
          >
            <p style={{ color: tournament.textColor }} className="custom-font">
              {tournament.name}
            </p>
          </div>
          <div className="p-2 rounded-xl mb-2 bg-white/30 backdrop-blur border-[1px] -mt-7 -z-10 pt-8 pb-5 px-4 h-60">
            <p textColor={tournament.textColor} className="primary-font">
              Game Instructions...
            </p>
          </div>

          <GameButton
            style={{ width: 140, height: 50 }}
            bgColor={tournament.accentColor || "#000"}
            textColor={tournament.textColor}
            theme={tournament.theme}
          >
            Start
          </GameButton>
        </div>
      </div>
    </div>
  );
}
