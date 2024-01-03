import AuthWrapper from "@/components/auth/authWrapper";
import Account from "@/components/dash/account";
import Dashboard from "@/components/dash/dashboard";
import MarketPlace from "@/components/dash/marketplace";
import MyGames from "@/components/dash/mygames";
import Pane from "@/components/dash/pane";
import Profile from "@/components/dash/profile";
import Sidebar from "@/components/dash/sidebar";
import Usage from "@/components/dash/usage";
import Users from "@/components/dash/users";
import OnboardWrapper from "@/components/onboard/onboardWrapper";
import { useAppContext } from "@/helpers/store";
import { useState } from "react";

export default function Application() {
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
            <Pane title="Dashboard">
              <Dashboard />
            </Pane>
          ) : selectedPane === 5 ? (
            <Pane title="Analytics">{/* <Dashboard /> */}</Pane>
          ) : selectedPane === 6 ? (
            <Pane title="Users">
              <Users />
            </Pane>
          ) : selectedPane === 7 ? (
            <Pane title="Account">
              <Account />
            </Pane>
          ) : (
            <Pane />
          )}
        </div>
      </OnboardWrapper>
    </AuthWrapper>
  );
}
