import CryptoJS from "crypto-js";

export function decryptEmail(encryptedEmail, key) {
  // Pad or truncate key to 16 bytes (128 bits)
  const paddedKey = key.padEnd(16, "\0");

  // Convert the key and encrypted email to WordArrays
  const keyWordArray = CryptoJS.enc.Utf8.parse(paddedKey);
  const encryptedEmailWordArray = CryptoJS.enc.Hex.parse(encryptedEmail);

  // Decrypt the email
  const decryptedEmailWordArray = CryptoJS.AES.decrypt(
    { ciphertext: encryptedEmailWordArray },
    keyWordArray,
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: CryptoJS.lib.WordArray.create(16),
    }
  );

  // Convert the decrypted WordArray back to a string
  return decryptedEmailWordArray.toString(CryptoJS.enc.Utf8);
}

export function refactorEmail(emailAddress, platform) {
  if (emailAddress.includes("@")) {
    const split = emailAddress.split("@");
    if (split.length === 2) {
      return [split[0], `+${platform}@`, split[1]].join("");
    }
  }
  return null;
}
