import AuthWrapper from "@/components/auth/authWrapper";
import Avatar from "@/components/dash/avatar";
import Pane from "@/components/dash/pane";
import Sidebar from "@/components/dash/sidebar";
import OnboardWrapper from "@/components/onboard/onboardWrapper";
import { logout } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { useEffect, useState } from "react";

export default function Application() {
  const context = useAppContext();
  const [selectedPane, setSelectedPane] = useState(0);

  return (
    <AuthWrapper>
      <OnboardWrapper>
        <div className="h-screen w-screen flex bg-white">
          <Sidebar
            selectedPane={selectedPane}
            setSelectedPane={setSelectedPane}
          />
          <Pane />
          <Avatar character={context.profile?.companyName?.substring(0, 1)} />
        </div>
      </OnboardWrapper>
    </AuthWrapper>
  );
}
