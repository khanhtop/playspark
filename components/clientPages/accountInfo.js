import { useAppContext } from "@/helpers/store";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import AvatarModal from "./avatarModal";

export default function AccountInfo({
  data,
  user,
  totalXp,
  totalCoins,
  vertical,
  avatars,
}) {
  const context = useAppContext();
  const [name, setName] = useState(context?.profile?.companyName);
  const [avatar, setAvatar] = useState(context?.profile?.profilePhoto);
  const [loading, setLoading] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const updateProfile = () => {
    if (name) {
      setDocument("users", context?.loggedIn?.uid, { companyName: name });
    }
  };

  useEffect(() => {
    // context.fetchAvatars();
    if (context.profile) {
      setName(context?.profile?.companyName);
    }
    if (context?.profile?.profilePhoto) {
      setAvatar(context?.profile?.profilePhoto);
    }
  }, [context.profile]);

  const changeImage = async (av) => {
    setDocument("users", context?.loggedIn?.uid, { profilePhoto: av });
  };

  if (context.loggedIn?.uid)
    return (
      <div
        style={{ color: data.textColor }}
        className={`flex ${
          vertical ? "flex-col gap-4" : "flex-row"
        } px-4 py-8 font-octo items-center`}
      >
        <div
          className={`px-2 flex flex-col ${
            vertical ? "md:flex-col items-center" : "md:flex-row items-start"
          } gap-2 md:gap-4 flex-1 justify-center md:justify-start  md:items-center`}
        >
          <div className="flex items-center gap-2">
            {/* {vertical && (
              <ChevronLeftIcon
                onClick={() => changeImage(true)}
                className="cursor-pointer h-12 w-12 text-[#999] hover:text-black transition"
              />
            )} */}
            <div
              src={context?.profile?.profilePhoto}
              style={{ borderColor: data.accentColor }}
              className={`h-[120px] md:h-[120px] border-4 overflow-hidden aspect-square flex ${
                vertical
                  ? "items-center justify-center"
                  : "items-center justify-center"
              } rounded-full`}
            >
              <img
                onClick={() => setShowAvatarModal(true)}
                src={avatar}
                className="h-full w-full object-cover scale-110 hover:opacity-90 transition cursor-pointer"
              />
            </div>
            {/* {vertical && (
              <ChevronRightIcon
                onClick={() => changeImage()}
                className="cursor-pointer h-12 w-12 text-[#999] hover:text-black transition"
              />
            )} */}
          </div>
          <EditableNameBox
            data={data}
            value={name}
            onChange={(a) => setName(a)}
            onBlur={() => updateProfile()}
          />
          {/* <p className="font-octo md:text-2xl text-center uppercase">
            {user?.companyName || "Anonymous"}
          </p> */}
        </div>
        <div className="flex">
          <ParameterBox
            title="XP"
            value={totalXp}
            image="/clientPages/xp.png"
          />
          <ParameterBox
            title="Coins"
            value={totalCoins}
            image="/clientPages/coins.png"
          />
        </div>
        <AvatarModal
          show={showAvatarModal}
          close={() => setShowAvatarModal(false)}
          avatars={context.avatars}
          currentAvatar={context?.profile?.profilePhoto}
          onSelect={(img) => changeImage(img)}
        />
      </div>
    );
}

function ParameterBox({ image, title, value, item }) {
  return (
    <div className="flex items-center gap-2 ml-6">
      <img src={image} className="h-10 md:h-16" />
      <div>
        <p className="md:text-lg opacity-70">{title}</p>
        <p className="md:text-2xl">{value}</p>
      </div>
    </div>
  );
}

function EditableNameBox({ data, value, onChange, onBlur }) {
  return (
    <div className="relative">
      <input
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Name"
        style={{ borderColor: data.accentColor, color: "black" }}
        className="h-8 px-2 rounded-xl w-36 border-2 relative"
        defaultValue={value}
      ></input>
      <PencilIcon
        style={{ backgroundColor: data.accentColor, color: data.primaryColor }}
        className="absolute h-6 w-6 -top-2 -right-2  p-[5px] rounded-full"
      />
    </div>
  );
}
