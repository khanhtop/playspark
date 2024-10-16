import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Tabulate from "./tabulate";
import { Button } from "flowbite-react";
import ModalSkin from "../dash/dashModals/modalSkin";
import UserModal from "../dash/dashModals/userModal";

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
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    if (context?.loggedIn?.uid && !users) {
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
            out.push({ ...doc.data(), id: doc.id });
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
        <Tabulate
          columns={columnSet}
          data={users}
          onRowClick={(item) => setShowInfoModal(item)}
        />
      </div>
      {showInfoModal && (
        <UserModal
          onClose={() => setShowInfoModal(false)}
          narrow
          data={showInfoModal}
          clientId={context.loggedIn.uid}
        />
      )}
    </div>
  );
}
