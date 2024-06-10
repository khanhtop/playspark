import { useState } from "react";
import ImagePicker from "../forms/imagePicker";
import { useAppContext } from "@/helpers/store";
import { doc, updateDoc } from "firebase/firestore";
import { firestore, logout } from "@/helpers/firebase";
import Button from "../forms/button";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Input from "../forms/input";

export default function Profile() {
  const context = useAppContext();
  const [profile, setProfile] = useState({ ...context.profile });
  const [loading, setLoading] = useState(false);

  const updateProfile = async () => {
    setLoading(true);
    await updateDoc(doc(firestore, "users", context.loggedIn?.uid), profile);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={profile.companyName}
        labelColor="text-white"
        onChange={(e) =>
          setProfile({ ...profile, companyName: e.target.value })
        }
        label="Company Name"
      />
      <Input
        value={profile.sportzfanSlug}
        labelColor="text-white"
        onChange={(e) =>
          setProfile({ ...profile, sportzfanSlug: e.target.value })
        }
        label="Sportzfan Platform URL (Lowercase and No Spaces)"
      />
      <Input
        value={profile.creditBalance}
        type="number"
        labelColor="text-white"
        onChange={(e) =>
          setProfile({ ...profile, creditBalance: parseInt(e.target.value) })
        }
        label="Credits --- MUST REMOVE LATER AFTER TESTING"
      />
      <ImagePicker
        width={100}
        height={100}
        label="Profile Photo"
        image={profile?.profilePhoto}
        onChange={(url) => {
          setProfile({ ...profile, profilePhoto: url });
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
      <button
        onClick={() => logout()}
        className="cursor-pointer w-[200px] h-12 rounded-lg bg-cyan-400 mt-0 flex items-center justify-center"
      >
        Logout
      </button>
    </div>
  );
}
