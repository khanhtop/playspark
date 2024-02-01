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
import API from "./api";
import { ColorPicker } from "./createTournamentModal";
import AddRewardModal from "./qr/addRewardModal";
import GroupedRewards from "./qr/groupedRewards";

export default function Account() {
  const context = useAppContext();
  const [nav, setNav] = useState("branding");
  const [loading, setLoading] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  // Image Assets
  const [slug, setSlug] = useState();
  const [brandLogo, setBrandLogo] = useState();
  const [sponsorLogo, setSponsorLogo] = useState();
  const [primaryColor, setPrimaryColor] = useState("#222");
  const [accentColor, setAccentColor] = useState("#06b6d4");
  const [textColor, setTextColor] = useState("#FFF");

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
    if (context?.profile?.slug) {
      setSlug(context?.profile?.slug);
    }
    if (context?.profile?.primaryColor) {
      setPrimaryColor(context?.profile?.primaryColor);
    }
    if (context?.profile?.accentColor) {
      setAccentColor(context?.profile?.accentColor);
    }
    if (context?.profile?.textColor) {
      setTextColor(context?.profile?.textColor);
    }
  }, [context.profile]);

  const updateProfile = async () => {
    setLoading(true);
    await updateDoc(doc(firestore, "users", context.loggedIn?.uid), {
      ...(brandLogo && { brandLogo: brandLogo }),
      ...(sponsorLogo && { sponsorLogo: sponsorLogo }),
      ...(slug && { slug: slug }),
      ...(primaryColor && { primaryColor: primaryColor }),
      ...(accentColor && { accentColor: accentColor }),
      ...(textColor && { textColor: textColor }),
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
            text: "Branding",
            value: "branding",
          },
          // {
          //   text: "Surveys",
          //   value: "surveys",
          // },
          {
            text: "Rewards",
            value: "rewards",
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
            text: "API",
            value: "api",
          },
        ]}
      />
      {nav === "branding" && (
        <>
          <div className="">
            <p className="my-0 text-white/70 text-xs mb-2">
              Playspark Page URL
            </p>
            <div className="bg-white h-10 rounded-full font-mono flex items-center overflow-hidden pl-4 pr-2">
              <p>https://playspark.co/</p>
              <input
                spellcheck="false"
                autocomplete="off"
                type="text"
                value={slug}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(
                    /[^a-z-_]/g,
                    ""
                  );
                  setSlug(sanitizedValue?.toLowerCase());
                }}
                className="outline-none border-b-2 border-b-black/10 w-full mr-6"
              />
            </div>
          </div>

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
          <ColorPicker
            label="Primary Color"
            value={primaryColor}
            onSelect={(a) => {
              setPrimaryColor(a.hex);
            }}
          />

          <ColorPicker
            label="Accent Color"
            value={accentColor}
            onSelect={(a) => {
              setAccentColor(a.hex);
            }}
          />

          <ColorPicker
            label="Text Color"
            value={textColor}
            onSelect={(a) => {
              setTextColor(a.hex);
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
      {nav === "rewards" && (
        <>
          <div className="flex flex-col">
            <p className="text-white/70 text-md">
              Add Rewards To Your Platform
            </p>
            <p className="text-white/50 text-sm mb-4">
              Reward users with perks and offers that they can redeem at the
              point of redemption using a single-use QR code.
            </p>
            <button
              onClick={() => setShowRewardModal(true)}
              className="cursor-pointer w-[200px] h-12 rounded-lg bg-cyan-400 mt-0 flex items-center justify-center"
            >
              Add Reward
            </button>
            <AddRewardModal
              isOpen={showRewardModal}
              onClose={() => setShowRewardModal(false)}
            />
            <GroupedRewards />
          </div>
        </>
      )}
      {nav === "email" && (
        <>
          <p className="text-white/70 text-sm">
            Explore and export email addresses that have been captured through
            PlaySpark. We will soon be launching direct integration into your
            email marketing platforms, such as MailChimp and Klaviyo.
          </p>
          <div className="flex gap-2">
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
      {nav === "api" && <API />}
    </div>
  );
}
