import { getRank, xpAsPercentage } from "@/helpers/xp";
import { useEffect } from "react";

export default function Hero({ data, context }) {
  if (context.loggedIn?.uid) {
    const percentage = xpAsPercentage(
      data.xp,
      getRank(data.xp).xpToNextTier + data.xp
    );
    return (
      <div
        style={{ backgroundColor: data?.primaryColor, color: data.textColor }}
        className="h-[180px] opacity-90 flex items-center px-4 gap-8"
      >
        <div className="flex flex-col gap-2">
          <div
            style={{ borderColor: data.accentColor }}
            className="h-[80px] border-4 aspect-square bg-[#777] flex items-center justify-center rounded-full"
          >
            <p className="text-[60px] font-octo">
              {data?.companyName?.substring(0, 1)}
            </p>
          </div>
          <p className="font-octo text-2xl text-center">{data.companyName}</p>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="font-octo text-4xl">
            Current Rank: {getRank(data.xp).currentTier}
          </div>
          <div
            style={{ borderColor: data.accentColor }}
            className="h-6 w-full border-2 relative bg-black rounded-full overflow-hidden"
          >
            <div
              style={{
                backgroundColor: data.accentColor,
                opacity: 0.5,
                width: `${percentage}%`,
              }}
              className="h-full"
            ></div>
            <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
              <p className="font-bold font-octo mt-[1px]">
                {data.xp} / {getRank(data.xp).xpToNextTier + data.xp}
              </p>
            </div>
          </div>
          <div className="font-octo text-xl">
            Next Rank: {getRank(data.xp).nextTier}
          </div>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}
