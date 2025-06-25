import { CardDetails, Card } from "@/interfaces/cards";

export const MOCK_CARD_DETAILS: CardDetails = {
  cardNumber: "1234 1234 1234 1234",
  cardHolder: "John Doe",
  expiry: "12/25",
  type: "visa",
};

export const MOCK_CARDS: Card[] = [
  {
    id: "1",
    cardNumber: "1234 1234 1234 1234",
    cardHolder: "John Doe",
    expiry: "12/25",
    cardCompany: "visa",
    isActive: true,
    isFrozen: false,
    balance: 3000.00,
    cardType: "debit"
  },
  {
    id: "2",
    cardNumber: "5678 5678 5678 5678",
    cardHolder: "Sarah Johnson",
    expiry: "10/26",
    cardCompany: "mastercard",
    isActive: false,
    isFrozen: false,
    balance: 1500.00,
    cardType: "debit"
  },
  {
    id: "3",
    cardNumber: "9012 9012 9012 9012",
    cardHolder: "Michael Chen",
    expiry: "08/27",
    cardCompany: "visa",
    isActive: false,
    isFrozen: true,
    balance: 5000.00,
    cardType: "credit"
  }
];