import CreateImageSlider from "./createImageSlider";

export default function CreateConfiguration({ tournament, setTournament }) {
  return (
    <div className="flex flex-col">
      {tournament?.aspectRatios?.["backgroundSprite"] && (
        <CreateImageSlider
          aspectRatio={tournament?.aspectRatios?.["backgroundSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Background Sprite (Aspect ${tournament?.aspectRatios?.["backgroundSprite"]})`}
          selected={tournament.backgroundSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, backgroundSprite: a });
          }}
        />
      )}
      {tournament?.aspectRatios?.["playerSprite"] && (
        <CreateImageSlider
          aspectRatio={tournament?.aspectRatios?.["playerSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Player Sprite (Aspect ${tournament?.aspectRatios?.["playerSprite"]})`}
          selected={tournament.playerSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, playerSprite: a });
          }}
        />
      )}
      {tournament?.aspectRatios?.["enemySprite"] && (
        <CreateImageSlider
          aspectRatio={tournament?.aspectRatios?.["enemySprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Enemy Sprite (Aspect ${tournament?.aspectRatios?.["enemySprite"]})`}
          selected={tournament.enemySprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, enemySprite: a });
          }}
        />
      )}
      {tournament?.aspectRatios?.["objectSprite"] && (
        <CreateImageSlider
          aspectRatio={tournament?.aspectRatios?.["objectSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Object Sprite (Aspect ${tournament?.aspectRatios?.["objectSprite"]})`}
          selected={tournament.objectSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, objectSprite: a });
          }}
        />
      )}
      {tournament?.aspectRatios?.["powerUpSprite"] && (
        <CreateImageSlider
          aspectRatio={tournament?.aspectRatios?.["powerUpSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Power Up Sprite (Aspect ${tournament?.aspectRatios?.["powerUpSprite"]})`}
          selected={tournament.powerUpSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, powerUpSprite: a });
          }}
        />
      )}
    </div>
  );
}
