import { useAppContext } from "@/helpers/store";

export default function BattleSlider() {
  const context = useAppContext();
  if (
    !context?.loggedIn?.uid ||
    !context?.battles ||
    context?.battles?.length === 0
  )
    return <div />;

  return (
    <div className="mt-8 overflow-x-scroll whitespace-nowrap px-6 no-scrollbar">
      {context?.battles?.map((item, key) => (
        <BattleCard battle={item} key={key} myUid={context?.loggedIn?.uid} />
      ))}
    </div>
  );
}

function BattleCard({ battle, myUid }) {
  console.log(battle);
  const hasStarted = battle?.challengerResult;
  const isComplete = battle?.challengeeResult;
  const challengerWon =
    parseInt(battle?.challengerResult?.score) >
    parseInt(battle?.challengeeResult?.score);
  const challengeeWon =
    parseInt(battle?.challengeeResult?.score) >
    parseInt(battle?.challengerResult?.score);
  return (
    <div className="inline-block h-48 mr-8 w-72 relative rounded-3xl overflow-hidden">
      <img src="/battle/vsbg.jpg" className="h-full w-full object-cover" />
      <div className="absolute top-0 left-0 bg-black/40 h-full w-full px-4 py-4 flex flex-col">
        <div className="flex gap-2 items-start">
          <img
            src={battle?.game?.backgroundImage}
            className="h-8 w-8 rounded-full object-cover"
          />
          <p className="font-octo mt-[4px]">Battle | {battle.game.name}</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Battler
            data={battle?.challenger}
            isComplete={isComplete}
            myUid={myUid}
            won={challengerWon}
          />
          <p className="font-octo text-3xl">
            {!isComplete ? "VS" : challengerWon ? "Defeated" : "Lost to"}
          </p>
          <Battler
            data={battle?.challengee}
            isComplete={isComplete}
            myUid={myUid}
            won={challengeeWon}
          />
        </div>
        <div className="flex gap-2 items-start">
          <BattleStatus battle={battle} myUid={myUid} />
        </div>
      </div>
    </div>
  );
}

function Battler({ data, myUid, won, isComplete }) {
  return (
    <div className="flex flex-col items-center flex-1 relative">
      <div className="h-12 w-12 rounded-full overflow-hidden">
        <img
          src={data?.profilePhoto}
          className="h-full w-full object-cover scale-110"
        />
      </div>
      <p className="font-octo text-sm">
        {data?.id === myUid ? "You" : data?.companyName}
      </p>
      {isComplete && (
        <div className="absolute h-8 w-8 -top-4 right-2 border-white border-2 rounded-full overflow-hidden">
          <img
            className="h-full w-full"
            src={won ? "/battle/trophy.png" : "/battle/sad.png"}
          />
        </div>
      )}
    </div>
  );
}

function BattleStatus({ battle, myUid }) {
  if (
    !battle.challengerResult &&
    !battle?.challengeeResult &&
    battle.challenger?.id === myUid
  ) {
    return (
      <div className="flex w-full justify-between gap-2 font-octo">
        <div className="flex items-center gap-2 font-octo">
          <div className="h-8 w-8 bg-purple-500 rounded-full"></div>
          <div>Play First</div>
        </div>
        <button className="bg-purple-500 px-4 rounded-xl">Play</button>
      </div>
    );
  }
  if (
    battle.challengerResult &&
    !battle?.challengeeResult &&
    battle.challenger?.id === myUid
  ) {
    return (
      <div className="flex w-full justify-between gap-2 font-octo">
        <div className="flex items-center gap-2 font-octo">
          <div className="h-8 w-8 bg-green-500 rounded-full"></div>
          <div>Played - Waiting For Challenger</div>
        </div>
      </div>
    );
  }
  if (
    battle.challengerResult &&
    !battle?.challengeeResult &&
    battle.challengee?.id === myUid
  ) {
    return (
      <div className="flex w-full justify-between gap-2 font-octo">
        <div className="flex items-center gap-2 font-octo">
          <div className="h-8 w-8 bg-purple-500 rounded-full"></div>
          <div>Invited - Play Now</div>
        </div>
        <button className="bg-purple-500 px-4 rounded-xl">Play</button>
      </div>
    );
  }
  return (
    <div className="flex w-full justify-between gap-2 font-octo">
      <div className="flex items-center gap-2 font-octo">
        <div className="h-8 w-8 bg-red-500 rounded-full"></div>
        <div>Complete</div>
      </div>
      <button className="bg-red-500 px-4 rounded-xl">View Results</button>
    </div>
  );
}
