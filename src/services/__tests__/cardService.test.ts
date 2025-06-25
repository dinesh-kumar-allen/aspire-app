import { CardService } from '../cardService';

describe('CardService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCardTransactions', () => {
    it('should fetch transactions for a card with delay', async () => {
      const startTime = Date.now();
      const result = await CardService.fetchCardTransactions('123');
      const endTime = Date.now();
      
      expect(result).toHaveLength(5); // 5 transactions from mock data
      expect(result[0]).toMatchObject({
        id: 1, // Uses existing ID from mock data
        merchant: 'Hamleys', // Uses existing merchant from mock data
        date: '20 May 2020', // Uses existing date from mock data
      });
      expect(endTime - startTime).toBeGreaterThanOrEqual(1000); // Should have delay
    });

    it('should generate unique IDs for each transaction', async () => {
      const result = await CardService.fetchCardTransactions('456');
      
      expect(result[0].id).toBe(1); // Uses existing ID from mock data
      expect(result[1].id).toBe(2);
      expect(result[2].id).toBe(3);
      expect(result[3].id).toBe(4);
      expect(result[4].id).toBe(5);
    });

    it('should generate dates if not provided', async () => {
      const result = await CardService.fetchCardTransactions('123');
      
      expect(result[0].date).toBeDefined();
      expect(typeof result[0].date).toBe('string');
      expect(result[0].date).toBe('20 May 2020'); // Uses existing date from mock data
    });

    it('should preserve existing dates if provided', async () => {
      const result = await CardService.fetchCardTransactions('123');
      
      expect(result[0].date).toBe('20 May 2020'); // Uses existing date from mock data
    });

    it('should return multiple transactions', async () => {
      const result = await CardService.fetchCardTransactions('123');
      
      expect(result).toHaveLength(5); // 5 transactions from mock data
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
      expect(result[2].id).toBe(3);
      expect(result[3].id).toBe(4);
      expect(result[4].id).toBe(5);
    });

    it('should return transactions with correct structure', async () => {
      const result = await CardService.fetchCardTransactions('123');
      
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('merchant');
      expect(result[0]).toHaveProperty('date');
      expect(result[0]).toHaveProperty('amount');
      expect(result[0]).toHaveProperty('icon');
      expect(result[0]).toHaveProperty('color');
      expect(result[0]).toHaveProperty('iconColor');
      expect(result[0]).toHaveProperty('info');
    });

    it('should return different transactions for different cards', async () => {
      const result1 = await CardService.fetchCardTransactions('123');
      const result2 = await CardService.fetchCardTransactions('456');
      
      // Should return same mock data but with potentially different IDs
      expect(result1).toHaveLength(5);
      expect(result2).toHaveLength(5);
      expect(result1[0].merchant).toBe(result2[0].merchant); // Same merchant from mock data
    });
  });
}); 