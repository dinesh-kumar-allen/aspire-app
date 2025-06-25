import { CardCompany } from "@/interfaces/cards";

export const maskCardNumber = (number: string) => {
  const cleaned = number.replace(/\s/g, '');
  const masked = cleaned.replace(/.(?=.{4})/g, '•');
  return (masked.match(/.{1,4}/g)?.join(' ') || masked);
};

export const formatCardNumber = (number: string) => {
  const cleaned = number.replace(/\s/g, '');
  return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
};

export const generateCardNumber = (): string => {
  const digits = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10));
  return digits.join('');
};

export const generateExpiryDate = (): string => {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(Math.random() * 5) + 1;
  const month = Math.floor(Math.random() * 12) + 1; 
  return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
};

export const generateCardCompany = (): CardCompany => {
  return Math.random() > 0.5 ? 'visa' : 'mastercard';
};