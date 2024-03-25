import { useAppContext } from "@/helpers/store";

export default function BattleSlider() {
  const context = useAppContext();
  if (
    !context?.loggedIn?.uid ||
    !context?.battles ||
    context?.battles?.length === 0
  )
    return <div />;

  return <div />;

  return (
    <div className="h-36 mt-8 overflow-x-scroll whitespace-nowrap px-6">
      {context?.battles?.map((item, key) => (
        <BattleCard battle={item} key={key} />
      ))}
    </div>
  );
}

function BattleCard({ battle }) {
  return (
    <div className="inline-block h-36 bg-blue-500 mr-8 w-72">
      {battle.game.name}
    </div>
  );
}
