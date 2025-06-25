import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';

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

describe('Sidebar Component', () => {
  it('should render sidebar with navigation items', () => {
    render(<Sidebar />);

    // The logo alt is 'aspire' (lowercase)
    expect(screen.getByAltText('aspire')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByText('Payments')).toBeInTheDocument();
    expect(screen.getByText('Credit')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should render all navigation icons', () => {
    render(<Sidebar />);

    expect(screen.getByAltText('Home')).toBeInTheDocument();
    expect(screen.getByAltText('Cards')).toBeInTheDocument();
    expect(screen.getByAltText('Payments')).toBeInTheDocument();
    expect(screen.getByAltText('Credit')).toBeInTheDocument();
    expect(screen.getByAltText('Settings')).toBeInTheDocument();
  });

  it('should have correct navigation items as divs', () => {
    const { container } = render(<Sidebar />);
    // Navigation items are rendered as divs inside nav
    const navItems = container.querySelectorAll('nav > div');
    expect(navItems).toHaveLength(5); // 5 navigation items
  });

  it('should have proper styling classes', () => {
    const { container } = render(<Sidebar />);
    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass( 'bg-dark-blue', 'text-white');
  });

  it('should render logo correctly', () => {
    render(<Sidebar />);
    const logo = screen.getByAltText('aspire');
    expect(logo).toBeInTheDocument();
  });

  it('should have navigation items with proper structure', () => {
    const { container } = render(<Sidebar />);
    const navItems = container.querySelectorAll('nav > div');
    expect(navItems.length).toBeGreaterThan(0);
  });
}); 