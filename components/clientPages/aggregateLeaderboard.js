import { useState } from "react";
import UserModal from "./userModal";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";
import { calculateLevel } from "@/helpers/xp";

export default function AggregateLeaderboard({
  lb,
  user,
  tournaments,
  totalXp,
}) {
  const context = useAppContext();
  const [showModal, setShowModal] = useState();

  return (
    <div className="w-full flex flex-col gap-2">
      {lb
        ?.filter((z) => z.currentXp !== 0)
        ?.sort((a, b) => b.currentXp - a.currentXp)
        ?.slice(0, 10)
        ?.map((item, key) => (
          <Rank
            showModal={(a) => {
              setShowModal({ ...a, client: user });
            }}
            user={user}
            item={item}
            myId={context?.loggedIn?.uid}
            key={key}
            pos={key + 1}
          />
        ))}
      <UserModal
        tournaments={tournaments}
        userData={showModal}
        onClose={() => setShowModal()}
        totalXp={totalXp}
      />
    </div>
  );
}

function Rank({ item, pos, user, showModal, myId }) {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    showModal(item);
    console.log(item);
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        item.mine ? "bg-white/20" : "bg-white/5"
      } w-full h-16 group cursor-pointer font-octo text-2xl px-8 flex items-center gap-2`}
    >
      <div
        style={{ borderColor: user?.accentColor }}
        className={`group-hover:opacity-100 opacity-50 border-2 rounded-full h-10 w-10 flex items-center justify-center`}
      >
        <p>{pos}</p>
      </div>
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <img src={item.profilePhoto} className="scale-110" />
      </div>

      <div className="flex-1">
        <p className="opacity-50 group-hover:opacity-100 text-lg">
          {item.companyName || "No Name"} {item.id === myId && "(Me)"}
        </p>
      </div>
      <div className="flex gap-2">
        <img
          src={`/level-badges/${calculateLevel(item.currentXp) + 8}.png`}
          className="h-8"
        />
        {/* <p>{calculateLevel(item.currentXp)}</p> */}
      </div>
      <div className="flex gap-2 items-center">
        <img src="/clientPages/xp.png" className="h-8" />
        <p className="min-w-[30px] text-lg">{item.currentXp}</p>
      </div>
    </div>
  );
}
