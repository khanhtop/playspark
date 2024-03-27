import { createChallenge } from "@/helpers/api";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BattleSlider({
  clientId,
  user,
  leaderboard,
  tournaments,
}) {
  const context = useAppContext();
  const [stage, setStage] = useState(0);
  const filteredPlayers = leaderboard.filter(
    (a) => a.id !== context?.loggedIn?.uid
  );

  if (!context?.loggedIn?.uid || !context?.battles) return <div />;

  if (
    context?.battles?.filter((a) => a.game.ownerId === clientId)?.length === 0
  )
    return (
      <>
        <h1 className="px-5 mt-8 font-octo text-2xl tracking-wider text-white/90">
          Battles
        </h1>
        <div className="overflow-x-scroll whitespace-nowrap px-6 no-scrollbar pb-4">
          <div className="h-48 inline-block shadow-lg shadow-black/50 mr-8  rounded-3xl">
            <BattleInviteCard
              battle={{ game: {} }}
              tournament={
                tournaments[Math.floor(Math.random() * tournaments.length)]
              }
              me={context?.profile}
              you={
                filteredPlayers[
                  Math.floor(Math.random() * filteredPlayers.length)
                ]
              }
            />
          </div>
          <div className="h-48 inline-block shadow-lg shadow-black/50 mr-8  rounded-3xl">
            <BattleInviteCard
              battle={{ game: {} }}
              tournament={
                tournaments[Math.floor(Math.random() * tournaments.length)]
              }
              me={context?.profile}
              you={
                filteredPlayers[
                  Math.floor(Math.random() * filteredPlayers.length)
                ]
              }
            />
          </div>
          <div className="h-48 inline-block shadow-lg shadow-black/50 mr-8  rounded-3xl">
            <BattleInviteCard
              battle={{ game: {} }}
              tournament={
                tournaments[Math.floor(Math.random() * tournaments.length)]
              }
              me={context?.profile}
              you={
                filteredPlayers[
                  Math.floor(Math.random() * filteredPlayers.length)
                ]
              }
            />
          </div>
        </div>
      </>
    );

  return (
    <>
      <h1 className="px-5 mt-8 font-octo text-2xl tracking-wider text-white/90">
        Battles
      </h1>
      <div className="flex pl-5 gap-4 pb-4">
        <Tab
          selected={stage === 0}
          text="Ongoing"
          setSelected={() => setStage(0)}
        />
        <Tab
          selected={stage === 1}
          text="Ended"
          setSelected={() => setStage(1)}
        />
      </div>
      <div className="overflow-x-scroll whitespace-nowrap px-6 no-scrollbar pb-4">
        {/* <button
          onClick={() => {
            fetch("/api/email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: "hello@jlgn.io",
                template: 2,
                name: "THE WINNER",
                subject: `The battle with THE WINNER has ended!`,
                game: "SOME GAME",
                url: `https://playspark.co/battle/123`,
                customText: `YOU LOST THE BATTLE WITH THE WINNER`,
              }),
            });
          }}
        >
          Email
        </button> */}
        {context?.battles
          ?.filter((a) => a.game.ownerId === clientId)
          ?.filter((a) =>
            stage === 0 ? !a.challengeeResult : a.challengeeResult
          )
          .map((item, key) => (
            <div className="h-48 inline-block shadow-lg shadow-black/50 mr-8  rounded-3xl">
              <BattleCard
                battle={item}
                key={key}
                myUid={context?.loggedIn?.uid}
              />
            </div>
          ))}
      </div>
    </>
  );
}

function Tab({ text, selected, setSelected }) {
  return (
    <div
      onClick={setSelected}
      className={`py-2 font-octo text-lg ${
        selected
          ? "border-b-cyan-500 border-b-2 text-white"
          : "text-white/50 cursor-pointer"
      }`}
    >
      <p>{text}</p>
    </div>
  );
}

function BattleInviteCard({ tournament, me, you, battle, myUid }) {
  const [loading, setLoading] = useState(false);
  const context = useAppContext();
  const router = useRouter();
  return (
    <div className="inline-block h-48 w-72 relative rounded-3xl overflow-hidden">
      <img src="/battle/vsbg.jpg" className="h-full w-full object-cover" />
      <div className="absolute top-0 left-0 bg-black/70 h-full w-full px-4 py-4 flex flex-col">
        <div className="flex gap-2 items-start">
          <img
            src={tournament?.backgroundImage}
            className="h-8 w-8 rounded-full object-cover"
          />
          <p className="font-octo mt-[4px]">Battle | {tournament?.name}</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Battler data={me} isComplete={false} myUid={myUid} won={false} />
          <p className="font-octo text-3xl">VS</p>
          <Battler data={you} isComplete={false} myUid={myUid} won={false} />
        </div>
        <div className="flex gap-2 items-start">
          <div className="flex w-full justify-end gap-2 font-octo">
            <button
              onClick={async () => {
                setLoading(true);
                const id = await createChallenge(
                  tournament,
                  you,
                  {
                    ...context.profile,
                    id: context?.loggedIn.uid,
                  },
                  router.asPath
                );
                router.push("/battle/" + id);
                setLoading(false);
              }}
              className="bg-purple-500 px-4 h-6 rounded-xl"
            >
              {loading ? (
                <ArrowPathIcon className="h-4 w-4 animate-spin " />
              ) : (
                `Battle ${you?.companyName} at ${tournament?.name}`
              )}
            </button>
          </div>
        </div>
      </div>
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
    <div className="inline-block h-48 w-72 relative rounded-3xl overflow-hidden">
      <img src="/battle/vsbg.jpg" className="h-full w-full object-cover" />
      <div className="absolute top-0 left-0 bg-black/70 h-full w-full px-4 py-4 flex flex-col">
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
        <button
          onClick={() =>
            window.open(`https://playspark.co/battle/` + battle.id)
          }
          className="bg-purple-500 px-4 rounded-xl"
        >
          Play
        </button>
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
        <button
          onClick={() =>
            window.open(`https://playspark.co/battle/` + battle.id)
          }
          className="bg-purple-500 px-4 rounded-xl"
        >
          Play
        </button>
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
