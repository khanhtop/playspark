function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function createFingerprint() {
  const navigatorInfo = window.navigator;
  const screenInfo = window.screen;
  const fingerprint = [
    navigatorInfo.userAgent,
    navigatorInfo.language,
    screenInfo.colorDepth,
    new Date().getTimezoneOffset(),
    navigatorInfo.platform,
    navigatorInfo.doNotTrack,
    screenInfo.height,
    screenInfo.width,
  ].join("");
  return fingerprint;
}

export function getDeviceID() {
  let deviceID = localStorage.getItem("deviceID");
  if (!deviceID) {
    const fingerprint = createFingerprint();
    const uuid = generateUUID();
    deviceID = `${fingerprint}-${uuid}`;
    localStorage.setItem("deviceID", deviceID);
  }
  return deviceID;
}
