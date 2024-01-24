export function loginEvent(context) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: "Event",
    text: "Login Event",
  });
}

export function reviveEvent(context) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: "Event",
    text: "Revive Event",
  });
}

export function restartEvent(context) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: "Event",
    text: "Restart Event",
  });
}

export function scoreEvent(context, score) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: "Event",
    text: `Score Event ${score}`,
  });
}

export function emailAddedCTA(context) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: "Event",
    text: `Email Added Event`,
  });
}

export function playableAdFinishedCTA(context) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: "Event",
    text: `Playable Ad Event`,
  });
}

export function surveyResponseCTA(context) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: "Event",
    text: `Survey Response Event`,
  });
}

export function surveyCompleteCTA(context) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: "Event",
    text: `Survey Complete Event`,
  });
}

export function videoSkippedCTA(context) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: "Event",
    text: `Video Skipped Event`,
  });
}

export function videoClickedCTA(context) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: "Event",
    text: `Video CTA Clicked Event`,
  });
}

export function videoCompletedCTA(context) {
  if (!context.loggedIn?.uid) return;
  context.setEvent({
    title: "Event",
    text: `Video Completed Event`,
  });
}
