import { games } from "@/helpers/games";
import { useState, useEffect, useRef } from "react";
import GameCard from "./gameCard";
import { useAppContext } from "@/helpers/store";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import Embed from "./embed";

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
    const tournamentsRef = collection(firestore, "tournaments");
    const q = query(
      tournamentsRef,
      where("ownerId", "==", context.loggedIn?.uid)
    );
    let out = [];
    getDocs(q).then((result) => {
      result.forEach((doc) => {
        out.push(doc.data());
      });
    });
    setMyTournaments(out);
  }, []);

  useEffect(() => {
    if (myTournaments) {
      console.log(myTournaments);
    }
  }, [myTournaments]);

  return (
    <div className="flex flex-wrap text-white flex-col">
      <h1 className="text-2xl">Usage</h1>
      <h3 className="text-xl text-white  mt-4">Breakdown</h3>
      <UsageHeaderRow />
      <div className="flex flex-1 flex-col gap-2">
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
      <h3 className="text-xl text-white/70">Total Charges</h3>
      <p className="text-2xl">${totalBillable.current?.toFixed(2)}</p>
    </div>
  );
}

function UsageGameRow({ item, freemiumPrice, premiumPrice, billable }) {
  const nPlays = (item.freemiumPlayCount ?? 0) + (item.premiumPlayCount ?? 0);
  return (
    <div className="flex">
      <div className="flex-1">
        <h3>{item.name}</h3>
      </div>
      <div className="flex-1">
        <h3>{item.tournamentId}</h3>
      </div>
      <div className="flex-1">
        <h3>{nPlays}</h3>
      </div>
      <div className="flex-1">
        <h3>${billable}</h3>
      </div>
    </div>
  );
}

function UsageHeaderRow() {
  return (
    <div className="flex font-bold mt-2">
      <div className="flex-1">Game Name</div>
      <div className="flex-1">Game ID</div>
      <div className="flex-1">Number Of Plays</div>
      <div className="flex-1">Charges</div>
    </div>
  );
}
