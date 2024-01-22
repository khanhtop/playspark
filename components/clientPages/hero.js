import { getRank, xpAsPercentage } from "@/helpers/xp";
import { useEffect, useState } from "react";

export default function Hero({ data, context, totalXp }) {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    if (!totalXp) return;
    setPercentage(
      xpAsPercentage(
        totalXp || 0,
        getRank(totalXp || 0).xpToNextTier + (totalXp || 0)
      )
    );
  }, [totalXp]);

  if (context.loggedIn?.uid) {
    return (
      <div
        style={{ color: data.textColor }}
        className="h-[180px] opacity-90 flex items-center px-4 gap-8 mx-4 shadow-lg shadow-black/50 rounded-lg"
      >
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="font-octo text-2xl md:text-4xl">
              {getRank(context?.profile?.totalXp || 0).currentTier}
            </div>
            <div className="flex pr-1 items-center font-octo md:text-2xl gap-2 h-full">
              <img src="/clientPages/xp.png" className="h-12" />
              <p>
                {totalXp} / {getRank(totalXp).xpToNextTier + totalXp}
              </p>
            </div>
          </div>

          <div
            style={{ borderColor: data.accentColor }}
            className="h-6 w-full border-2 relative bg-black rounded-full overflow-hidden"
          >
            <div
              style={{
                backgroundColor: data.accentColor,
                opacity: 1,
                width: `${percentage}%`,
              }}
              className="h-full"
            ></div>
          </div>
          <div className="font-octo text-xl">
            Next Rank: {getRank(totalXp).nextTier}
          </div>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}
