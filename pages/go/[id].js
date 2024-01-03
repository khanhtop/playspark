import { firestore } from "@/helpers/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export default function PageHandler({ user, tournaments }) {
  return (
    <div>
      {JSON.stringify(user)} {JSON.stringify(tournaments)}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const usersRef = query(
      collection(firestore, "users"),
      where("slug", "==", id)
    );
    const querySnapshot = await getDocs(usersRef);
    const userDoc = querySnapshot.docs[0];
    if (userDoc) {
      const userData = { id: userDoc.id, ...userDoc.data() };
      const tournamentsRef = query(
        collection(firestore, "tournaments"),
        where("ownerId", "==", userDoc.id)
      );
      const tournamentsSnapshot = await getDocs(tournamentsRef);
      const tournamentsData = tournamentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return {
        props: {
          user: userData,
          tournaments: tournamentsData,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return {
      props: {
        user: null,
      },
    };
  }
}
