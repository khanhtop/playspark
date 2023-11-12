import AuthWrapper from "@/components/auth/authWrapper";
import Avatar from "@/components/dash/avatar";
import MarketPlace from "@/components/dash/marketplace";
import MyGames from "@/components/dash/mygames";
import Pane from "@/components/dash/pane";
import Profile from "@/components/dash/profile";
import Sidebar from "@/components/dash/sidebar";
import Usage from "@/components/dash/usage";
import OnboardWrapper from "@/components/onboard/onboardWrapper";
import { logout } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { useEffect, useState } from "react";

export default function Application() {
  const context = useAppContext();
  const [selectedPane, setSelectedPane] = useState(4);

  return (
    <AuthWrapper>
      <OnboardWrapper>
        <div className="h-screen w-screen flex bg-[#1A202C]">
          <Sidebar
            selectedPane={selectedPane}
            setSelectedPane={setSelectedPane}
          />
          {selectedPane === 1 ? (
            <Pane title="My Games">
              <MyGames />
            </Pane>
          ) : selectedPane === 0 ? (
            <Pane title="Marketplace">
              <MarketPlace />
            </Pane>
          ) : selectedPane === 2 ? (
            <Pane title="Usage">
              <Usage />
            </Pane>
          ) : selectedPane === 3 ? (
            <Pane title="Profile">
              <Profile />
            </Pane>
          ) : selectedPane === 4 ? (
            <Pane title="Dashboard"></Pane>
          ) : selectedPane === 5 ? (
            <Pane title="Analytics"></Pane>
          ) : selectedPane === 6 ? (
            <Pane title="Users"></Pane>
          ) : (
            <Pane />
          )}

          {/* <Avatar character={context.profile?.companyName?.substring(0, 1)} /> */}
        </div>
      </OnboardWrapper>
    </AuthWrapper>
  );
}
