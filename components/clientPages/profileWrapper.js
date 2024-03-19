import { firestore } from "@/helpers/firebase";
import { generateProfile } from "@/helpers/profileGen";
import { useAppContext } from "@/helpers/store";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function ProfileWrapper({ children }) {
  const context = useAppContext();

  useEffect(() => {
    if (context?.profile && !context?.profile?.companyName) {
      const username = generateProfile();
      setDoc(
        doc(firestore, "users", context?.loggedIn?.uid),
        {
          companyName: username,
          email: context?.loggedIn?.email,
        },
        {
          merge: true,
        }
      );
    }
  }, [context.profile]);
  return <div className="">{children}</div>;
}
