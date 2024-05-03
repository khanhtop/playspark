export const playNotificationSound = () => {
  // Check if window is defined (to ensure we're in the browser environment)
  if (typeof window !== "undefined" && window.Audio) {
    // Create a new Audio object
    const audio = new Audio("/battle/tone.wav");

    // Check if the play method is available before calling it
    if (typeof audio.play === "function") {
      audio.play().catch((error) => {
        // Handle any error silently
        console.error("Error playing notification sound:", error);
      });
    } else {
      console.error(
        "Cannot play notification sound: Audio play method is not supported."
      );
    }
  } else {
    // If window is not defined or Audio is not supported, log a message
    console.error(
      "Cannot play notification sound: window or Audio is not supported."
    );
  }
};

export const playClickSound = (context) => {
  if (!context?.settings?.soundFx) return;
  // Check if window is defined (to ensure we're in the browser environment)
  if (typeof window !== "undefined" && window.Audio) {
    // Create a new Audio object
    const audio = new Audio("/uisounds/click.wav");

    // Check if the play method is available before calling it
    if (typeof audio.play === "function") {
      audio.play().catch((error) => {
        // Handle any error silently
        console.error("Error playing click sound:", error);
      });
    } else {
      console.error(
        "Cannot play notification sound: Audio play method is not supported."
      );
    }
  } else {
    // If window is not defined or Audio is not supported, log a message
    console.error(
      "Cannot play notification sound: window or Audio is not supported."
    );
  }
};
