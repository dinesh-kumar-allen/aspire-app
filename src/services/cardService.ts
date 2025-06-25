import { Transaction } from '@/interfaces/cards';
import { MOCK_TRANSACTIONS } from '@/constants/mocks/cardTransactions';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class CardService {
 
  static async fetchCardTransactions(cardId: string): Promise<Transaction[]> {
    // Simulate API delay
    await delay(1000);
    
    // Generate unique transactions for each card
    const cardTransactions = MOCK_TRANSACTIONS.map((transaction, index) => ({
      ...transaction,
      id: transaction.id || parseInt(cardId) * 100 + index + 1, // Unique ID based on card
      merchant: transaction.merchant,
      date: transaction.date || new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }));
    
    return cardTransactions;
  }
} 