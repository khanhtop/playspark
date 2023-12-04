import { useEffect, useState } from "react";
import ImagePicker from "../forms/imagePicker";
import { useAppContext } from "@/helpers/store";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import Button from "../forms/button";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Input from "../forms/input";
import SubNav from "../nav/subnav";
import Usage from "./usage";

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
    <div className="flex flex-col gap-4 pb-4">
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
            text: "Usage",
            value: "usage",
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
            Rectangular images will generally appear on scoreboards and around
            stadiums, whereas square logos may appear within pitches.
          </p>
          <ImagePicker
            id="brand-logo"
            constrain
            width={500}
            height={100}
            label="Rectangular Logo (5:1)"
            image={brandLogo}
            onChange={(url) => {
              setBrandLogo(url);
            }}
          />
          <ImagePicker
            id="sponsor-logo"
            constrain
            width={200}
            height={200}
            label="Square Logo (1:1)"
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
      {nav === "usage" && (
        <>
          <Usage />
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
