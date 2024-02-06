import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import UIButton from "../ui/button";
import { firestore } from "@/helpers/firebase";
import { useState } from "react";
import { useAppContext } from "@/helpers/store";
import EmbeddedModal from "./embeddedModal";
import QR from "../dash/qr/qr";

export default function RewardCard({ user, item, isRedeem }) {
  const context = useAppContext();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const claimReward = async () => {
    setLoading(true);
    console.log(item.id);
    await updateDoc(doc(firestore, "rewards", item.id), {
      isPurchased: true,
      purchasedBy: context?.loggedIn?.uid,
    });
    await updateDoc(doc(firestore, "users", context?.loggedIn?.uid), {
      totalScore: context?.profile?.totalScore - item.price,
    });
    setLoading(false);
    alert("Reward Claimed");
  };

  const redeemReward = async () => {
    console.log(
      `https://dev.playspark.com/redeem/${item.ownerId}?itemId=${item.rewardId}`
    );
    setShowModal(true);
  };

  return (
    <div
      className={`flex flex-col font-octo rounded-3xl text-base overflow-hidden relative group h-[260px] shadow-lg hover:shadow-md shadow-black/50`}
    >
      <div
        style={{
          backgroundImage: `url("${item.image}")`,
          transition: "0.5s all",
        }}
        className="bg-center bg-cover flex-1 flex items-end p-2"
      >
        <div className="flex justify-end w-full">
          <UIButton
            loading={loading}
            onClick={() =>
              isRedeem
                ? redeemReward()
                : context?.profile?.totalScore >= item.price
                ? claimReward()
                : null
            }
            primaryColor={user.accentColor}
            textColor={user.primaryColor}
            text={
              isRedeem
                ? "Redeem"
                : context?.profile?.totalScore >= item.price
                ? "Claim"
                : "Need More Coins"
            }
            className=""
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between pt-4 px-4 items-center">
          <h3 className="text-2xl">{item.name}</h3>
          {!isRedeem && (
            <div className="flex items-center gap-4">
              <img src="/clientPages/coins.png" className="h-6 w-6" />
              <p className="text-2xl">{item.price}</p>
            </div>
          )}
        </div>
        <h3 className="text-base opacity-70 font-roboto px-4 ">
          {item.description}
        </h3>
        {isRedeem ? (
          <div className="h-4" />
        ) : (
          <h3 className="text-sm opacity-50 uppercase text-right font-roboto px-4 pb-4 pb-4">
            {item.totalIssued - item.totalRedeemed} Left To Claim
          </h3>
        )}
      </div>
      <EmbeddedModal
        isOpen={showModal}
        user={user}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="h-full w-full px-4 py-4 flex flex-col">
          <h1 className="text-3xl mb-2">Redeem Reward</h1>
          <p className="font-roboto mb-4">
            Show the QR code to the vendor to redeem your reward.
          </p>
          <QR
            value={`https://dev.playspark.co/redeem/${item.ownerId}?itemId=${item.rewardId}`}
          />
          <UIButton
            onClick={() => {
              setShowModal(false);
            }}
            primaryColor={user.accentColor}
            textColor={user.primaryColor}
            text="Close"
            className="mt-4"
          />
        </div>
      </EmbeddedModal>
    </div>
  );
}
