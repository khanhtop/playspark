import Button from "@/components/forms/button";
import ImagePicker from "@/components/forms/imagePicker";
import Input from "@/components/forms/input";
import { addDocument } from "@/helpers/firebaseApi";
import { useAppContext } from "@/helpers/store";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddPrizeModal({ user, isOpen, onClose, children }) {
  if (!isOpen) return <div />;
  const context = useAppContext();
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reward, setReward] = useState({
    name: "",
    description: "",
    quantity: 2,
    image: "",
    address: "",
    url: "",
    code: "",
  });

  useEffect(() => {
    if (
      reward.name.length > 0 &&
      reward.description.length > 0 &&
      reward.quantity > 0 &&
      reward.image &&
      reward.image !== ""
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [reward]);

  const addReward = async () => {
    setLoading(true);
    const uniqueId = uuidv4();
    const { name, description, quantity, image, address, url, code } = reward;
    // const rewardsCollection = collection(firestore, "prizes");
    for (let i = 0; i < quantity; i++) {
      const newReward = {
        name: name,
        description: description,
        timestamp: Date.now(),
        image: image,
        address: address,
        url: url,
        code: code,
        prizeTypeId: uniqueId,
        prizeId: Date.now().toString() + i.toString(),
        ownerId: context?.loggedIn?.uid,
        ownerName: context?.profile?.companyName,
        isRedeemed: false,
      };
      await addDocument("prizes", newReward);
      // await addDoc(rewardsCollection, newReward);
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
        <h1 className="text-white">Add A Prize</h1>
        <div className="text-white">
          <ImagePicker
            cover
            width={200}
            height={100}
            label="Prize Image"
            image={reward?.image}
            onChange={(url) => {
              setReward({ ...reward, image: url });
            }}
          />
        </div>
        <Input
          className="w-full h-10"
          label="Prize name"
          labelColor="text-white/70"
          placeholder="My prize"
          onChange={(e) => setReward({ ...reward, name: e.target.value })}
          value={reward.name}
          readonly={true}
        />
        <Input
          className="w-full h-10"
          label="Prize description"
          labelColor="text-white/70"
          placeholder="My prize entitles you to..."
          onChange={(e) =>
            setReward({ ...reward, description: e.target.value })
          }
          value={reward.description}
          readonly={true}
        />
        <Input
          className="w-full h-10"
          label="Prize redemption URL (for digital prizes)"
          labelColor="text-white/70"
          placeholder="https://"
          onChange={(e) => setReward({ ...reward, url: e.target.value })}
          value={reward.url}
          readonly={true}
        />
        <Input
          className="w-full h-10"
          label="Prize Digital Code (for digital prizes)"
          labelColor="text-white/70"
          placeholder="12345"
          onChange={(e) => setReward({ ...reward, code: e.target.value })}
          value={reward.code}
          readonly={true}
        />
        <Input
          className="w-full h-10"
          label="Address (for physical prizes)"
          labelColor="text-white/70"
          placeholder="100 51st Street, New York"
          onChange={(e) => setReward({ ...reward, address: e.target.value })}
          value={reward.address}
          readonly={true}
        />
        <Input
          className="w-full h-10"
          label="Number of prizes available"
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
