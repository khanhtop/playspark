import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import FilterPills from "./filterPills";

export default function Users() {
  const context = useAppContext();
  const [users, setUsers] = useState();
  const [pane, setPane] = useState("users");

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
    <div>
      <FilterPills
        selected={pane}
        onSelect={(a) => setPane(a)}
        options={[
          {
            value: "users",
            text: "Users",
            onSelected: () => null,
          },
          {
            value: "emails",
            text: "Emails",
            onSelected: () => null,
          },
          {
            value: "surveys",
            text: "Surveys",
            onSelected: () => null,
          },
          {
            value: "videos",
            text: "Videos",
            onSelected: () => null,
          },
          {
            value: "playableads",
            text: "Ads",
            onSelected: () => null,
          },
        ]}
      />
      {pane === "users" && (
        <>
          <h2 className="text-white/70 mb-4">
            List of users who have created accounts for any of your tournaments.
          </h2>
          <h2 className="text-white/70 mb-4">Total: {users?.length || 0}</h2>

          {users.map((item, key) => (
            <div className="text-white flex gap-2 mb-2">
              <div className="bg-cyan-400 text-black h-6 w-6 rounded-full flex items-center justify-center text-xs">
                {key + 1}
              </div>
              {item.email} {item.name !== "" ? `(${item.name})` : ""}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
