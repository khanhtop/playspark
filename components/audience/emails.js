import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Tabulate from "./tabulate";

const columnSet = [
  {
    width: 400,
    name: "Email Address",
    dataKey: "email",
    searchable: true,
  },
];

export function AudienceEmails({}) {
  const context = useAppContext();

  // Email Marketing
  const [emails, setEmails] = useState();

  useEffect(() => {
    if (!emails) {
      let _emails = [];
      getDocs(
        collection(firestore, "users", context?.loggedIn?.uid, "emails")
      ).then((r) => {
        for (let doc of r.docs) {
          _emails.push({ email: doc.id });
        }
        setEmails(_emails);
      });
    }
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <div className="overflow-x-scroll w-[calc(100vw-360px)] flex flex-1 ">
        <Tabulate columns={columnSet} data={emails} />
      </div>
    </div>
  );
}
