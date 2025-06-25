import {
  maskCardNumber,
  formatCardNumber,
  generateCardNumber,
  generateExpiryDate,
  generateCardCompany,
} from '../cardUtils';

describe('cardUtils', () => {
  describe('maskCardNumber', () => {
    it('should mask card number with bullets', () => {
      const cardNumber = '1234567890123456';
      const result = maskCardNumber(cardNumber);
      expect(result).toBe('•••• •••• •••• 3456');
    });

    it('should handle card number with spaces', () => {
      const cardNumber = '1234 5678 9012 3456';
      const result = maskCardNumber(cardNumber);
      expect(result).toBe('•••• •••• •••• 3456');
    });

    it('should handle empty string', () => {
      const result = maskCardNumber('');
      expect(result).toBe('');
    });

    it('should handle short card number', () => {
      const cardNumber = '1234';
      const result = maskCardNumber(cardNumber);
      expect(result).toBe('1234');
    });
  });

  describe('formatCardNumber', () => {
    it('should format card number with spaces', () => {
      const cardNumber = '1234567890123456';
      const result = formatCardNumber(cardNumber);
      expect(result).toBe('1234 5678 9012 3456');
    });

    it('should handle card number with existing spaces', () => {
      const cardNumber = '1234 5678 9012 3456';
      const result = formatCardNumber(cardNumber);
      expect(result).toBe('1234 5678 9012 3456');
    });

    it('should handle empty string', () => {
      const result = formatCardNumber('');
      expect(result).toBe('');
    });

    it('should handle short card number', () => {
      const cardNumber = '1234';
      const result = formatCardNumber(cardNumber);
      expect(result).toBe('1234');
    });
  });

  describe('generateCardNumber', () => {
    it('should generate a 16-digit card number', () => {
      const result = generateCardNumber();
      expect(result).toHaveLength(16);
      expect(result).toMatch(/^\d{16}$/);
    });

    it('should generate different numbers on multiple calls', () => {
      const result1 = generateCardNumber();
      const result2 = generateCardNumber();
      expect(result1).not.toBe(result2);
    });
  });

  describe('generateExpiryDate', () => {
    it('should generate expiry date in MM/YY format', () => {
      const result = generateExpiryDate();
      expect(result).toMatch(/^\d{2}\/\d{2}$/);
    });

    it('should generate future expiry date', () => {
      const currentYear = new Date().getFullYear();
      const result = generateExpiryDate();
      const [, year] = result.split('/');
      const expiryYear = parseInt(`20${year}`);
      expect(expiryYear).toBeGreaterThanOrEqual(currentYear);
    });

    it('should generate month between 01 and 12', () => {
      const result = generateExpiryDate();
      const [month] = result.split('/');
      const monthNum = parseInt(month);
      expect(monthNum).toBeGreaterThanOrEqual(1);
      expect(monthNum).toBeLessThanOrEqual(12);
    });
  });

  describe('generateCardCompany', () => {
    it('should return either visa or mastercard', () => {
      const result = generateCardCompany();
      expect(['visa', 'mastercard']).toContain(result);
    });

    it('should return a valid CardCompany type', () => {
      const result = generateCardCompany();
      expect(typeof result).toBe('string');
      expect(['visa', 'mastercard']).toContain(result);
    });
  });
}); 