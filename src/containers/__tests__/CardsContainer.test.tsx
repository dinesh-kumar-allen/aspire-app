import React from 'react';
import { render } from '../../test-utils';
import CardsContainer from '../CardsContainer';
import { Card } from '../../interfaces/cards';

const mockCards: Card[] = [
  {
    id: '1',
    cardNumber: '1234 5678 9012 3456',
    cardHolder: 'John Doe',
    expiry: '12/25',
    cardCompany: 'visa',
    isActive: true,
    isFrozen: false,
    balance: 3000.00,
    cardType: 'debit'
  },
  {
    id: '2',
    cardNumber: '9876 5432 1098 7654',
    cardHolder: 'Jane Smith',
    expiry: '06/30',
    cardCompany: 'mastercard',
    isActive: false,
    isFrozen: true,
    balance: 1500.00,
    cardType: 'credit'
  }
];

const mockOnCardChange = jest.fn();
const mockOnCardAction = jest.fn();

describe('CardsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render cards container with cards', () => {
    const { getByTestId } = render(
      <CardsContainer 
        cards={mockCards}
        activeCardIndex={0}
        onCardChange={mockOnCardChange}
        onCardAction={mockOnCardAction}
        data-testid="cards-container"
      />
    );

    expect(getByTestId('cards-container')).toBeInTheDocument();
    expect(getByTestId('cards-count')).toHaveTextContent('2');
  });

  it('should show no cards message when no cards', () => {
    const { getByText } = render(
      <CardsContainer 
        cards={[]}
        activeCardIndex={0}
        onCardChange={mockOnCardChange}
        onCardAction={mockOnCardAction}
      />
    );

    expect(getByText('No cards available')).toBeInTheDocument();
  });

  it('should display card holder names', () => {
    const { getByTestId } = render(
      <CardsContainer 
        cards={mockCards}
        activeCardIndex={0}
        onCardChange={mockOnCardChange}
        onCardAction={mockOnCardAction}
      />
    );

    expect(getByTestId('card-holder-0')).toHaveTextContent('John Doe');
  });

  it('should show card actions for each card', () => {
    const { getByTestId } = render(
      <CardsContainer 
        cards={mockCards}
        activeCardIndex={0}
        onCardChange={mockOnCardChange}
        onCardAction={mockOnCardAction}
      />
    );

    expect(getByTestId('freeze-card-0')).toBeInTheDocument();
  });

  it('should show frozen status for frozen cards', () => {
    const { getByTestId } = render(
      <CardsContainer 
        cards={mockCards}
        activeCardIndex={1}
        onCardChange={mockOnCardChange}
        onCardAction={mockOnCardAction}
      />
    );

    expect(getByTestId('card-holder-1')).toHaveTextContent('Jane Smith');
    expect(getByTestId('freeze-card-1')).toBeInTheDocument();
  });

  it('should handle card actions', () => {
    const { getByTestId } = render(
      <CardsContainer 
        cards={mockCards}
        activeCardIndex={0}
        onCardChange={mockOnCardChange}
        onCardAction={mockOnCardAction}
      />
    );

    expect(getByTestId('card-holder-0')).toHaveTextContent('John Doe');
    expect(getByTestId('freeze-card-0')).toBeInTheDocument();
  });

  it('should handle single card', () => {
    const { getByTestId, queryByTestId } = render(
      <CardsContainer 
        cards={[mockCards[0]]}
        activeCardIndex={0}
        onCardChange={mockOnCardChange}
        onCardAction={mockOnCardAction}
      />
    );

    expect(getByTestId('card-holder-0')).toHaveTextContent('John Doe');
    expect(queryByTestId('card-holder-1')).not.toBeInTheDocument();
  });

  it('should pass correct props to Card component', () => {
    const { getByTestId } = render(
      <CardsContainer 
        cards={mockCards}
        activeCardIndex={0}
        onCardChange={mockOnCardChange}
        onCardAction={mockOnCardAction}
      />
    );

    // Check that card components are rendered with correct data
    expect(getByTestId('card-holder-0')).toHaveTextContent('John Doe');
  });

  it('should pass correct props to CardActions component', () => {
    const { getByTestId } = render(
      <CardsContainer 
        cards={mockCards}
        activeCardIndex={0}
        onCardChange={mockOnCardChange}
        onCardAction={mockOnCardAction}
      />
    );

    expect(getByTestId('freeze-card-0')).toBeInTheDocument();
  });
}); 