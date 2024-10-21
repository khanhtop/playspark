import { setDocument } from "@/helpers/firebaseApi";
import { generateProfile } from "@/helpers/profileGen";
import { useAppContext } from "@/helpers/store";
import { useEffect } from "react";

export default function ProfileWrapper({ children }) {
  const context = useAppContext();

  useEffect(() => {
    if (context?.profile && !context?.profile?.companyName) {
      const username = generateProfile();
      setDocument("users", context?.loggedIn?.uid, {
        companyName: username,
        email: context?.loggedIn?.email,
      });
    }
  }, [context.profile]);
  return <div className="">{children}</div>;
}
