import { groupRewards } from "@/helpers/rewards";
import { useAppContext } from "@/helpers/store";
import QR from "./qr";
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

export default function GroupedRewards({}) {
  const context = useAppContext();

  const deleteConfirmation = async (rewardTypeId) => {
    const isSure = window.confirm(
      "Are you sure you want to delete this reward?  Users may be affected if they hold unredeemed rewards."
    );
    if (isSure) {
      const rewardsCollection = collection(firestore, "rewards");
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
      {groupRewards(context.rewards)?.map((item, key) => {
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
    <div className="relative text-white bg-black/20 py-4 px-4 rounded-lg flex gap-8">
      <div className="h-16 w-16">
        <QR value={`https://playspark.co/redeem/${item.rewardId}`} />
      </div>

      <div>
        <p>{item.name}</p>
        <p className="text-sm text-white/70">{item.description}</p>
        <p className="mt-2">
          Total Redeemed: {item.totalRedeemed}/{item.totalIssued}
        </p>
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
