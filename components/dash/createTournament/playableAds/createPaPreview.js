import GameButton from "@/components/uiv2/gameButton";
import useGoogleFont from "@/helpers/useGoogleFont";

export default function CreatePaPreview({ tournament }) {
  useGoogleFont(tournament.font || "Play", "custom-font");
  useGoogleFont(tournament.bodyFont || "Roboto", "primary-font");
  return (
    <div
      style={{
        backgroundColor: tournament.primaryColor,
      }}
      className="relative top-0 right-0 w-[300px] h-[520px] mr-4 flex flex-col"
    >
      <div
        className="h-[25%] bg-cover rounded-b-2xl"
        style={{ backgroundImage: `url('${tournament.headerImage}')` }}
      />
      <div className="flex-1 px-4 py-4 flex flex-col items-center">
        <p
          style={{ color: tournament.textColor, fontSize: 20 }}
          className="custom-font"
        >
          {tournament.name}
        </p>
        {tournament?.rewards?.length > 0 ? (
          <div className="flex-1 flex flex-col w-full py-4 space-y-3">
            {tournament?.rewards?.map((item, key) => (
              <RewardRender key={key} reward={item} />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex w-full py-4">
            <div className="flex-1 border-2 border-black/50 border-dashed w-full flex items-center justify-center rounded-lg">
              <p>Rewards</p>
            </div>
          </div>
        )}
        <GameButton
          style={{ width: 140, height: 50 }}
          bgColor={tournament.accentColor || "#000"}
          textColor={tournament.textColor}
          theme={tournament.theme}
        >
          Start
        </GameButton>
      </div>
      <div
        className="h-[12%] bg-cover rounded-t-2xl"
        style={{ backgroundImage: `url('${tournament.footerImage}')` }}
      />
      {/* <div
        style={{ backgroundColor: tournament.primaryColor }}
        className={`fixed mt-0 w-[300px] h-[520px] rounded-lg overflow-hidden  flex flex-col items-center justify-end`}
      >
        <img
          src={tournament.backgroundImage}
          className="object-cover absolute h-full w-full"
        />
        <div className="text-white z-20 flex flex-col items-center mb-12">
          <div
            style={{ backgroundColor: tournament.primaryColor }}
            className="p-2 rounded-xl mb-2"
          >
            <p style={{ color: tournament.textColor }} className="custom-font">
              {tournament.name}
            </p>
          </div>
          <div className="p-2 rounded-xl mb-2 bg-white/30 backdrop-blur border-[1px] -mt-7 -z-10 pt-8 pb-5 px-4 h-80 w-[260px]">
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
      </div> */}
    </div>
  );
}

function RewardRender({ reward }) {
  return (
    <div className="flex w-full gap-4">
      <div className="h-12">
        <img
          src={reward.image}
          className="h-full rounded-full border-2 border-black w-12 bg-black"
        />
      </div>
      <div className="flex-1 flex flex-col -space-y-1">
        <p className="text-lg font-bold">{reward.name}</p>
        <p>Score {reward.inputValue}</p>
      </div>
    </div>
  );
}
