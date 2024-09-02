import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { collection, getDocs } from "firebase/firestore";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";

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
          console.log(doc);
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
    <>
      <h2 className="text-black/70 mb-4">
        List of users who have created accounts for any of your tournaments.
      </h2>
      <h2 className="text-black/70 mb-4">Total: {users?.length || 0}</h2>

      {users?.map((item, key) => (
        <Card className="mb-2">
          <div className="text-black/70 flex gap-4 items-start">
            <div className="bg-indigo-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">
              {key + 1}
            </div>
            <div className="flex flex-col">
              <p className="font-bold">
                {" "}
                {item.name !== "" && item.name !== undefined
                  ? `${item.name}`
                  : "Anonymous"}
              </p>
              <p className="text-sm">{item.email}</p>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
