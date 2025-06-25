# Aspire Test App

A modern React/Next.js application for managing digital cards with a beautiful UI and comprehensive testing suite.

## Features

- **Digital Card Management**: View, add, and manage debit and credit cards
- **Card Actions**: Freeze/unfreeze cards, set spend limits, add to GPay, replace cards
- **Transaction History**: View recent transactions for each card
- **Responsive Design**: Modern UI with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Comprehensive Testing**: Jest and React Testing Library with 70%+ coverage

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This project includes a comprehensive testing suite using Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

### Test Coverage

The test suite covers:
- **Components**: All React components with user interactions
- **Pages**: Page-level components and routing
- **Services**: API service layer and data fetching
- **Utils**: Utility functions and helpers
- **Hooks**: Custom React hooks
- **Contexts**: React context providers and consumers

### Test Structure

```
src/
├── components/__tests__/     # Component tests
├── pages/__tests__/         # Page tests
├── services/__tests__/      # Service tests
├── utils/__tests__/         # Utility tests
├── hooks/__tests__/         # Hook tests
├── contexts/__tests__/      # Context tests
└── containers/__tests__/    # Container tests
```

### Test Examples

#### Component Testing
```typescript
import { render, fireEvent } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  it('should render card with all information', () => {
    const { getByText } = render(<Card card={mockCard} showCardNumber={true} />);
    expect(getByText('John Doe')).toBeInTheDocument();
  });
});
```

#### Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react';
import { useTabs } from '../useTabs';

describe('useTabs', () => {
  it('should change active tab when setActiveTab is called', () => {
    const { result } = renderHook(() => useTabs(mockTabs));
    act(() => {
      result.current.setActiveTab('tab2');
    });
    expect(result.current.activeTabId).toBe('tab2');
  });
});
```

#### Service Testing
```typescript
import { CardService } from '../cardService';

describe('CardService', () => {
  it('should fetch transactions for a card', async () => {
    const result = await CardService.fetchCardTransactions('123');
    expect(result).toHaveLength(1);
  });
});
```

### Testing Best Practices

1. **Mock External Dependencies**: All external services and components are mocked
2. **Test User Interactions**: Focus on testing user behavior rather than implementation details
3. **Coverage Requirements**: Maintain 70%+ code coverage across all files
4. **Accessibility Testing**: Use semantic queries and test accessibility features
5. **Error Handling**: Test error states and edge cases

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/            # Reusable UI components
├── containers/            # Container components
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── interfaces/            # TypeScript interfaces
├── pages/                 # Page components
├── services/              # API services
└── utils/                 # Utility functions
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **ESLint**: Code linting and formatting

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ci` - Run tests in CI mode

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
