import AuthWrapper from "@/components/auth/authWrapper";
import Account from "@/components/dash/account";
import Analytics from "@/components/dash/analytics";
import Dashboard from "@/components/dash/dashboard";
import MarketPlace from "@/components/dash/marketplace";
import MyGames from "@/components/dash/mygames";
import Pane from "@/components/dash/pane";
import Profile from "@/components/dash/profile";
import Rewards from "@/components/dash/rewards";
import Sidebar from "@/components/dash/sidebar";
import Usage from "@/components/dash/usage";
import Users from "@/components/dash/users";
import OnboardWrapper from "@/components/onboard/onboardWrapper";
import StripeModalWrapper from "@/components/stripe/stripeModalWrapper";
import Script from "next/script";
import { useState } from "react";

export default function Application() {
  const [selectedPane, setSelectedPane] = useState(4);

  return (
    <AuthWrapper>
      <OnboardWrapper>
        <div className="h-screen w-screen flex bg-purple-100">
          <Script
            src="//code.tidio.co/o1tu31nt1q7jgvu7jqounf2czebgif2m.js"
            strategy="afterInteractive"
          />
          <Sidebar
            selectedPane={selectedPane}
            setSelectedPane={setSelectedPane}
          />
          {selectedPane === 1 ? (
            <Pane
              title="My Games"
              subtext="Review games that are currently active, and those which have ended or have been manually archived."
            >
              <MyGames />
            </Pane>
          ) : selectedPane === 0 ? (
            <Pane
              title="Marketplace"
              subtext="Browse through PlaySpark's game marketplace, select a template, and fully configure and brand games."
            >
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
            <Pane
              title="Dashboard"
              subtext="Your central PlaySpark hub. Manage your credits and get snapshots of how well your games are performing."
            >
              <Dashboard />
            </Pane>
          ) : selectedPane === 5 ? (
            <Pane
              title="Analytics"
              subtext="Review data on play count, dwell times and marketing factors such as videos and surveys in order to obtain insights."
            >
              <Analytics />
            </Pane>
          ) : selectedPane === 6 ? (
            <Pane
              title="Audience & Data"
              subtext="View, analyse and export information on your audience as a whole, and review data on email addresses shared, surveys completed, and videos and playable ads that users have engaged with."
            >
              <Users />
            </Pane>
          ) : selectedPane === 7 ? (
            <Pane
              title="Account"
              subtext="Configure important account settings"
            >
              <Account />
            </Pane>
          ) : selectedPane === 8 ? (
            <Pane
              title="Rewards"
              subtext="Set up and configure various rewards and prizes that users can engage with."
            >
              <Rewards />
            </Pane>
          ) : (
            <Pane />
          )}
        </div>
        <StripeModalWrapper />
      </OnboardWrapper>
    </AuthWrapper>
  );
}
