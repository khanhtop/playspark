import { useState } from "react";
import AddRewardModal from "./qr/addRewardModal";
import GroupedRewards from "./qr/groupedRewards";
import SubNav from "../nav/subnav";
import AddPrizeModal from "./prizes/addPrizeModal";
import GroupedPrizes from "./prizes/groupedPrizes";

export default function Rewards() {
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [nav, setNav] = useState("rewards");
  return (
    <>
      <SubNav
        selected={nav}
        onSelect={(item) => setNav(item.value)}
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
        <div className="flex flex-col mt-4">
          <p className="text-white/70 text-md">Add Rewards To Your Platform</p>
          <p className="text-white/50 text-sm mb-4">
            Reward users with perks and offers that they can redeem at the point
            of redemption using a single-use QR code.
          </p>
          <button
            onClick={() => setShowRewardModal(true)}
            className="cursor-pointer w-[200px] h-12 rounded-lg bg-cyan-400 mt-0 flex items-center justify-center"
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
        <div className="flex flex-col mt-4">
          <p className="text-white/70 text-md">Add Prizes To Your Platform</p>
          <p className="text-white/50 text-sm mb-4">
            Show users what they can win by competing in tournaments. This
            information will be shown to users on your home page.
          </p>
          <button
            onClick={() => setShowPrizeModal(true)}
            className="cursor-pointer w-[200px] h-12 rounded-lg bg-cyan-400 mt-0 flex items-center justify-center"
          >
            Add Prize
          </button>
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
