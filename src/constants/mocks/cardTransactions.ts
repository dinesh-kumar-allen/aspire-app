import { Transaction } from "@/interfaces/cards";

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    icon: "/file-storage.svg",
    merchant: "Hamleys",
    date: "20 May 2020",
    amount: "+ S$ 150",
    color: "text-highlight-green",
    iconColor: "bg-accent-blue-light",
    info: "Refund on debit card",
  },
  {
    id: 2,
    icon: "/flights.svg",
    merchant: "Hamleys",
    date: "20 May 2020",
    amount: "- S$ 150",
    iconColor: "bg-accent-green",
    color: "text-black",
    info: "Charged to debit card",
  },
  {
    id: 3,
    icon: "/megaphone.svg",
    merchant: "Hamleys",
    date: "20 May 2020",
    amount: "- S$ 150",
    iconColor: "bg-accent-pink",
    color: "text-black",
    info: "Charged to debit card",
  },
  {
    id: 4,
    icon: "/file-storage.svg",
    merchant: "Hamleys",
    date: "20 May 2020",
    amount: "- S$ 150",
    iconColor: "bg-accent-blue-light",
    color: "text-black",
    info: "Charged to debit card",
  },
  {
    id: 5,
    icon: "/file-storage.svg",
    merchant: "Hamleys",
    date: "20 May 2020",
    amount: "+ S$ 150",
    iconColor: "bg-accent-blue-light",
    color: "text-highlight-green",
    info: "Charged to debit card",
  },
];
