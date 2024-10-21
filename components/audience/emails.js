import { useAppContext } from "@/helpers/store";
import { useEffect, useState } from "react";
import Tabulate from "./tabulate";
import { getCollection } from "@/helpers/firebaseApi";

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
      getCollection(`users/${context.loggedIn?.uid}/emails`).then((res) => {
        const _emails = res.map((elem) => ({
          email: elem.id,
        }));
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
