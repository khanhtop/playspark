// Receive Events

import { doc, increment, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export function playEvent(context) {
  allocateXp(context, 30, 3, "New Game Bonus", "playCount");
}

export function loginEvent(context) {
  allocateXp(context, 100, 10, "Login Bonus", "loginCount");
}

export function signupEvent(context) {
  allocateXp(context, 300, 30, "Sign Up Bonus");
}

export function restartEvent(context) {
  allocateXp(context, 30, 3, "Replay Bonus", "playCount");
}

export function scoreEvent(context, score) {
  const coinsBonus = Math.floor((score / 10) * Math.random());
  allocateXp(context, Math.floor(score / 10), coinsBonus, "Score Bonus");
}

export function emailAddedCTA(context) {
  allocateXp(context, 300, 30, "Email Bonus", "emailAdds");
}

export function playableAdFinishedCTA(context) {
  allocateXp(context, 100, 10, "Winning Minigame Bonus", "playableAds");
}

export function surveyResponseCTA(context) {
  allocateXp(context, 200, 20, "Survey Response Bonus", "surveyResponses");
}

export function surveyCompleteCTA(context) {
  allocateXp(context, 100, 10, "Survey Submission Bonus", "surveySubmissions");
}

export function videoSkippedCTA(context) {
  allocateXp(context, 0, 0, "Video Skipped Bonus");
}

export function videoClickedCTA(context) {
  allocateXp(context, 400, 40, "Video Ad Bonus", "videoClicks");
}

export function videoCompletedCTA(context) {
  allocateXp(context, 200, 20, "Video Watched Bonus", "videoCompletions");
}

// Event Ouputs

export async function allocateXp(
  context,
  xp,
  coins,
  eventName,
  incrementCount = null
) {
  if (!context.loggedIn?.uid || xp === 0) return;
  const aO = getAnalyticsObject(context, incrementCount);
  context.setEvent({
    title: `+ ${xp}XP`,
    text: `${eventName}`,
  });
  context.setEvent({
    title: `+ ${coins} Coins`,
    text: `${eventName}`,
  });
  updateAnalytics(context, xp, coins, aO);
}

function getAnalyticsObject(context, keyToIncrement) {
  if (keyToIncrement === null) return null;
  const analyticsObject = context?.profile?.analytics
    ? { ...context.profile.analytics }
    : {};
  analyticsObject[keyToIncrement] = analyticsObject?.[keyToIncrement]
    ? analyticsObject?.[keyToIncrement] + 1
    : 1;
  return analyticsObject;
}

async function updateAnalytics(context, xp, coins, analytics = null) {
  const uid = context?.loggedIn?.uid;
  console.log(uid, xp, analytics);
  await setDoc(
    doc(firestore, "users", uid.toString()),
    {
      totalXp: increment(xp),
      totalCoins: increment(coins),
      ...(analytics && { analytics: analytics }),
    },
    { merge: true }
  );
  return;
}
