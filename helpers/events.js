// Receive Events

import { doc, increment, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { sendSupabaseEvent } from "./analytics";

export function playEvent(context, data) {
  allocateXp(context, 30, 3, "New Game Bonus", "playCount", data.ownerId);
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "play_game"
  );
}

export function loginEvent(context, data) {
  allocateXp(context, 100, 10, "Login Bonus", "loginCount", data.ownerId);
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "login"
  );
}

export function signupEvent(context, data) {
  allocateXp(context, 300, 30, "Sign Up Bonus", data.ownerId);
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "sign_up"
  );
}

export function restartEvent(context, data) {
  allocateXp(context, 30, 3, "Replay Bonus", "playCount", data.ownerId);
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "restart_game"
  );
}

export function scoreEvent(context, score, data) {
  const coinsBonus = Math.floor((score / 10) * Math.random());
  allocateXp(
    context,
    Math.floor(score / 10),
    coinsBonus,
    "Score Bonus",
    null,
    data.ownerId
  );
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "scored_points"
  );
}

export function emailAddedCTA(context, data) {
  allocateXp(context, 300, 30, "Email Bonus", "emailAdds", data.ownerId);
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "email_added"
  );
}

export function playableAdFinishedCTA(context, data) {
  allocateXp(
    context,
    100,
    10,
    "Winning Minigame Bonus",
    "playableAds",
    data.ownerId
  );
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "watched_playable_ad"
  );
}

export function surveyResponseCTA(context, data) {
  allocateXp(
    context,
    200,
    20,
    "Survey Response Bonus",
    "surveyResponses",
    data.ownerId
  );
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "survey_response"
  );
}

export function surveyCompleteCTA(context, data) {
  allocateXp(
    context,
    100,
    10,
    "Survey Submission Bonus",
    "surveySubmissions",
    data.ownerId
  );
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "survey_completion"
  );
}

export function videoSkippedCTA(context, data) {
  allocateXp(context, 0, 0, "Video Skipped Bonus", data.ownerId);
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "video_skipped"
  );
}

export function videoClickedCTA(context, data) {
  allocateXp(context, 400, 40, "Video Ad Bonus", "videoClicks", data.ownerId);
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "video_clicked"
  );
}

export function videoCompletedCTA(context, data) {
  allocateXp(
    context,
    200,
    20,
    "Video Watched Bonus",
    "videoCompletions",
    data.ownerId
  );
  sendSupabaseEvent(
    context?.loggedIn?.uid,
    data.ownerId,
    data.tournamentId,
    "video_watched"
  );
}

// Event Ouputs

export async function allocateXp(
  context,
  xp,
  coins,
  eventName,
  incrementCount = null,
  ownerId = null
) {
  if (!context.loggedIn?.uid || xp === 0) return;
  context.setEvent({
    title: `+ ${xp}XP`,
    text: `${eventName}`,
  });
  context.setEvent({
    title: `+ ${coins} Coins`,
    text: `${eventName}`,
  });
  const aO = getAnalyticsObject(context, incrementCount);
  updateAnalytics(context, xp, coins, aO, ownerId);
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

function getDataByOwner(dataArray, ownerId, xp, coins) {
  const da = { ...dataArray };
  const elem = { ...da[ownerId] };
  elem["xp"] = (elem["xp"] || 0) + xp;
  elem["coins"] = (elem["coins"] || 0) + coins;
  const output = { ...da, [ownerId]: elem };
  return output;
}

async function updateAnalytics(
  context,
  xp,
  coins,
  analytics = null,
  ownerId = null
) {
  const uid = context?.loggedIn?.uid;
  const dataArray = getDataByOwner(
    context?.profile?.dataByClient,
    ownerId,
    xp,
    coins
  );
  await setDoc(
    doc(firestore, "users", uid.toString()),
    {
      totalXp: increment(xp),
      totalCoins: increment(coins),
      ...(analytics && { analytics: analytics }),
      dataByClient: {
        [ownerId]: {
          coins: increment(coins),
          xp: increment(xp),
        },
      },
    },
    { merge: true }
  );
  return;
}
