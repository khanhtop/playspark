import { BrandingComponent } from "../unlocksWithTier";
import Toggle from "react-toggle";

export default function CreateAdvanced({ tournament, setTournament }) {
  return (
    <>
      <BrandingComponent>
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
      </BrandingComponent>
      <BrandingComponent>
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
      </BrandingComponent>
    </>
  );
}
