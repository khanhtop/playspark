import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/helpers/store";
import { filterCollection } from "@/helpers/firebaseApi";

export default function Usage({}) {
  const context = useAppContext();
  const [myTournaments, setMyTournaments] = useState();
  const totalBillable = useRef(0);

  // Switch get every time on/off
  const refreshOnLoad = false;
  const freemiumPrice = 0.01;
  const premiumPrice = 0.1;

  useEffect(() => {
    if (myTournaments?.length && !refreshOnLoad) return;

    filterCollection("tournaments", "ownerId", context.loggedIn?.uid).then(
      (docs) => {
        let out = [];
        docs.forEach((doc) => {
          out.push(doc);
        });
        setMyTournaments(out);
      }
    );
  }, []);

  return (
    <div className="flex flex-wrap flex-col overflow-x-hidden text-black">
      <h1 className="text-2xl">Billing & Usage</h1>
      <h1 className="mt-4">
        Current Plan:{" "}
        <span className="text-purple-400 cursor-pointer hover:text-cyan-200 transition">
          {context?.profile?.subscription?.name}
        </span>
      </h1>
      <h3 className="text-xl text-black  mt-4">Breakdown</h3>

      <div className="flex flex-1 flex-col gap-2 w-screen overflow-x-scroll mb-4">
        <UsageHeaderRow />
        {myTournaments?.map((item, key) => {
          const billable =
            item?.freemiumPlayCount > 0
              ? item.freemiumPlayCount * freemiumPrice
              : item?.premiumPlayCount > 0
              ? item?.premiumPlayCount * premiumPrice
              : 0;
          totalBillable.current += billable;
          return (
            <UsageGameRow
              key={key}
              item={item}
              freemiumPrice={freemiumPrice}
              premiumPrice={premiumPrice}
              billable={billable}
            />
          );
        })}
      </div>
      <h3 className="text-xl text-black/70">Total Charges</h3>
      <p className="text-2xl">${totalBillable.current?.toFixed(2)}</p>
    </div>
  );
}

function UsageGameRow({ item, freemiumPrice, premiumPrice, billable }) {
  const nPlays = (item.freemiumPlayCount ?? 0) + (item.premiumPlayCount ?? 0);
  const ctr =
    nPlays === 0 || item.impressions === 0 || !nPlays || !item.impressions
      ? (0).toFixed(2)
      : ((nPlays / item.impressions) * 100).toFixed(2);
  return (
    <div className="flex w-[1800px]">
      <div className="w-[300px]">
        <h3>{item.name}</h3>
      </div>
      <div className="w-[300px]">
        <h3>{item?.impressions ?? 0}</h3>
      </div>
      <div className="w-[300px]">
        <h3>{ctr}%</h3>
      </div>
      <div className="w-[300px]">
        <h3>{nPlays}</h3>
      </div>
      <div className="w-[300px]">
        <h3>${billable}</h3>
      </div>
    </div>
  );
}

function UsageHeaderRow() {
  return (
    <div className="flex w-[1800px] font-bold mt-2">
      <div className="w-[300px]">Game Name</div>
      <div className="w-[300px]">Impressions</div>
      <div className="w-[300px]">CTR</div>
      <div className="w-[300px]">Number Of Plays</div>
      <div className="w-[300px]">Charges</div>
    </div>
  );
}
