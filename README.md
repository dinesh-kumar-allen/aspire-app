# Aspire Test App

A modern React/Next.js application for managing digital cards with a beautiful UI and comprehensive testing suite.

## Getting Started

First, install the dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This project includes a comprehensive testing suite using Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
yarn test
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
├── containers/            # Container pages / components
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── interfaces/            # TypeScript interfaces
├── pages/                 # Page components
├── services/              # API services
└── utils/                 # Utility functions
```

