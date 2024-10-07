import { useEffect, useState } from "react";
import ModalSkin from "./modalSkin";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/helpers/firebase";
import { Card } from "flowbite-react";

export default function UserModal({ onClose, data, clientId }) {
  const [rewards, setRewards] = useState(null);

  console.log(rewards);

  const fetchRewards = async () => {
    try {
      const rewardsRef = collection(firestore, "users", data.id, "rewards");
      const rewardsQuery = query(rewardsRef, where("ownerId", "==", clientId));
      const querySnapshot = await getDocs(rewardsQuery);

      const rewardsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRewards(rewardsList);
    } catch (error) {
      console.error("Error fetching rewards:", error);
    }
  };
  useEffect(() => {
    if (!rewards) fetchRewards();
  }, []);

  return (
    <ModalSkin onClose={onClose} narrow title={data.companyName}>
      <div className="flex flex-col gap-2">
        {rewards?.map((item, key) => (
          <Card key={key}>
            <div>
              <p>{item.name}</p>
              <p>{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </ModalSkin>
  );
}
