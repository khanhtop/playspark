import TapHold from "@/components/ui/tapHold";
import Text from "@/components/ui/text";
import GameButton from "@/components/uiv2/gameButton";
import { playClickSound } from "@/helpers/audio";
import { firestore } from "@/helpers/firebase";
import { getLeaderboard } from "@/helpers/leaderboard";
import { claimReward } from "@/helpers/rewards";
import { useAppContext } from "@/helpers/store";
import {
  ArrowPathIcon,
  LinkIcon,
  LockClosedIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ModalRewards({ data }) {
  const context = useAppContext();
  const [modalState, setModalState] = useState(null);
  const [rewards, setRewards] = useState();
  const [loading, setLoading] = useState([]);
  const [maxScore, setMaxScore] = useState(null);
  const [tab, setTab] = useState("intragame");

  const expired = !data.isActive || (data.endDate && data.endDate < new Date());

  const redeemInFirebase = () => {
    const index = rewards.find((a) => a.id === modalState.id);
    index.isRedeemed = true;
    updateDoc(
      doc(
        firestore,
        "users",
        context.loggedIn.uid,
        "rewards",
        index.firebaseId
      ),
      index
    );
  };

  const tournamentScore =
    data?.leaderboard?.find((a) => a.uid === context?.loggedIn?.uid)?.score ||
    0;

  const tournamentRank = data?.leaderboard?.findIndex(
    (a) => a.uid === context?.loggedIn?.uid
  );

  const tournamentLevel =
    context?.profile?.tournamentSpecificData?.[data.tournamentId]?.level || 0;

  const xp = context.profile?.dataByTournament?.[data.tournamentId]?.xp || 0;

  const isUnlocked = (item) => {
    if (item.input === "score") {
      return maxScore >= item.inputValue;
    }
    if (item.input === "level") {
      return tournamentLevel >= item.inputValue;
    }
    if (item.input === "rank") {
      return expired && tournamentRank + 1 === item.inputValue;
    }
    if (item.input === "endxp") {
      return expired && xp >= item.inputValue;
    }
    return false;
  };

  const fetchRewards = async () => {
    if (!context?.loggedIn?.uid) return;
    getDocs(
      query(
        collection(firestore, "users", context?.loggedIn?.uid, "rewards"),
        where("tournamentId", "==", data.tournamentId)
      )
    ).then((snapshot) => {
      let rwd = [];
      for (let doc of snapshot.docs) {
        rwd.push({ ...doc.data(), firebaseId: doc.id });
      }
      setRewards(rwd);
    });
  };

  useEffect(() => {
    if (data && !rewards) {
      fetchRewards();
    }
    if (!maxScore) {
      getLeaderboard(data.tournamentId).then(async (lb) => {
        setMaxScore(
          lb.find((a) => a.uid === context?.loggedIn?.uid)?.score || 0
        );
      });
    }
  }, [data]);

  if (!modalState)
    return (
      <div className="pt-12 pb-4 px-4 flex flex-col gap-4 h-full overflow-y-scroll">
        <Tabs onChange={(a) => setTab(a)} tab={tab} data={data} />
        {!expired && tab === "postgame" && (
          <p className="text-center primary-font font-bold py-2 px-12">
            Come back after the game finishes to claim these rewards!
          </p>
        )}
        {data?.rewards
          ?.filter((a) => {
            if (tab === "intragame") {
              if (a.input !== "rank" && a.input !== "endxp") {
                return a;
              }
            } else {
              if (a.input === "rank" || a.input === "endxp") {
                return a;
              }
            }
          })
          ?.map((item, key) => (
            <RewardRow
              onFlipCard={(a) => setModalState(a)}
              isRedeemed={
                rewards && rewards?.find((a) => a.id === item.id)?.isRedeemed
              }
              item={item}
              key={key}
              primaryColor={data.primaryColor}
              textColor={data.textColor}
              unlocked={isUnlocked(item)}
              claimed={
                rewards && rewards?.findIndex((a) => a.id === item.id) !== -1
              }
              loading={loading.includes(item.id)}
              onClaim={(reward) => {
                setLoading([...loading, reward.id]);
                claimReward(reward, data, context).then(() => {
                  fetchRewards();
                  setTimeout(() => {
                    setLoading([...rewards.filter((a) => a !== reward.id)]);
                  }, 1000);
                });
              }}
            />
          ))}
      </div>
    );

  if (modalState)
    return (
      <div className="pt-12 pb-4 px-4 flex flex-col gap-2 items-center primary-font text-black">
        <p className="text-2xl uppercase font-bold text-center">
          {modalState.name}
        </p>
        <p className="text-lg font-light text-center">
          {modalState.description}
        </p>
        <img src={modalState.image} className="h-20 rounded-3xl" />
        {modalState.outputAction === "promocode" && (
          <div
            onClick={() => window.open(modalState.outputLocation, "__blank")}
            className="flex items-center gap-1 my-2 cursor-pointer"
          >
            <LinkIcon className="h-5" />
            <p className="text-lg text-center uppercase font-light">
              {modalState.outputLocation}
            </p>
          </div>
        )}
        {modalState.outputAction === "physical" && (
          <div className="flex items-center gap-1 my-2">
            <MapPinIcon className="h-5" />
            <p className="text-lg uppercase font-light text-center">
              {modalState.outputLocation}
            </p>
          </div>
        )}
        <div className="mb-2">
          <p className="text-lg uppercase font-light max-w-[400px] text-center">
            {modalState.outputInstructions}
          </p>
        </div>
        {modalState.outputAction === "promocode" ? (
          <div className="text-3xl text-center mb-4">
            <p>Your Promo Code</p>
            <p className="p-4 bg-white rounded-3xl mt-2">
              {modalState.outputValue}
            </p>
          </div>
        ) : modalState.outputAction === "physical" ? (
          <TapHold
            bgColor={data.primaryColor}
            textColor={data.textColor}
            onComplete={() => {
              redeemInFirebase();
            }}
          />
        ) : (
          <div />
        )}
        <GameButton
          className="w-[330px]"
          bgColor="red"
          textColor={data.textColor}
          onClick={() => {
            setModalState();
          }}
        >
          {modalState.outputAction === "promocode" ||
          modalState.outputAction === "webhook"
            ? "Close"
            : "Redeem Later"}
        </GameButton>
      </div>
    );

  return <div />;
}

function RewardRow({
  item,
  primaryColor,
  textColor,
  unlocked,
  onClaim,
  claimed,
  loading,
  onFlipCard,
  isRedeemed,
}) {
  const context = useAppContext();
  function isInteractableAfterClaim() {
    if (
      item.outputAction === "promocode" ||
      item.outputAction === "physical" ||
      item.outputAction === "webhook"
    )
      return true;
    return false;
  }

  function parseInput(input, operand, value) {
    if (input === "endxp") {
      if (operand === ">=") {
        return `End with more than ${value} XP`;
      } else {
        return `End with ${value} XP`;
      }
    }

    if (input === "score") {
      return `Score at least ${value} points`;
    }

    if (input === "xp") {
      return `Earn at least ${value} XP`;
    }

    if (input === "level") {
      return `Reach level ${value}`;
    }

    if (input === "rank") {
      if (operand === "==") {
        return `Rank ${value} on the leaderboard`;
      } else {
        return `Rank higher than ${value} on the leaderboard`;
      }
    }

    return `Earn at least ${value}`;
  }

  return (
    <div className="flex h-24 text-black/70 custom-font gap-2 text-sm flex-shrink-0">
      <div className="bg-white/100 border-4 border-black/10 backdrop-blur flex-1 flex items-center rounded-2xl overflow-hidden px-4">
        <div className="h-full flex items-center justify-center flex-shrink-0 mr-4">
          <img src={item.image} className="w-12 p-2" />
        </div>
        <div className="flex flex-col items-start">
          <div className="flex-1 flex items-center justify-center capitalize text-center text-black/70 ">
            <p className="custom-font">
              {parseInput(item.input, item.inputOperand, item.inputValue)}{" "}
            </p>
          </div>

          <div
            // style={{ color: primaryColor }}
            className="line-clamp-2 primary-font"
            // className="flex-1  flex items-center justify-center text-center"
          >
            {item.description}
          </div>
        </div>
      </div>
      {context?.loggedIn?.uid && (
        <div className="px-0">
          <button
            style={{
              backgroundColor: isRedeemed
                ? "rgb(239, 68, 68)"
                : unlocked
                ? primaryColor
                : "#EEE",
              color: unlocked ? textColor : "#AAA",
            }}
            disabled={typeof claimed === "undefined" || loading}
            className="h-full w-20 border-4 rounded-2xl"
            onClick={() => {
              if (isRedeemed) {
                null;
              } else if (unlocked && !claimed) {
                onClaim(item);
              } else if (claimed && isInteractableAfterClaim()) {
                playClickSound(context);
                onFlipCard(item);
              }
            }}
          >
            {typeof claimed === "undefined" || loading ? (
              <ArrowPathIcon className="h-6 w-full animate-spin" />
            ) : isRedeemed ? (
              "Redeemed"
            ) : claimed && !isInteractableAfterClaim() ? (
              "Claimed"
            ) : claimed && isInteractableAfterClaim() ? (
              "Redeem"
            ) : unlocked ? (
              "Claim"
            ) : (
              <LockClosedIcon className="h-6 w-full" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function Tabs({ data, tab, onChange }) {
  return (
    <div className="flex px-4 gap-4 rounded-full">
      <div
        onClick={() => onChange("intragame")}
        style={{
          opacity: tab === "intragame" ? 1 : 0.5,
          color: data.theme === "pixel" ? "black" : "white",
          borderBottomColor:
            tab === "intragame" ? data.primaryColor : "transparent",
        }}
        className={`custom-font flex-1 border-b-8 flex justify-center py-2 cursor-pointer`}
      >
        <p>Intragame</p>
      </div>
      <div
        onClick={() => onChange("postgame")}
        style={{
          opacity: tab === "postgame" ? 1 : 0.5,
          color: data.theme === "pixel" ? "black" : "white",
          borderBottomColor:
            tab === "postgame" ? data.primaryColor : "transparent",
        }}
        className={`custom-font flex-1 border-b-8 flex justify-center py-2 cursor-pointer`}
      >
        <p>Post Game</p>
      </div>
    </div>
  );
}
