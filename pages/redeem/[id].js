import { firestore } from "@/helpers/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Redeem({ status, data }) {
  return (
    <div className="min-h-screen min-w-screen px-4 py-4">
      {status === "INVALID" ? (
        <div>Item does not exist</div>
      ) : status === "REDEEMED" ? (
        <div>Item Already Redeemed</div>
      ) : (
        <div>
          <p>Redeem Reward?</p>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { itemId } = context.query;
  console.log(id, itemId);

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
