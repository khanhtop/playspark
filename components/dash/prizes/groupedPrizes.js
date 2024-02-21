import { groupRewards } from "@/helpers/rewards";
import { useAppContext } from "@/helpers/store";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/helpers/firebase";

export default function GroupedPrizes({}) {
  const context = useAppContext();

  const deleteConfirmation = async (rewardTypeId) => {
    const isSure = window.confirm(
      "Are you sure you want to delete this reward?  Users may be affected if they hold unredeemed rewards."
    );
    if (isSure) {
      const rewardsCollection = collection(firestore, "prizes");
      const q = query(
        rewardsCollection,
        where("rewardTypeId", "==", rewardTypeId)
      );
      const querySnapshot = await getDocs(q);
      const deletePromises = [];
      querySnapshot.forEach((docu) => {
        const docRef = doc(rewardsCollection, docu.id);
        deletePromises.push(deleteDoc(docRef));
      });
      await Promise.all(deletePromises);
      alert("Reward Deleted");
    } else {
      console.log("Canceling delete operation");
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      {groupRewards(context.prizes)?.map((item, key) => {
        return (
          <RewardCard
            item={item}
            key={key}
            onDelete={(a) => deleteConfirmation(a)}
          />
        );
      })}
    </div>
  );
}

function RewardCard({ item, onDelete }) {
  return (
    <div className="relative text-white bg-black/20 py-4 px-4 rounded-lg flex gap-4">
      <img src={item.image} className="h-12 rounded-sm object-cover" />

      <div>
        <div className="flex gap-2 items-center mb-1">
          <p>{item.name}</p>
        </div>

        <p className="text-sm text-white/70">{item.description}</p>
        <div className="flex gap-4 flex-wrap  mt-4">
          <StatBox text="Available" value={item.totalIssued} />
          <StatBox text="Redeemed" value={item.totalRedeemed} />
        </div>
      </div>
      <div
        onClick={() => onDelete(item.rewardTypeId)}
        className="absolute top-4 right-4"
      >
        <XMarkIcon className="h-6 w-6" />
      </div>
    </div>
  );
}

function StatBox({ text, value }) {
  return (
    <div className="flex items-center gap-2">
      <p className="uppercase text-sm text-white/50 mt-[1px]">{text}</p>
      <div className="text-xs h-[20px] min-w-[20px] px-1 rounded-full flex items-center justify-center ounded-full bg-cyan-500">
        {value}
      </div>
    </div>
  );
}
