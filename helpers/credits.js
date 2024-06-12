import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";

// Variable Amounts
export const shutoffBalance = -100;
const zeroBalance = 0;
const warningBalance = 100;

export const getGameCreditConsumption = (tier) => {
  if (!tier) return 1;
  const tiers = [0.5, 1, 2];
  return tiers[tier - 1];
};

export async function deductCredits(clientId, openingCredits, deductCredits) {
  // Closing Credits
  const closingCredits = openingCredits - deductCredits;

  if (openingCredits < shutoffBalance) {
    return {
      message: "SHUTOFF",
      openingCredits: openingCredits,
      closingCredits: openingCredits,
    };
  }

  await applyDeduction(clientId, closingCredits);

  // If deduction puts client past shut off zone
  if (openingCredits >= shutoffBalance && closingCredits < shutoffBalance) {
    // EMAIL THEM HERE ABOUT SHUTOFF
    return {
      message: "SHUTOFF",
      openingCredits: openingCredits,
      closingCredits: closingCredits,
    };
  }

  if (openingCredits >= zeroBalance && closingCredits < zeroBalance) {
    // EMAIL THEM HERE ABOUT ZERO BALANCE
    return {
      message: "BELOWZERO",
      openingCredits: openingCredits,
      closingCredits: closingCredits,
    };
  }

  if (openingCredits >= warningBalance && closingCredits < warningBalance) {
    // EMAIL THEM HERE WITH WARNING
    return {
      message: "WARNING",
      openingCredits: openingCredits,
      closingCredits: closingCredits,
    };
  }

  return {
    message: "OK",
    openingCredits: openingCredits,
    closingCredits: closingCredits,
  };
}

async function applyDeduction(clientId, closingCredits) {
  await updateDoc(doc(firestore, "users", clientId), {
    creditBalance: closingCredits,
  });
}
