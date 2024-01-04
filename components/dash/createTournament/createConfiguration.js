import CreateImageSlider from "./createImageSlider";

export default function CreateConfiguration({ tournament, setTournament }) {
  return (
    <div className="flex flex-col">
      {tournament?.aspectRatios?.["playerSprite"] && (
        <CreateImageSlider
          aspectRatio={tournament?.aspectRatios?.["playerSprite"]}
          title="Player Sprite"
          selected={tournament.playerSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, playerSprite: a });
          }}
        />
      )}
      {tournament?.aspectRatios?.["objectSprite"] && (
        <CreateImageSlider
          aspectRatio={tournament?.aspectRatios?.["objectSprite"]}
          title="Object Sprite"
          selected={tournament.objectSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, objectSprite: a });
          }}
        />
      )}
      {tournament?.aspectRatios?.["backgroundSprite"] && (
        <CreateImageSlider
          aspectRatio={tournament?.aspectRatios?.["backgroundSprite"]}
          title="Background Sprite"
          selected={tournament.backgroundSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, backgroundSprite: a });
          }}
        />
      )}
    </div>
  );
}
