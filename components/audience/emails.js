import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export function AudienceEmails({}) {
  const context = useAppContext();

  // Email Marketing
  const [emails, setEmails] = useState();

  useEffect(() => {
    if (!emails) {
      let _emails = [];
      getDocs(
        collection(firestore, "users", context?.loggedIn?.uid, "emails")
      ).then((r) => {
        for (let doc of r.docs) {
          _emails.push(doc.id);
        }
        setEmails(_emails);
      });
    }
  }, []);

  return (
    <>
      <p className="text-white/70 text-sm">
        Explore and export email addresses that have been captured through
        PlaySpark. We will soon be launching direct integration into your email
        marketing platforms, such as MailChimp and Klaviyo.
      </p>
      <div className="flex gap-2">
        {emails?.map((item, key) => (
          <div key={key} className="bg-white/10 px-4 py-1 rounded-full">
            <p className="text-white/80">{item}</p>
          </div>
        ))}
      </div>
    </>
  );
}
