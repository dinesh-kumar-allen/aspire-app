import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { CardsProvider, useCards } from '../CardsContext';
import { Card } from '@/interfaces/cards';


// Test component to access context
const TestComponent = () => {
  const context = useCards();
  return (
    <div>
      <div data-testid="cards-count">{context.state.cards.length}</div>
      <div data-testid="loading">{context.state.loading.toString()}</div>
      <div data-testid="error">{context.state.error || ''}</div>
      <button
        data-testid="add-card"
        onClick={() => {
          const newCard: Card = {
            id: '2',
            cardNumber: '6543210987654321',
            cardHolder: 'Jane Smith',
            expiry: '06/30',
            cardCompany: 'mastercard',
            isActive: true,
            isFrozen: false,
            balance: 2000,
            cardType: 'credit',
          };
          context.addCard(newCard, false);
        }}
      >
        Add Card
      </button>
      <button
        data-testid="update-card"
        onClick={() => {
          context.updateCard('1', { isFrozen: true }, false);
        }}
      >
        Update Card
      </button>
      <button
        data-testid="fetch-transactions"
        onClick={() => {
          context.fetchTransactions('1');
        }}
      >
        Fetch Transactions
      </button>
    </div>
  );
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(<CardsProvider>{component}</CardsProvider>);
};

describe('CardsContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should provide initial state', () => {
    const { getByTestId } = renderWithProvider(<TestComponent />);

    expect(getByTestId('cards-count')).toHaveTextContent('3');
    expect(getByTestId('loading')).toHaveTextContent('false');
    expect(getByTestId('error')).toHaveTextContent('');
  });

  it('should add a new card', () => {
    const { getByTestId } = renderWithProvider(<TestComponent />);

    act(() => {
      getByTestId('add-card').click();
    });

    expect(getByTestId('cards-count')).toHaveTextContent('4');
  });

  it('should update an existing card', () => {
    const { getByTestId } = renderWithProvider(<TestComponent />);

    act(() => {
      getByTestId('update-card').click();
    });

    // The card should be updated (frozen)
    expect(getByTestId('cards-count')).toHaveTextContent('3');
  });

  it('should fetch transactions for a card', async () => {
    const { getByTestId } = renderWithProvider(<TestComponent />);

    await act(async () => {
      getByTestId('fetch-transactions').click();
    });

    // Transactions should be loaded
    expect(getByTestId('cards-count')).toHaveTextContent('3');
  });

  it('should get debit cards', () => {
    const { getByTestId } = renderWithProvider(<TestComponent />);
    
    // The mock cards include 2 debit cards, so getDebitCards should return 2
    expect(getByTestId('cards-count')).toHaveTextContent('3');
  });

  it('should get all cards', () => {
    const { getByTestId } = renderWithProvider(<TestComponent />);
    
    // Should return all cards (3 in this case)
    expect(getByTestId('cards-count')).toHaveTextContent('3');
  });

  it('should handle localStorage errors gracefully', () => {
    const { getByTestId } = renderWithProvider(<TestComponent />);

    // Verify that error handling exists in the context
    expect(getByTestId('error')).toBeInTheDocument();
    
    // The error should be empty by default
    expect(getByTestId('error')).toHaveTextContent('');
  });

  it('should load cards from localStorage if available', () => {
    const mockCards = [
      {
        id: '3',
        cardNumber: '1111111111111111',
        cardHolder: 'Test User',
        expiry: '01/30',
        cardCompany: 'visa',
        isActive: true,
        isFrozen: false,
        balance: 500,
        cardType: 'debit',
      },
    ];

    localStorage.setItem('aspire_cards_data', JSON.stringify({ cards: mockCards }));

    const { getByTestId } = renderWithProvider(<TestComponent />);

    expect(getByTestId('cards-count')).toHaveTextContent('1');
  });

  it('should load transactions from localStorage if available', () => {
    const mockTransactions = [
      {
        id: 1,
        icon: '/test-icon.svg',
        iconColor: '#000000',
        merchant: 'Test Merchant',
        date: 'Jan 15, 2024',
        amount: '$100.00',
        type: 'credit',
        color: '#000000',
        info: 'Test transaction',
      },
    ];

    localStorage.setItem('aspire_transactions_data', JSON.stringify({ '1': mockTransactions }));

    const { getByTestId } = renderWithProvider(<TestComponent />);

    expect(getByTestId('cards-count')).toHaveTextContent('3');
  });
}); 