import { filterCollection } from "@/helpers/firebaseApi";
import { useAppContext } from "@/helpers/store";
import { useEffect, useState } from "react";
import DeploymentsTable from "./deploymentsTable";

export default function MyPlayableAds() {
  const context = useAppContext();
  const [ads, setAds] = useState(null);

  useEffect(() => {
    if (!ads) {
      filterCollection("playable_ads", "ownerId", context.loggedIn?.uid).then(
        (docs) => {
          let out = [];
          docs.forEach((doc) => {
            out.push(doc);
          });
          setAds(out);
        }
      );
    }
  }, []);

  return (
    <div>
      <DeploymentsTable data={ads} />
    </div>
  );
}
