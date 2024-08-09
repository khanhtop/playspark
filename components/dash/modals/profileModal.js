import GameButton from "@/components/uiv2/gameButton";
import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import {
  ArrowLeftCircleIcon,
  ArrowPathIcon,
  ArrowRightCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ProfileModal({ data }) {
  const context = useAppContext();
  const [avatar, setAvatar] = useState(context?.profile?.profilePhoto);
  const [loadingLeft, setLoadingLeft] = useState(false);
  const [loadingRight, setLoadingRight] = useState(false);

  useEffect(() => {
    context.fetchAvatars();
  }, []);

  const changeImage = async (isRight = false) => {
    if (loadingLeft || loadingRight) return;
    const method = isRight ? setLoadingRight : setLoadingLeft;
    method(true);
    const av =
      context.avatars[Math.floor(Math.random() * context.avatars.length)];
    setAvatar(av);
    await setDoc(
      doc(firestore, "users", context?.loggedIn?.uid),
      {
        profilePhoto: av,
      },
      { merge: true }
    );
    method(false);
  };

  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4 h-full overflow-y-scroll">
      <div className="flex h-36 items-center">
        {loadingLeft ? (
          <ArrowPathIcon className="h-8 animate-spin" />
        ) : (
          <ArrowLeftCircleIcon
            className="h-8"
            onClick={() => {
              changeImage();
            }}
          />
        )}
        <div className="flex-1 flex justify-center h-full">
          <div className="relative w-36 h-36 overflow-hidden rounded-lg">
            <img src={avatar} className="h-full" />
          </div>
        </div>
        {loadingRight ? (
          <ArrowPathIcon className="h-8 animate-spin" />
        ) : (
          <ArrowRightCircleIcon
            className="h-8"
            onClick={() => {
              changeImage(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
