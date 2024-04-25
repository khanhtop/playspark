import GameButton from "@/components/uiv2/gameButton";
import { firestore } from "@/helpers/firebase";
import { claimReward } from "@/helpers/rewards";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ModalRewards({ data }) {
  const context = useAppContext();
  const [rewards, setRewards] = useState();
  const [loading, setLoading] = useState([]);

  const tournamentScore =
    data?.leaderboard?.find((a) => a.uid === context?.loggedIn?.uid)?.score ||
    0;

  const isUnlocked = (item) => {
    if (item.input === "score") {
      return tournamentScore >= item.inputValue;
    }
    return false;
  };

  const fetchRewards = async () => {
    getDocs(
      query(
        collection(firestore, "users", context?.loggedIn?.uid, "rewards"),
        where("tournamentId", "==", data.tournamentId)
      )
    ).then((snapshot) => {
      let rwd = [];
      for (let doc of snapshot.docs) {
        rwd.push(doc.data());
      }
      setRewards(rwd);
    });
  };

  useEffect(() => {
    if (data && !rewards) {
      fetchRewards();
    }
  }, [data]);

  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4">
      {data?.rewards?.map((item, key) => (
        <RewardRow
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
}

function RewardRow({
  item,
  primaryColor,
  textColor,
  unlocked,
  onClaim,
  claimed,
  loading,
}) {
  function isInteractableAfterClaim() {
    if (item.outputAction === "promocode" || item.outputAction === "url")
      return true;
    return false;
  }
  return (
    <div className="flex h-24 text-black/70 font-octo gap-2 text-sm">
      <div className="bg-white/100 border-4 border-black/10 backdrop-blur flex-1 flex items-center rounded-2xl overflow-hidden px-4">
        <div className="flex-1 flex items-center justify-center capitalize text-center text-black/70 ">
          <p>
            {item.input} {item.inputOperand === "==" ? " " : "More Than "}
            {item.inputValue.toString()}
          </p>
        </div>
        <div>
          <img src={item.image} className="w-12 p-2" />
        </div>
        <div
          style={{ color: primaryColor }}
          className="flex-1  flex items-center justify-center text-center"
        >
          {item.description}
        </div>
      </div>
      <div className="px-0 py-2">
        <button
          style={{
            backgroundColor: unlocked ? primaryColor : "#EEE",
            color: unlocked ? textColor : "#AAA",
          }}
          disabled={typeof claimed === "undefined" || loading}
          className="h-full w-20 border-4 rounded-2xl"
          onClick={() => {
            if (unlocked && !claimed) {
              onClaim(item);
            } else if (claimed && isInteractableAfterClaim()) {
              alert(item.outputValue);
            }
          }}
        >
          {typeof claimed === "undefined" || loading ? (
            <ArrowPathIcon className="h-6 w-full animate-spin" />
          ) : claimed && !isInteractableAfterClaim() ? (
            "Claimed"
          ) : claimed && isInteractableAfterClaim() ? (
            "View"
          ) : unlocked ? (
            "Claim"
          ) : (
            <LockClosedIcon className="h-6 w-full" />
          )}
        </button>
      </div>
    </div>
  );
}
