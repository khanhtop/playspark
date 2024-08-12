import Button from "@/components/forms/button";
import { firestore } from "@/helpers/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Redeem({ status, data, id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const redeem = async () => {
    setLoading(true);
    await updateDoc(doc(firestore, "rewards", id), {
      isPurchased: true,
      isRedeemed: true,
    });
    setLoading(false);
    router.reload();
  };

  return (
    <div className="min-h-screen min-w-screen px-4 py-4 flex bg-[#111]">
      {status === "INVALID" ? (
        <div>Item does not exist</div>
      ) : status === "REDEEMED" ? (
        <div className="flex text-white items-center w-full flex-col justify-center flex-1">
          <div className="w-[300px] flex flex-col text-center font-roboto text-xl">
            <div className="text-white">Item Already Redeemed</div>
          </div>
        </div>
      ) : (
        <div className="flex text-white items-center w-full flex-col justify-center flex-1">
          <div className="w-[300px] flex flex-col text-center font-roboto text-xl">
            <p className="text-xl mb-2">
              By clicking 'Redeem' you are agreeing that the redeemer has
              received a {data.name}.
            </p>
            <p className="text-xl mb-6">
              Once redeemed, this reward will no longer be valid.
            </p>
            <Button
              onClick={() => redeem()}
              loading={loading}
              disabled={loading}
            >
              Redeem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { itemId } = context.query;

  const docs = await getDocs(
    query(
      collection(firestore, "rewards"),
      where("ownerId", "==", id),
      where("rewardId", "==", itemId)
    )
  );

  if (docs.docs.filter((a) => !a.isRedeemed)?.length === 0) {
    return {
      props: {
        status: "NOEXIST",
      },
    };
  }

  for (let document of docs.docs) {
    if (!document.data()?.isRedeemed) {
      return {
        props: {
          status: "VALID",
          data: document.data(),
          id: document.id,
        },
      };
    } else {
      return {
        props: {
          status: "REDEEMED",
        },
      };
    }
  }

  return {
    props: {},
  };
}
