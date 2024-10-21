import { useEffect, useState } from "react";
import ImagePicker from "../forms/imagePicker";
import { useAppContext } from "@/helpers/store";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Usage from "./usage";
import API from "./api";
import { ColorPicker } from "./createTournamentModal";
import FilterPills from "./filterPills";
import { updateDocument } from "@/helpers/firebaseApi";

export default function Account() {
  const context = useAppContext();
  const [nav, setNav] = useState("branding");
  const [loading, setLoading] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  // Image Assets
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState();
  const [brandLogo, setBrandLogo] = useState();
  const [sponsorLogo, setSponsorLogo] = useState();
  const [primaryColor, setPrimaryColor] = useState("#222");
  const [accentColor, setAccentColor] = useState("#06b6d4");
  const [textColor, setTextColor] = useState("#FFF");

  useEffect(() => {
    if (context?.profile?.brandLogo) {
      setBrandLogo(context?.profile?.brandLogo);
    }
    if (context?.profile?.sponsorLogo) {
      setSponsorLogo(context?.profile?.sponsorLogo);
    }
    if (context?.profile?.privacyPolicyUrl) {
      setPrivacyPolicyUrl(context?.profile?.privacyPolicyUrl);
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
    await updateDocument("users", context.loggedIn?.uid, {
      ...(brandLogo && { brandLogo: brandLogo }),
      ...(sponsorLogo && { sponsorLogo: sponsorLogo }),
      ...(privacyPolicyUrl && { privacyPolicyUrl: privacyPolicyUrl }),
      ...(primaryColor && { primaryColor: primaryColor }),
      ...(accentColor && { accentColor: accentColor }),
      ...(textColor && { textColor: textColor }),
    });
    // await updateDoc(doc(firestore, "users", context.loggedIn?.uid), {
    //   ...(brandLogo && { brandLogo: brandLogo }),
    //   ...(sponsorLogo && { sponsorLogo: sponsorLogo }),
    //   ...(privacyPolicyUrl && { privacyPolicyUrl: privacyPolicyUrl }),
    //   ...(primaryColor && { primaryColor: primaryColor }),
    //   ...(accentColor && { accentColor: accentColor }),
    //   ...(textColor && { textColor: textColor }),
    // });
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      <FilterPills
        selected={nav}
        onSelect={(item) => setNav(item)}
        options={[
          {
            text: "Branding",
            value: "branding",
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
            <p className="my-0 text-black/70 text-xs mb-2">
              Privacy Policy URL
            </p>
            <div className="flex items-center gap-2">
              <div>
                <p>https://</p>
              </div>
              <input
                spellcheck="false"
                autocomplete="off"
                type="text"
                value={privacyPolicyUrl}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.trim();
                  setPrivacyPolicyUrl(sanitizedValue?.toLowerCase());
                }}
                className="border-2 border-b-black/90 w-full mr-6 rounded-md"
              />
            </div>
          </div>

          <ImagePicker
            darkTheme
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
            darkTheme
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

      {nav === "usage" && (
        <>
          <Usage />
        </>
      )}
      {nav === "api" && <API />}
    </div>
  );
}
