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
