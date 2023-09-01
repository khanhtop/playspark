import AuthWrapper from "@/components/auth/authWrapper";
import OnboardWrapper from "@/components/onboard/onboardWrapper";
import { logout } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { useEffect, useState } from "react";

export default function Application() {
  const context = useAppContext();

  return (
    <AuthWrapper>
      <OnboardWrapper>
        <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-white">
          <p>Logged In With Email {context.loggedIn?.email}</p>
          <button
            onClick={() => logout()}
            className="bg-cyan-300 text-black px-4 py-2 rounded-lg mt-2"
          >
            Sign Out
          </button>
        </div>
      </OnboardWrapper>
    </AuthWrapper>
  );
}
