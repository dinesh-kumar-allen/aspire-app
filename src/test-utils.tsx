import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { CardsProvider } from '@/contexts/CardsContext';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CardsProvider>
      {children}
    </CardsProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions
) => {
  const Wrapper = options?.wrapper || AllTheProviders;
  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render }; 