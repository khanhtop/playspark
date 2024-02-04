import { useEffect, useState } from "react";
import AreaTabs from "../areaTabs";
import ClientPageWrapper from "../clientPageWrapper";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { useAppContext } from "@/helpers/store";
import { getAvailableReward } from "@/helpers/rewards";
import RewardCard from "../rewardCard";
import { firestore } from "@/helpers/firebase";

export default function ClientCoins({ user, screen, setScreen }) {
  const [tab, setTab] = useState("wallet");
  const [subTab, setSubTab] = useState("offers");
  const context = useAppContext();

  return (
    <ClientPageWrapper
      user={user}
      withBackNav="Return Home"
      onBackNav={() => setScreen("home")}
    >
      <AreaTabs
        user={user}
        onClick={(a) => setTab(a.value)}
        selected={tab}
        options={[
          {
            text: "My Wallet",
            value: "wallet",
          },
          {
            text: "Marketplace",
            value: "marketplace",
          },
        ]}
      />
      {tab === "wallet" && (
        <>
          <div
            style={{ color: user.textColor }}
            className="flex rounded-xl shadow-lg justify-center gap-4 bg-black/10 mt-4 mx-4 px-4 py-8 font-octo text-5xl"
          >
            <div>
              <img src="/clientPages/coins.png" />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <p className="text-2xl">Available Coin Balance</p>
              <p>{user.totalScore}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-6 pb-8 px-5 gap-4">
            {context?.rewards
              ?.filter(
                (a) =>
                  a.purchasedBy === context.loggedIn?.uid &&
                  a.isRedeemed === false
              )
              ?.map((item, key) => (
                <RewardCard user={user} item={item} key={key} isRedeem={true} />
              ))}
          </div>
        </>
      )}
      {tab === "marketplace" && (
        <>
          <div
            style={{ color: user.textColor }}
            className="flex rounded-xl shadow-lg justify-center gap-4 bg-black/10 mt-4 mx-4 px-4 py-8 font-octo text-5xl"
          >
            <div>
              <img src="/clientPages/coins.png" />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <p className="text-2xl">Available Coin Balance</p>
              <p>{user.totalScore}</p>
            </div>
          </div>
          <div className="px-4 mt-6">
            <AreaTabs
              user={user}
              onClick={(a) => setSubTab(a.value)}
              selected={subTab}
              options={[
                {
                  text: "Offers",
                  value: "offers",
                },
                {
                  text: "In Game Items",
                  value: "items",
                },
              ]}
            />
            {subTab === "offers" && (
              <div className="grid grid-cols-2 gap-4 mt-6 pb-8">
                {getAvailableReward(context?.rewards)?.map((item, key) => (
                  <RewardCard user={user} item={item} key={key} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </ClientPageWrapper>
  );
}
