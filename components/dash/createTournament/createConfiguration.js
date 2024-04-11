import CreateImageSlider from "./createImageSlider";
import GenWordArray from "./genWordArray";

export default function CreateConfiguration({
  tournament,
  setTournament,
  isAdmin,
}) {
  return (
    <div className="flex flex-col">
      {tournament?.tags?.["backgroundSprite"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="backgroundSprite"
          aspectRatio={tournament?.tags?.["backgroundSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Background Sprite`}
          selected={tournament.backgroundSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, backgroundSprite: a });
          }}
        />
      )}
      {tournament?.tags?.["playerSprite"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="playerSprite"
          aspectRatio={tournament?.tags?.["playerSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Player Sprite`}
          selected={tournament.playerSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, playerSprite: a });
          }}
        />
      )}
      {tournament?.tags?.["enemySprite"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="enemySprite"
          aspectRatio={tournament?.tags?.["enemySprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Enemy Sprite`}
          selected={tournament.enemySprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, enemySprite: a });
          }}
        />
      )}
      {tournament?.tags?.["objectSprite"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="objectSprite"
          aspectRatio={tournament?.tags?.["objectSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Object Sprite`}
          selected={tournament.objectSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, objectSprite: a });
          }}
        />
      )}
      {tournament?.tags?.["powerUpSprite"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="powerUpSprite"
          aspectRatio={tournament?.tags?.["powerUpSprite"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Power Up Sprite`}
          selected={tournament.powerUpSprite}
          updateSprite={(a) => {
            setTournament({ ...tournament, powerUpSprite: a });
          }}
        />
      )}
      {tournament?.tags?.["additionalSpriteOne"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="additionalSpriteOne"
          aspectRatio={tournament?.tags?.["additionalSpriteOne"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Additional Sprite 1`}
          selected={tournament.additionalSpriteOne}
          updateSprite={(a) => {
            setTournament({ ...tournament, additionalSpriteOne: a });
          }}
        />
      )}
      {tournament?.tags?.["additionalSpriteTwo"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="additionalSpriteTwo"
          aspectRatio={tournament?.tags?.["additionalSpriteTwo"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Additional Sprite 2`}
          selected={tournament.additionalSpriteTwo}
          updateSprite={(a) => {
            setTournament({ ...tournament, additionalSpriteTwo: a });
          }}
        />
      )}
      {tournament?.tags?.["additionalSpriteThree"] && (
        <CreateImageSlider
          isAdmin={isAdmin}
          dimension="additionalSpriteThree"
          aspectRatio={tournament?.tags?.["additionalSpriteThree"]}
          gameTag={tournament?.cloudinaryGameTag}
          title={`Additional Sprite 3`}
          selected={tournament.additionalSpriteThree}
          updateSprite={(a) => {
            setTournament({ ...tournament, additionalSpriteThree: a });
          }}
        />
      )}
      {tournament?.words && (
        <GenWordArray
          tournament={tournament}
          maxLength={5}
          validationFn={(a) => {
            null;
          }}
          isAdmin={isAdmin}
          title={`Words`}
          setWords={(a) => {
            setTournament({ ...tournament, words: a });
          }}
          setTheme={(a) => {
            setTournament({ ...tournament, wordleTheme: a });
          }}
        />
      )}
    </div>
  );
}
