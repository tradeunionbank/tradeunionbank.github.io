import { defaultTransactions } from "./defaultTransactions";

const choiTransactions = [
  {
    id: "TRX-20260222-01",
    name: "Global endorsement payout",
    description: "Payout from a major brand endorsement agreement.",
    amount: "+ USD 385,000",
    currency: "USD",
    time: "2026-02-22 10:14:27",
    color: "blue",
    type: "credit",
    status: "Completed",
  },
  {
    id: "TRX-20260219-01",
    name: "Private collection purchase",
    description: "Acquired a private art and memorabilia collection.",
    amount: "- USD 238,500",
    currency: "USD",
    time: "2026-02-19 14:05:11",
    color: "red",
    type: "debit",
    status: "Completed",
  },
  {
    id: "TRX-20260215-01",
    name: "Film rights royalty",
    description: "Royalty credit from international film rights.",
    amount: "+ USD 510,000",
    currency: "USD",
    time: "2026-02-15 08:55:30",
    color: "blue",
    type: "credit",
    status: "Completed",
  },
  {
    id: "TRX-20260211-01",
    name: "Concierge security services",
    description: "Private security and travel concierge services.",
    amount: "- USD 85,000",
    currency: "USD",
    time: "2026-02-11 16:32:44",
    color: "red",
    type: "debit",
    status: "Completed",
  },
  {
    id: "TRX-20260205-01",
    name: "Art donation pledge",
    description: "Donation pledge to a cultural heritage foundation.",
    amount: "- USD 300,000",
    currency: "USD",
    time: "2026-02-05 12:10:22",
    color: "red",
    type: "debit",
    status: "Completed",
  },
  {
    id: "TRX-20260129-01",
    name: "Brand ambassador fee",
    description: "Completed brand ambassador fee from a luxury partner.",
    amount: "+ USD 720,000",
    currency: "USD",
    time: "2026-01-29 11:17:09",
    color: "blue",
    type: "credit",
    status: "Completed",
  },
  {
    id: "TRX-20260122-01",
    name: "Luxury suite booking",
    description: "Private luxury suite booking for international travel.",
    amount: "- USD 95,000",
    currency: "USD",
    time: "2026-01-22 09:48:33",
    color: "red",
    type: "debit",
    status: "Completed",
  },
  {
    id: "TRX-20260112-01",
    name: "Boutique investment credit",
    description: "Credit from boutique investment proceeds.",
    amount: "+ USD 415,000",
    currency: "USD",
    time: "2026-01-12 15:05:56",
    color: "blue",
    type: "credit",
    status: "Completed",
  },
  {
    id: "TRX-20260107-01",
    name: "Travel concierge charge",
    description: "Charge for premium travel concierge services.",
    amount: "- USD 42,500",
    currency: "USD",
    time: "2026-01-07 18:24:11",
    color: "red",
    type: "debit",
    status: "Completed",
  },
  {
    id: "TRX-20251228-01",
    name: "Seasonal gala sponsorship",
    description: "Sponsorship credit from a year-end gala event.",
    amount: "+ USD 155,000",
    currency: "USD",
    time: "2025-12-28 13:09:07",
    color: "blue",
    type: "credit",
    status: "Completed",
  },
];

export const users = {
  "jichangwook@pacifichorizon": {
    username: "jichangwook@pacifichorizon",
    password: "chang-wook8231!",
    name: "Ji Chang-Wook",
    initials: "JC",
    email: "lordismyhelp@gmail.com",
    phone: "+1 (626) 553-2427",
    address: "120 Pacific Ridge Drive, Los Angeles, CA",
    memberSince: "June 2022",
    accountNumber: "**** **** **** 7265",
    accountType: "Premier Checking",
    relationshipManager: "Mia Caldwell",
    branch: "Pacific Horizon Private Bank",
    rewardsStatus: "Platinum Elite",
    passportStatus: "Verified",
    defaultBalance: 83589202.68,
    transactions: defaultTransactions.map((tx) => ({ ...tx })),
  },
  "choiseunghyun@pacifichorizon": {
    username: "choiseunghyun@pacifichorizon",
    password: "t.o.p.b.i.g.pacific",
    name: "Choi Seung-Hyun",
    initials: "CS",
    email: "top@pacifichorizonbank.com",
    phone: "+82 10-1234-5678",
    address: "99 Seoul Avenue, Gangnam-gu, Seoul, South Korea",
    memberSince: "April 2023",
    accountNumber: "**** **** **** 8998",
    accountType: "Global Premier",
    relationshipManager: "Dae-Hyun Park",
    branch: "Pacific Horizon Seoul Private Bank",
    rewardsStatus: "Diamond",
    passportStatus: "Verified",
    defaultBalance: 3820765.63,
    transactions: choiTransactions,
  },
};

// List of restricted account usernames
export const restrictedAccounts = [
  "jichangwook@pacifichorizon"
];

export const isAccountRestricted = (username) => {
  if (!username) return false;
  return restrictedAccounts.includes(username.trim().toLowerCase());
};

export const getUser = (username) => {
  if (!username) return null;
  return users[username.trim().toLowerCase()] || null;
};
