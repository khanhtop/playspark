import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddRewardModal({ user, isOpen, onClose, children }) {
  if (!isOpen) return <div />;
  const context = useAppContext();
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reward, setReward] = useState({
    name: "",
    description: "",
    quantity: 2,
    price: 200,
  });

  useEffect(() => {
    if (
      reward.name.length > 0 &&
      reward.description.length > 0 &&
      reward.quantity > 0
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [reward]);

  const addReward = async () => {
    setLoading(true);
    const uniqueId = uuidv4();
    const { name, description, quantity, price } = reward;
    const rewardsCollection = collection(firestore, "rewards");
    for (let i = 0; i < quantity; i++) {
      const newReward = {
        name: name,
        description: description,
        price: price,
        timestamp: Date.now(),
        rewardTypeId: uniqueId,
        rewardId: Date.now().toString() + i.toString(),
        ownerId: context?.loggedIn?.uid,
        ownerName: context?.profile?.companyName,
        isPurchased: false,
        isRedeemed: false,
      };
      await addDoc(rewardsCollection, newReward);
    }
    setLoading(false);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="h-screen w-screen fixed backdrop-blur top-0 left-0 z-30 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-[500px] max-h-[800px] border-2 rounded-2xl py-4 px-4 flex flex-col gap-4"
        style={{
          backgroundColor: "#111",
          borderColor: user?.accentColor,
        }}
      >
        <h1 className="text-white">Add A Reward</h1>
        <Input
          className="w-full h-10"
          label="Reward name"
          labelColor="text-white/70"
          placeholder="My reward"
          onChange={(e) => setReward({ ...reward, name: e.target.value })}
          value={reward.name}
          readonly={true}
        />
        <Input
          className="w-full h-10"
          label="Reward description"
          labelColor="text-white/70"
          placeholder="My reward entitles you to..."
          onChange={(e) =>
            setReward({ ...reward, description: e.target.value })
          }
          value={reward.description}
          readonly={true}
        />
        <Input
          className="w-full h-10"
          label="Amount of token required to redeem"
          labelColor="text-white/70"
          placeholder="200"
          value={reward.price}
          readonly={true}
          onChange={(e) => setReward({ ...reward, price: e.target.value })}
          type="number"
        />
        <Input
          className="w-full h-10"
          label="Number of rewards to issue"
          labelColor="text-white/70"
          placeholder="0"
          value={reward.quantity}
          readonly={true}
          onChange={(e) => setReward({ ...reward, quantity: e.target.value })}
          type="number"
        />
        <Button
          onClick={() => {
            addReward();
          }}
          disabled={!valid || loading}
        >
          Add Reward
        </Button>
      </div>
    </div>
  );
}
