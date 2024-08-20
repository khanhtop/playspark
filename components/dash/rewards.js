import { useState } from "react";
import AddRewardModal from "./qr/addRewardModal";
import GroupedRewards from "./qr/groupedRewards";
import SubNav from "../nav/subnav";
import AddPrizeModal from "./prizes/addPrizeModal";
import GroupedPrizes from "./prizes/groupedPrizes";
import FilterPills from "./filterPills";
import ImagePicker from "../forms/imagePicker";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";

export default function Rewards() {
  const context = useAppContext();
  const [prizeTileImage, setPrizeTileImage] = useState(
    context?.profile?.prizeTileImage || "/clientPages/prizeCard.jpg"
  );
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [nav, setNav] = useState("rewards");

  const updateProfile = async (url) => {
    await updateDoc(doc(firestore, "users", context.loggedIn?.uid), {
      prizeTileImage: url,
    });
    if (url) {
      setPrizeTileImage(url);
    } else {
      setPrizeTileImage("/clientPages/prizeCard.jpg");
    }
  };

  return (
    <>
      <FilterPills
        selected={nav}
        onSelect={(item) => setNav(item)}
        options={[
          {
            text: "Rewards",
            value: "rewards",
          },
          {
            text: "Prizes",
            value: "prizes",
          },
        ]}
      />

      {nav === "rewards" && (
        <div className="flex flex-col mt-0 text-black/70">
          <p className="font-bold text-md">Add Rewards To Your Platform</p>
          <p className="text-sm mb-4">
            Reward users with perks and offers that they can redeem at the point
            of redemption using a single-use QR code.
          </p>
          <button
            onClick={() => setShowRewardModal(true)}
            className="cursor-pointer w-[200px] h-12 rounded-lg bg-indigo-700 text-white mt-0 flex items-center justify-center"
          >
            Add Reward
          </button>
          <AddRewardModal
            isOpen={showRewardModal}
            onClose={() => setShowRewardModal(false)}
          />
          <GroupedRewards />
        </div>
      )}
      {nav === "prizes" && (
        <div className="flex flex-col mt-0 text-black/70">
          <p className="font-bold text-md">Add Prizes To Your Platform</p>
          <p className="text-sm mb-4">
            Show users what they can win by competing in tournaments. This
            information will be shown to users on your home page.
          </p>
          <button
            onClick={() => setShowPrizeModal(true)}
            className="cursor-pointer w-[200px] h-12 rounded-lg bg-indigo-700 text-white mt-0 flex items-center justify-center"
          >
            Add Prize
          </button>
          <div className="h-4" />
          <ImagePicker
            darkTheme
            id="prize-tile"
            revertTo={() => {
              updateProfile(null);
            }}
            constrain
            width={360}
            height={200}
            label="Image For Prizes Tile"
            image={prizeTileImage}
            onChange={updateProfile}
          />
          <AddPrizeModal
            isOpen={showPrizeModal}
            onClose={() => setShowPrizeModal(false)}
          />
          <GroupedPrizes />
        </div>
      )}
    </>
  );
}
