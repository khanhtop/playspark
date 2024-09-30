import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Tabulate from "./tabulate";
import { Button } from "flowbite-react";

const columnSet = [
  {
    width: 200,
    name: "Name",
    dataKey: "name",
    nullValue: "Anonymous",
  },
  {
    width: 200,
    name: "Email Address",
    dataKey: "email",
    nullValue: "Anonymous",
  },
];

export function AudienceUsers({}) {
  const context = useAppContext();

  const [users, setUsers] = useState();

  useEffect(() => {
    if (context?.loggedIn?.uid && !users) {
      getDocs(
        collection(firestore, "users", context.loggedIn.uid, "users")
      ).then((res) => {
        let out = [];
        for (let doc of res.docs) {
          if (
            doc?.id?.toLowerCase() !== context?.loggedIn?.email.toLowerCase()
          ) {
            out.push({ email: doc.id, ...doc.data() });
          }
        }
        setUsers(out);
      });
    }
  }, [context?.loggedIn]);

  if (!users) {
    return (
      <div className="h-full w-full flex pt-8 justify-center">
        <ArrowPathIcon className="h-8 w-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-scroll w-[calc(100vw-360px)] flex flex-1 h-full">
        <Tabulate columns={columnSet} data={users} />
      </div>
    </div>
  );
}
