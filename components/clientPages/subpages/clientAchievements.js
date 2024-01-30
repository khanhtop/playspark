import { useState } from "react";
import AreaTabs from "../areaTabs";
import ClientPageWrapper from "../clientPageWrapper";
import { useAppContext } from "@/helpers/store";

export default function ClientAchievements({ user, screen, setScreen }) {
  const context = useAppContext();
  const [tab, setTab] = useState("active");

  return (
    <ClientPageWrapper
      withBackNav="Achievements"
      onBackNav={() => setScreen("home")}
      user={user}
    >
      <AreaTabs
        user={user}
        onClick={(a) => setTab(a.value)}
        selected={tab}
        options={[
          {
            text: "Active",
            value: "active",
          },
          {
            text: "To Begin",
            value: "inactive",
          },
        ]}
      />
    </ClientPageWrapper>
  );
}
