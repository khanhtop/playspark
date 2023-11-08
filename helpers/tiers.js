const tiers = [
  {
    name: "Free",
    price: 0,
    basicCap: 0,
    premiumCap: 0,
    brandedContent: false,
    analyticsTier: 0,
  },
  {
    name: "Premium",
    price: 50,
    basicCap: 10000,
    premiumCap: 0,
    brandedContent: false,
    analyticsTier: 0,
  },
  {
    name: "Elite",
    price: 199,
    basicCap: Infinity,
    premiumCap: 5000,
    brandedContent: true,
    analyticsTier: 1,
  },
  {
    name: "Ultimate",
    price: 499,
    basicPricePerPlay: 0,
    premiumCap: 50000,
    brandedContent: true,
    analyticsTier: 2,
  },
  {
    name: "Pay As You Go",
    isPayg: true,
  },
];

export const getSubscriptionType = (tier) => tiers[tier];
