import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Tabulate from "./tabulate";
import UserModal from "../dash/dashModals/userModal";
import { filterArrayCollection } from "@/helpers/firebaseApi";

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
      filterArrayCollection("users", "memberOf", context?.loggedIn?.uid).then(
        (res) => {
          console.log(res);
          setUsers(res);
        }
      );
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
