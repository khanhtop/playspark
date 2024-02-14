import { useState } from "react";
import AddRewardModal from "./qr/addRewardModal";
import GroupedRewards from "./qr/groupedRewards";

export default function Rewards() {
  const [showRewardModal, setShowRewardModal] = useState(false);
  return (
    <>
      <div className="flex flex-col">
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
    </>
  );
}
