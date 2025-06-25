import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../Card';
import { Card as CardType } from '@/interfaces/cards';

const mockCard: CardType = {
  id: '1',
  cardNumber: '1234567890123456',
  cardHolder: 'John Doe',
  expiry: '12/25',
  cardCompany: 'visa',
  isActive: true,
  isFrozen: false,
  balance: 1000,
  cardType: 'debit',
};

describe('Card Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render card with all information', () => {
    render(<Card card={mockCard} showCardNumber={true} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Thru: 12/25')).toBeInTheDocument();
    expect(screen.getByText('CVV: ***')).toBeInTheDocument();
    expect(screen.getByAltText('aspire')).toBeInTheDocument();
    expect(screen.getByAltText('VISA')).toBeInTheDocument();
  });

  it('should show masked card number when showCardNumber is false', () => {
    render(<Card card={mockCard} showCardNumber={false} />);

    const cardNumberElement = screen.getByText(/•••• •••• •••• 3456/);
    expect(cardNumberElement).toBeInTheDocument();
  });

  it('should show formatted card number when showCardNumber is true', () => {
    render(<Card card={mockCard} showCardNumber={true} />);

    const cardNumberElement = screen.getByText(/1234 5678 9012 3456/);
    expect(cardNumberElement).toBeInTheDocument();
  });

  it('should apply frozen card styling when card is frozen', () => {
    const frozenCard = { ...mockCard, isFrozen: true };
    const { container } = render(<Card card={frozenCard} showCardNumber={true} />);

    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('bg-highlight-green/40');
  });

  it('should apply normal card styling when card is not frozen', () => {
    const { container } = render(<Card card={mockCard} showCardNumber={true} />);

    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('bg-highlight-green');
  });

  it('should display card holder name prominently', () => {
    render(<Card card={mockCard} showCardNumber={true} />);

    const cardHolderElement = screen.getByText('John Doe');
    expect(cardHolderElement).toHaveClass('text-2xl', 'font-bold');
  });

  it('should handle different card holder names', () => {
    const cardWithDifferentName = { ...mockCard, cardHolder: 'Jane Smith' };
    render(<Card card={cardWithDifferentName} showCardNumber={true} />);

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should handle different expiry dates', () => {
    const cardWithDifferentExpiry = { ...mockCard, expiry: '06/30' };
    render(<Card card={cardWithDifferentExpiry} showCardNumber={true} />);

    expect(screen.getByText('Thru: 06/30')).toBeInTheDocument();
  });

  it('should always show CVV as masked', () => {
    render(<Card card={mockCard} showCardNumber={true} />);

    expect(screen.getByText('CVV: ***')).toBeInTheDocument();
  });
}); 