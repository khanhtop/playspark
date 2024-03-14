import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import FilterPills from "./filterPills";
import { AudienceUsers } from "../audience/users";
import { AudienceEmails } from "../audience/emails";

export default function Users() {
  const context = useAppContext();
  const [pane, setPane] = useState("users");

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
      {pane === "users" && <AudienceUsers />}
      {pane === "emails" && <AudienceEmails />}
    </div>
  );
}
