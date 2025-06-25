"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Card, Transaction } from "@/interfaces/cards";
import { MOCK_CARDS } from "@/constants/mocks/cardDetails";
import { CardService } from "@/services/cardService";

// Local storage keys
const CARDS_STORAGE_KEY = "aspire_cards_data";
const TRANSACTIONS_STORAGE_KEY = "aspire_transactions_data";

// State interface
interface CardsState {
  cards: Card[];
  transactions: Record<string, Transaction[]>;
  loading: boolean;
  loadingTransactions: boolean;
  error: string | null;
}

// Action types
type CardsAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "LOAD_CARDS"; payload: { cards: Card[]; } }
  | { type: "ADD_CARD"; payload: { card: Card; isCompany: boolean } }
  | {
      type: "UPDATE_CARD";
      payload: { cardId: string; updates: Partial<Card>; isCompany: boolean };
    }
  | {
      type: "LOAD_TRANSACTIONS";
      payload: { cardId: string; transactions: Transaction[] };
    }
  | {
      type: "ADD_TRANSACTION";
      payload: { cardId: string; transaction: Transaction };
    }
  | { type: "SET_LOADING_TRANSACTIONS"; payload: boolean };

// Initial state
const initialState: CardsState = {
  cards: [],
  transactions: {},
  loading: true,
  loadingTransactions: false,
  error: null,
};

// Reducer function
function cardsReducer(state: CardsState, action: CardsAction): CardsState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_LOADING_TRANSACTIONS":
      return { ...state, loadingTransactions: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "LOAD_CARDS":
      return {
        ...state,
        cards: action.payload.cards,
      };

    case "ADD_CARD":
      if (action.payload.isCompany) {
        return {
          ...state,
          cards: [...state.cards, action.payload.card],
        };
      } else {
        return { ...state, cards: [...state.cards, action.payload.card] };
      }

    case "UPDATE_CARD":
      const { cardId, updates, isCompany } = action.payload;
      if (isCompany) {
        return {
          ...state,
          cards: state.cards.map((card) =>
            card.id === cardId ? { ...card, ...updates } : card
          ),
        };
      } else {
        return {
          ...state,
          cards: state.cards.map((card) =>
            card.id === cardId ? { ...card, ...updates } : card
          ),
        };
      }

    case "LOAD_TRANSACTIONS":
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.payload.cardId]: action.payload.transactions,
        },
      };

    case "ADD_TRANSACTION":
      const existingTransactions =
        state.transactions[action.payload.cardId] || [];
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.payload.cardId]: [
            action.payload.transaction,
            ...existingTransactions,
          ],
        },
      };

    default:
      return state;
  }
}

// Context interface
interface CardsContextType {
  state: CardsState;
  getDebitCards: () => Card[];
  getAllCards: () => Card[];
  addCard: (card: Card, isCompany: boolean) => void;
  updateCard: (
    cardId: string,
    updates: Partial<Card>,
    isCompany: boolean
  ) => void;
  getTransactions: (cardId: string) => Transaction[];
  fetchTransactions: (cardId: string) => Promise<void>;
  addTransaction: (cardId: string, transaction: Transaction) => void;
  getTotalBalance: (cardType: "debit" | "all") => number;
}

// Create context
const CardsContext = createContext<CardsContextType | undefined>(undefined);

// Provider component
interface CardsProviderProps {
  children: ReactNode;
}

export function CardsProvider({ children }: CardsProviderProps) {
  const [state, dispatch] = useReducer(cardsReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    const loadFromStorage = () => {
      try {
        const storedCards = localStorage.getItem(CARDS_STORAGE_KEY);
        if (storedCards) {
          const { cards } = JSON.parse(storedCards);
          if (cards && cards.length > 0) {
            dispatch({ type: "LOAD_CARDS", payload: { cards } });
          } else {
            // If stored cards array is empty, load defaults and save them
            const defaultCards = MOCK_CARDS;
            dispatch({ type: "LOAD_CARDS", payload: { cards: defaultCards } });
            // Explicitly save default cards to localStorage
            localStorage.setItem(
              CARDS_STORAGE_KEY,
              JSON.stringify({ cards: defaultCards })
            );
          }
        } else {
          // No stored data, load defaults and save them
          const defaultCards = MOCK_CARDS;
          dispatch({ type: "LOAD_CARDS", payload: { cards: defaultCards } });
          // Explicitly save default cards to localStorage
          localStorage.setItem(
            CARDS_STORAGE_KEY,
            JSON.stringify({ cards: defaultCards })
          );
        }

        // Load transactions
        const storedTransactions = localStorage.getItem(
          TRANSACTIONS_STORAGE_KEY
        );
        if (storedTransactions) {
          const transactions = JSON.parse(storedTransactions);
          Object.entries(transactions).forEach(([cardId, cardTransactions]) => {
            dispatch({
              type: "LOAD_TRANSACTIONS",
              payload: {
                cardId,
                transactions: cardTransactions as Transaction[],
              },
            });
          });
        }
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to load data from storage",
        });
      }
    };

    // Mocking api call delay, but skip in test
    if (process.env.NODE_ENV === 'test') {
      loadFromStorage();
    } else {
      setTimeout(() => {
        loadFromStorage();
      }, 2000);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    // Only save if cards array is not empty to prevent overwriting with empty data
    if (state.cards.length > 0) {
      try {
        localStorage.setItem(
          CARDS_STORAGE_KEY,
          JSON.stringify({
            cards: state.cards,
          })
        );
      } catch (error) {
        console.error("Error saving cards to localStorage:", error);
      }
    }
  }, [state.cards]);

  useEffect(() => {
    // Only save if transactions object is not empty to prevent overwriting with empty data
    if (Object.keys(state.transactions).length > 0) {
      try {
        localStorage.setItem(
          TRANSACTIONS_STORAGE_KEY,
          JSON.stringify(state.transactions)
        );
      } catch (error) {
        console.error("Error saving transactions to localStorage:", error);
      }
    }
  }, [state.transactions]);

  // Mock API function to fetch transactions
  const fetchTransactions = async (cardId: string): Promise<void> => {
    dispatch({ type: "SET_LOADING_TRANSACTIONS", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      // Check if transactions already exist for this card
      if (state.transactions[cardId]) {
        dispatch({ type: "SET_LOADING_TRANSACTIONS", payload: false });
        return;
      }

      // Fetch transactions from service
      const cardTransactions = await CardService.fetchCardTransactions(cardId);

      dispatch({
        type: "LOAD_TRANSACTIONS",
        payload: { cardId, transactions: cardTransactions },
      });
      dispatch({ type: "SET_LOADING_TRANSACTIONS", payload: false });
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch transactions" });
    } finally {
      dispatch({ type: "SET_LOADING_TRANSACTIONS", payload: false });
    }
  };

  // Helper functions
  const getDebitCards = (): Card[] => {
    return state.cards.filter((card) => card.cardType === "debit");
  };

  const getAllCards = (): Card[] => {
    return state.cards;
  };

  const addCard = (card: Card, isCompany: boolean): void => {
    dispatch({ type: "ADD_CARD", payload: { card, isCompany } });
  };

  const updateCard = (
    cardId: string,
    updates: Partial<Card>,
    isCompany: boolean
  ): void => {
    dispatch({ type: "UPDATE_CARD", payload: { cardId, updates, isCompany } });
  };

  const getTransactions = (cardId: string): Transaction[] => {
    return state.transactions[cardId] || [];
  };

  const addTransaction = (cardId: string, transaction: Transaction): void => {
    dispatch({ type: "ADD_TRANSACTION", payload: { cardId, transaction } });
  };

  const getTotalBalance = (): number => {
    return getAllCards().reduce((sum, card) => sum + card.balance, 0);
  };

  const contextValue: CardsContextType = {
    state,
    getDebitCards,
    getAllCards,
    addCard,
    updateCard,
    getTransactions,
    fetchTransactions,
    addTransaction,
    getTotalBalance,
  };

  return (
    <CardsContext.Provider value={contextValue}>
      {children}
    </CardsContext.Provider>
  );
}

// Custom hook to use the context
export function useCards() {
  const context = useContext(CardsContext);
  if (context === undefined) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
}
