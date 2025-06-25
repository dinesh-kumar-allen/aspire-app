import React from 'react';
import { render, screen } from '@testing-library/react';
import BottomTabs from '../BottomTabs';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe('BottomTabs Component', () => {
  it('should render bottom tabs with navigation items', () => {
    render(<BottomTabs />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByText('Payments')).toBeInTheDocument();
    expect(screen.getByText('Credit')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should render all navigation icons', () => {
    render(<BottomTabs />);

    expect(screen.getByAltText('Home')).toBeInTheDocument();
    expect(screen.getByAltText('Cards')).toBeInTheDocument();
    expect(screen.getByAltText('Payments')).toBeInTheDocument();
    expect(screen.getByAltText('Credit')).toBeInTheDocument();
    expect(screen.getByAltText('Settings')).toBeInTheDocument();
  });

  it('should have correct navigation items as divs', () => {
    const { container } = render(<BottomTabs />);
    // Navigation items are rendered as divs inside the flex container
    const navItems = container.querySelectorAll('div > div');
    expect(navItems).toHaveLength(5); // 5 navigation items
  });

  it('should have proper styling classes', () => {
    const { container } = render(<BottomTabs />);
    const nav = container.firstChild as HTMLElement;
    expect(nav).toHaveClass('fixed', 'bottom-0', 'left-0', 'right-0', 'bg-white', 'border-t', 'border-gray-200', 'lg:hidden');
  });

  it('should have navigation items with proper structure', () => {
    const { container } = render(<BottomTabs />);
    const navItems = container.querySelectorAll('div > div');
    expect(navItems.length).toBeGreaterThan(0);
  });

  it('should be hidden on large screens', () => {
    const { container } = render(<BottomTabs />);
    const nav = container.firstChild as HTMLElement;
    expect(nav).toHaveClass('lg:hidden');
  });
}); 