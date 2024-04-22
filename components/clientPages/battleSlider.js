import { createChallenge } from "@/helpers/api";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/solid";
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

  if (!context?.loggedIn?.uid || !context?.battles) return <div />;

  return (
    <>
      <h1
        style={{ color: user.textColor }}
        className="px-5 mt-8 font-octo text-2xl tracking-wider"
      >
        Battles
      </h1>
      <div className="flex pl-5 gap-4 pb-4">
        <Tab
          selected={stage === 0}
          text="Start New Battle"
          setSelected={() => setStage(0)}
          color={user.textColor}
        />
        {context?.battles
          ?.filter((a) => a.game.ownerId === clientId)
          ?.filter((a) => !a.challengeeResult)?.length > 0 && (
          <Tab
            selected={stage === 1}
            text="Ongoing"
            setSelected={() => setStage(1)}
            color={user.textColor}
          />
        )}

        {context?.battles
          ?.filter((a) => a.game.ownerId === clientId)
          ?.filter((a) => a.challengeeResult)?.length > 0 && (
          <Tab
            selected={stage === 2}
            text="Ended"
            setSelected={() => setStage(2)}
          />
        )}
      </div>
      <div className="overflow-x-scroll whitespace-nowrap px-6 no-scrollbar pb-4">
        {stage === 0 && (
          <RandomBattles tournaments={tournaments} leaderboard={leaderboard} />
        )}
        {stage === 1 &&
          context?.battles
            ?.filter((a) => a.game.ownerId === clientId)
            ?.filter((a) => !a.challengeeResult)
            .map((item, key) => (
              <div className="h-48 inline-block shadow-lg shadow-black/50 mr-8  rounded-3xl">
                <BattleCard
                  battle={item}
                  key={key}
                  myUid={context?.loggedIn?.uid}
                />
              </div>
            ))}
        {stage === 2 &&
          context?.battles
            ?.filter((a) => a.game.ownerId === clientId)
            ?.filter((a) => a.challengeeResult)
            .map((item, key) => (
              <div className="h-48 inline-block shadow-lg shadow-black/50 mr-8  rounded-3xl">
                <BattleCard
                  user={user}
                  battle={item}
                  key={key}
                  myUid={context?.loggedIn?.uid}
                />
              </div>
            ))}
        {/* {context?.battles
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
          ))} */}
      </div>
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
    </>
  );
}

function RandomBattles({ tournaments, leaderboard }) {
  const context = useAppContext();
  const filteredPlayers = leaderboard.filter(
    (a) => a.id !== context?.loggedIn?.uid
  );

  return (
    <div className="overflow-x-scroll whitespace-nowrap no-scrollbar pb-4">
      <div className="h-48 inline-block shadow-lg shadow-black/50 mr-8 text-white  rounded-3xl">
        <BattleInviteCard
          battle={{ game: {} }}
          tournament={
            tournaments[Math.floor(Math.random() * tournaments.length)]
          }
          me={context?.profile}
          you={
            filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)]
          }
        />
      </div>
      <div className="h-48 inline-block shadow-lg shadow-black/50 mr-8  rounded-3xl text-white">
        <BattleInviteCard
          battle={{ game: {} }}
          tournament={
            tournaments[Math.floor(Math.random() * tournaments.length)]
          }
          me={context?.profile}
          you={
            filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)]
          }
        />
      </div>
      <div className="h-48 inline-block shadow-lg shadow-black/50 mr-8 text-white rounded-3xl">
        <BattleInviteCard
          battle={{ game: {} }}
          tournament={
            tournaments[Math.floor(Math.random() * tournaments.length)]
          }
          me={context?.profile}
          you={
            filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)]
          }
        />
      </div>
    </div>
  );
}

function Tab({ text, selected, setSelected, color }) {
  return (
    <div
      onClick={setSelected}
      style={{ color: color }}
      className={`py-2 font-octo text-lg ${
        selected
          ? "border-b-cyan-500 border-b-2 opacity-100"
          : "opacity-50 cursor-pointer"
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

function BattleCard({ battle, myUid, user }) {
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
          <BattleStatus
            battle={battle}
            myUid={myUid}
            user={user}
            won={challengerWon ? "challenger" : "challengee"}
          />
        </div>
      </div>
    </div>
  );
}

function Battler({ data, myUid, won, isComplete, withScore }) {
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
      {typeof withScore !== "undefined" && (
        <p className={`text-2xl ${won ? "text-green-500" : "text-red-500"} `}>
          {withScore}
        </p>
      )}
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

function BattleStatus({ battle, myUid, user, won }) {
  const context = useAppContext();
  const router = useRouter();
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const iWon =
    (battle.challenger.id === myUid && won === "challenger") ||
    (battle.challengee.id === myUid && won === "challengee");

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
      <button
        onClick={() => setShowResultsModal(true)}
        className="bg-red-500 px-4 rounded-xl"
      >
        View Results
      </button>

      {showResultsModal && (
        <div className="fixed w-screen h-screen bg-black/10 backdrop-blur top-0 left-0 z-20 flex items-center justify-center">
          <div
            style={{
              backgroundColor: user.primaryColor,
              color: user.textColor,
            }}
            className=" border-2 border-white w-[90%] h-[90%] max-w-[400px] max-h-[600px] rounded-2xl flex flex-col items-center justify-center p-4 relative"
          >
            <div
              onClick={() => setShowResultsModal(false)}
              className="absolute h-12 w-12 bg-cyan-500 -top-6 -right-6 rounded-full p-2"
            >
              <XMarkIcon />
            </div>
            <h1 className="text-3xl">Battle Results</h1>
            <div className="flex mt-8">
              <div className="w-24">
                <Battler
                  data={battle?.challenger}
                  isComplete={true}
                  myUid={myUid}
                  won={won === "challenger"}
                  withScore={battle?.challengerResult.score}
                />
              </div>
              <img src="/battle/vs.png" className="h-12" />
              <div className="w-24">
                <Battler
                  data={battle?.challengee}
                  isComplete={true}
                  myUid={myUid}
                  won={won === "challengee"}
                  withScore={battle?.challengeeResult.score}
                />
              </div>
            </div>
            <p className="text-2xl mt-2">YOU {iWon ? "WON" : "LOST"}!</p>
            <p
              className={`text-4xl ${iWon ? "text-green-500" : "text-red-500"}`}
            >
              {iWon ? "+" : "-"} {battle.xpMovement.amount} XP
            </p>
            <button
              onClick={async () => {
                setLoading(true);
                const id = await createChallenge(
                  battle.game,
                  battle.challenger.id === myUid
                    ? battle.challenger
                    : battle.challengee,
                  {
                    ...context.profile,
                    id: context?.loggedIn.uid,
                  },
                  router.asPath
                );
                router.push("/battle/" + id);
                setLoading(false);
              }}
              disabled={loading}
              className="bg-green-500 h-12 w-36 rounded-xl text-3xl mt-6"
            >
              {loading ? (
                <ArrowPathIcon className="h-6 w-full animate-spin" />
              ) : (
                "Rematch"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
