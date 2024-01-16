import AuthModal from "@/components/auth/authModal";
import Areas from "@/components/clientPages/areas";
import Hero from "@/components/clientPages/hero";
import HorizontalGamesScroll from "@/components/clientPages/horizontalGamesScroll";
import TopNav from "@/components/clientPages/topnav";
import UIButton from "@/components/ui/button";
import { firestore } from "@/helpers/firebase";
import {
  computeAggregateLeaderboard,
  computeTotalScore,
} from "@/helpers/leaderboard";
import { useAppContext } from "@/helpers/store";
import {
  query,
  collection,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function PageHandler({
  user,
  tournaments,
  tournamentsByPlayCount,
  tournamentsByDate,
  leaderboard,
}) {
  const context = useAppContext();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  // const [totalScore, setTotalScore] = useState(0);
  // const [aggregateLeaderboard, setAggregateLeaderboard] = useState([]);
  console.log(leaderboard);

  // useEffect(() => {
  //   if (!context?.loggedIn?.uid) return;
  //   const _score = computeTotalScore(tournaments, user?.id);
  //   setTotalScore(_score);
  // }, [context.loggedIn?.uid]);

  // useMemo(() => {
  //   if (!totalScore) return;
  //   router.replace(router.asPath);
  //   const aggregate = computeAggregateLeaderboard(
  //     tournaments,
  //     context?.loggedIn?.uid
  //   );
  //   setAggregateLeaderboard(aggregate);
  // }, [totalScore]);

  user = {
    ...user,
    primaryColor: user.primaryColor ?? "#222",
    accentColor: user.accentColor ?? "#00DDFF",
    textColor: user.textColor ?? "#FFF",
  };

  return (
    <>
      <div className="min-h-screen">
        <TopNav
          data={user}
          context={context}
          totalScore={context?.profile?.totalScore || 0}
          totalXp={context?.profile?.totalXp || 0}
          showLogin={() => setShowLogin(true)}
        />
        <Hero
          data={user}
          context={context}
          totalXp={context?.profile?.totalXp || 0}
        />
        <HorizontalGamesScroll
          data={tournamentsByPlayCount}
          user={user}
          label="Trending Now"
        />
        <HorizontalGamesScroll
          data={tournamentsByDate}
          user={user}
          label="Latest"
        />
        <Areas
          aggregateLeaderboard={leaderboard}
          user={user}
          tournaments={tournaments}
        />
      </div>
      {showLogin && (
        <AuthModal user={user} closeModal={() => setShowLogin(false)} />
      )}
    </>

    // <div className="bg-black text-white font-titan">

    //   <div className="h-[calc(100vh-20vh)] w-screen p-4 flex flex-col items-center justify-center gap-4">
    //     {user?.brandLogo && (
    //       <img src={user.brandLogo} className="max-w-[400px]" />
    //     )}
    //     <h1 className="text-3xl">{user.companyName}</h1>
    //   </div>
    //   <div>
    //     <div className="flex flex-col items-center justify-center">
    //       <h1 className="text-3xl">Compete In Tournaments!</h1>
    //     </div>
    //     <div className="w-screen grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 py-8 bg-black text-regular">
    //       {tournaments
    //         ?.filter((a) => a.isActive)
    //         ?.map((item, key) => (
    //           <Game item={item} />
    //         ))}
    //     </div>
    //   </div>
    //   <div className="h-72 bg-[#111]"></div>
    // </div>
  );
}

function Game({ item }) {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const highScorer = item.leaderboard?.sort((a, b) => a - b)?.[0];
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="rounded-xl overflow-hidden relative group"
    >
      <img
        style={{
          opacity: hover ? 0.2 : 1,
          transition: "0.5s all",
        }}
        src={item.backgroundImage}
        className="w-full"
      />
      <div
        style={{
          bottom: hover ? 0 : -250,
          height: 250,
          transition: "0.5s all",
        }}
        className="text-black px-4 text-center gap-2 absolute transition w-full bg-white bottom-0 rounded-t-2xl flex flex-col items-center py-8"
      >
        <p className="flex-1 font-octo">{item.description}</p>
        {highScorer && (
          <p className="font-octo">
            Top Scorer: {highScorer?.name} ({highScorer?.score})
          </p>
        )}
        <UIButton
          onClick={() =>
            window.open(
              `https://playspark.co/ad/${item.tournamentId}`,
              "__blank"
            )
          }
          theme="pixel"
          primaryColor={item.primaryColor}
          textColor={item.textColor}
          text="Play"
          className=""
        />
      </div>
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

      const tournamentsByPlayCount = tournamentsData
        ? [...tournamentsData]
            .sort((a, b) => {
              const playCountA = a.freemiumPlayCount || 0;
              const playCountB = b.freemiumPlayCount || 0;
              return playCountB - playCountA;
            })
            .slice(0, 5)
        : [];

      const tournamentsByDate = tournamentsData
        ? [...tournamentsData]
            .sort((a, b) => {
              const dateB = a.timestamp || 0;
              const dateA = b.timestamp || 0;
              return dateB - dateA;
            })
            .slice(0, 5)
        : [];

      const leaderboardRef = query(
        collection(firestore, "users"),
        where("memberOf", "==", userDoc.id),
        orderBy("totalScore", "desc"),
        limit(10)
      );
      const leaderboardSnapshot = await getDocs(leaderboardRef);
      const leaderboard = leaderboardSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      return {
        props: {
          user: userData,
          tournaments: tournamentsData,
          tournamentsByPlayCount: tournamentsByPlayCount,
          tournamentsByDate: tournamentsByDate,
          leaderboard: leaderboard,
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
