import { useEffect, useState } from "react";
import ImagePicker from "../forms/imagePicker";
import { useAppContext } from "@/helpers/store";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import Button from "../forms/button";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Input from "../forms/input";
import SubNav from "../nav/subnav";

export default function Account() {
  const context = useAppContext();
  const [nav, setNav] = useState("branding");
  const [loading, setLoading] = useState(false);

  // Image Assets
  const [brandLogo, setBrandLogo] = useState();
  const [sponsorLogo, setSponsorLogo] = useState();

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

  useEffect(() => {
    if (context?.profile?.brandLogo) {
      setBrandLogo(context?.profile?.brandLogo);
    }
    if (context?.profile?.sponsorLogo) {
      setSponsorLogo(context?.profile?.sponsorLogo);
    }
  }, [context.profile]);

  const updateProfile = async () => {
    setLoading(true);
    await updateDoc(doc(firestore, "users", context.loggedIn?.uid), {
      ...(brandLogo && { brandLogo: brandLogo }),
      ...(sponsorLogo && { sponsorLogo: sponsorLogo }),
    });
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <SubNav
        selected={nav}
        onSelect={(item) => setNav(item.value)}
        options={[
          {
            text: "Logos & Images",
            value: "branding",
          },
          {
            text: "Surveys",
            value: "surveys",
          },
          {
            text: "Email",
            value: "email",
          },
          {
            text: "Billing",
            value: "billing",
          },
        ]}
      />
      {nav === "branding" && (
        <>
          <p className="text-white/70 text-sm">
            Tip: For logos, use PNG images of approximately 400px x 200px, and
            ensure that the background is transparent in order to ensure that
            the game looks as good as possible.
          </p>
          <ImagePicker
            id="brand-logo"
            width={400}
            height={200}
            label="Brand Logo"
            image={brandLogo}
            onChange={(url) => {
              setBrandLogo(url);
            }}
          />
          <ImagePicker
            id="sponsor-logo"
            width={400}
            height={200}
            label="Sponsor Logo"
            image={sponsorLogo}
            onChange={(url) => {
              setSponsorLogo(url);
            }}
          />

          <button
            onClick={() => updateProfile()}
            className="cursor-pointer w-[200px] h-12 rounded-lg bg-cyan-400 mt-0 flex items-center justify-center"
          >
            {loading ? (
              <ArrowPathIcon className="h-6 w-6 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
        </>
      )}
      {nav === "surveys" && (
        <>
          <p className="text-white/70 text-sm">Placeholder</p>
        </>
      )}
      {nav === "email" && (
        <>
          <p className="text-white/70 text-sm">
            Explore and export email addresses that have been captured through
            PlaySpark. We will soon be launching direct integration into your
            email marketing platforms, such as MailChimp and Klaviyo.
          </p>
          <div>
            {emails.map((item, key) => (
              <div key={key} className="bg-white/10 px-4 py-1 rounded-full">
                <p className="text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {nav === "billing" && (
        <>
          <p className="text-white/70 text-sm">Placeholder</p>
        </>
      )}
    </div>
  );
}
