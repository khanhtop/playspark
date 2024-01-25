// Receive Events

export function playEvent(context) {
  allocateXp(context, 30, "App Open");
}

export function loginEvent(context) {
  allocateXp(context, 10, "Login");
}

export function reviveEvent(context) {
  allocateXp(context, 0, "Revive");
}

export function restartEvent(context) {
  allocateXp(context, 0, "Restart");
}

export function scoreEvent(context, score) {
  allocateXp(context, Math.floor(score / 10), "Score");
}

export function emailAddedCTA(context) {
  allocateXp(context, 300, "Email Added");
}

export function playableAdFinishedCTA(context) {
  allocateXp(context, 100, "Playable Ad");
}

export function surveyResponseCTA(context) {
  allocateXp(context, 200, "Survey Response");
}

export function surveyCompleteCTA(context) {
  allocateXp(context, 100, "Survey Submission");
}

export function videoSkippedCTA(context) {
  allocateXp(context, 0, "Video Skipped");
}

export function videoClickedCTA(context) {
  allocateXp(context, 400, "Video Clicked");
}

export function videoCompletedCTA(context) {
  allocateXp(context, 200, "Video Completed");
}

// Event Ouputs

export function allocateXp(context, xp, eventName, incrementCount = null) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: `+ ${xp}XP`,
    text: `${eventName} Event`,
  });
}
