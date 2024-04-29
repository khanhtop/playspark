import TapHold from "@/components/ui/tapHold";
import GameButton from "@/components/uiv2/gameButton";
import { firestore } from "@/helpers/firebase";
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
        rwd.push({ ...doc.data(), firebaseId: doc.id });
      }
      setRewards(rwd);
    });
  };

  useEffect(() => {
    if (data && !rewards) {
      fetchRewards();
    }
  }, [data]);

  if (!modalState)
    return (
      <div className="pt-12 pb-4 px-4 flex flex-col gap-4">
        {data?.rewards?.map((item, key) => (
          <RewardRow
            onFlipCard={(a) => setModalState(a)}
            // isRedeemed={
            //   rewards && rewards?.find((a) => a.id === item.id)?.isRedeemed
            // }
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

  console.log(modalState);

  if (modalState)
    return (
      <div className="pt-12 pb-4 px-4 flex flex-col gap-2 items-center font-octo text-black">
        <p className="text-3xl uppercase font-bold">{modalState.name}</p>
        <p className="text-xl font-light">{modalState.description}</p>
        <img src={modalState.image} className="h-20 rounded-3xl" />
        {modalState.outputAction === "promocode" && (
          <div
            onClick={() => window.open(modalState.outputLocation, "__blank")}
            className="flex items-center gap-1 my-2 cursor-pointer"
          >
            <LinkIcon className="h-5" />
            <p className="text-lg uppercase font-light">
              {modalState.outputLocation}
            </p>
          </div>
        )}
        {modalState.outputAction === "physical" && (
          <div className="flex items-center gap-1 my-2">
            <MapPinIcon className="h-5" />
            <p className="text-lg uppercase font-light">
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
        ) : (
          <TapHold
            bgColor={data.primaryColor}
            textColor={data.textColor}
            onComplete={() => {
              redeemInFirebase();
            }}
          />
        )}
        <GameButton
          className="w-[330px]"
          bgColor="red"
          textColor={data.textColor}
          onClick={() => {
            setModalState();
          }}
        >
          {modalState.outputAction === "promocode" ? "Close" : "Redeem Later"}
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
  function isInteractableAfterClaim() {
    if (item.outputAction === "promocode" || item.outputAction === "physical")
      return true;
    return false;
  }
  console.log(isRedeemed);
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
            if (isRedeemed) {
              null;
            } else if (unlocked && !claimed) {
              onClaim(item);
            } else if (claimed && isInteractableAfterClaim()) {
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
    </div>
  );
}
