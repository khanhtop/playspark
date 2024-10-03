import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { HiCurrencyDollar, HiPlay, HiViewList, HiMail } from "react-icons/hi";
import { useEffect, useState } from "react";
import FilterPills from "./filterPills";
import { AudienceUsers } from "../audience/users";
import { AudienceEmails } from "../audience/emails";

export default function Users() {
  const context = useAppContext();
  const [pane, setPane] = useState("users");

  return (
    <div className="flex-1 flex flex-col">
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
            icon: HiMail,
          },
          {
            value: "surveys",
            text: "Surveys",
            onSelected: () => null,
            icon: HiViewList,
          },
          {
            value: "videos",
            text: "Videos",
            onSelected: () => null,
            icon: HiPlay,
          },
          {
            value: "playableads",
            text: "Ads",
            onSelected: () => null,
            icon: HiCurrencyDollar,
          },
        ]}
      />
      {pane === "users" && <AudienceUsers />}
      {pane === "emails" && <AudienceEmails />}
    </div>
  );
}
