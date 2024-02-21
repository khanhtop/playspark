import { useAppContext } from "@/helpers/store";
import ClientGameCard from "./gameCard";
import PrizesCard from "./prizesCard";

export default function HorizontalGamesScroll({
  data,
  user,
  label,
  first,
  playGame,
  showPrizes,
}) {
  const context = useAppContext();
  if (data.length > 0) {
    return (
      <div
        className={`${first ? "pt-6" : "pt-0"} font-octo text-2xl`}
        style={{ backgroundColor: user.primaryColor, color: user.textColor }}
      >
        <h1 className="px-5 mb-2 tracking-wider">{label}</h1>
        <div className="overflow-x-scroll no-scrollbar">
          <div className="flex items-center gap-8 pt-0 pb-6 px-5">
            {showPrizes && context?.prizes?.length > 0 && (
              <PrizesCard data={user} inSlider />
            )}
            {data?.map((item, key) => (
              <ClientGameCard
                inSlider
                data={user}
                item={item}
                key={item.tournamentId}
                playGame={playGame}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
