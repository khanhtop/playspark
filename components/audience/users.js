import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Tabulate from "./tabulate";
import { Button } from "flowbite-react";

const columnSet = [
  {
    width: 200,
    name: "Name",
    dataKey: "companyName",
    nullValue: "Anonymous",
    searchable: true,
  },
  {
    width: 200,
    name: "Email Address",
    dataKey: "email",
    nullValue: "Anonymous",
    searchable: true,
  },
  {
    width: 100,
    name: "XP",
    dataKey: "totalXp",
    nullValue: "0",
    searchable: false,
  },
];

export function AudienceUsers({}) {
  const context = useAppContext();

  const [users, setUsers] = useState();

  console.log(users);

  useEffect(() => {
    if (context?.loggedIn?.uid && !users) {
      // Create a query to fetch users where 'memberOf' contains the logged-in user's UID
      const q = query(
        collection(firestore, "users"),
        where("memberOf", "array-contains", context.loggedIn.uid)
      );

      getDocs(q).then((res) => {
        let out = [];
        for (let doc of res.docs) {
          if (
            doc?.id?.toLowerCase() !== context?.loggedIn?.email.toLowerCase()
          ) {
            out.push({ ...doc.data() });
          }
        }
        setUsers(out);
      });
    }
  }, [context?.loggedIn, users]);

  if (!users) {
    return (
      <div className="h-full w-full flex pt-8 justify-center">
        <ArrowPathIcon className="h-8 w-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="overflow-x-scroll w-[calc(100vw-360px)] flex flex-col flex-1 h-full">
        <Tabulate columns={columnSet} data={users} />
      </div>
    </div>
  );
}
