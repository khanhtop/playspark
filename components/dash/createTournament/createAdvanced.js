import { Card, RangeSlider } from "flowbite-react";
import { BrandingComponent } from "../unlocksWithTier";
import Toggle from "react-toggle";
import { useMemo } from "react";

export default function CreateAdvanced({ tournament, setTournament }) {
  const difficulty = useMemo(() => {
    return (tournament.winProbability * 100).toFixed(0) + "/100";
  }, [tournament.winProbability]);

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex-1 w-full">
        <h3 className="text-black/50">Game Difficulty {difficulty}</h3>
        <div className="w-full">
          <RangeSlider
            min={0}
            max={1}
            step={0.01}
            value={tournament.winProbability}
            className="w-full"
            onChange={(e) =>
              setTournament({ ...tournament, winProbability: e.target.value })
            }
          />
        </div>
      </Card>
      <Card>
        <h3 className="text-black/50">Game Tweaks</h3>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-black/70">Hide Back Navigation</p>
            <Toggle
              checked={tournament?.hideBack}
              onChange={() =>
                setTournament({
                  ...tournament,
                  hideBack: tournament?.hideBack ? false : true,
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-black/70">Disable Revive Function</p>
            <Toggle
              checked={tournament?.disableRevive}
              onChange={() =>
                setTournament({
                  ...tournament,
                  disableRevive: tournament?.disableRevive ? false : true,
                })
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
