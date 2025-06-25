import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from '../Sidebar';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

describe('Sidebar Component', () => {
  it('should render sidebar with navigation items', () => {
    const { getByText, getByAltText } = render(<Sidebar />);

    // The logo alt is 'aspire' (lowercase)
    expect(getByAltText('aspire')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Cards')).toBeInTheDocument();
    expect(getByText('Payments')).toBeInTheDocument();
    expect(getByText('Credit')).toBeInTheDocument();
    expect(getByText('Settings')).toBeInTheDocument();
  });

  it('should render all navigation icons', () => {
    const { getByAltText } = render(<Sidebar />);

    expect(getByAltText('Home')).toBeInTheDocument();
    expect(getByAltText('Cards')).toBeInTheDocument();
    expect(getByAltText('Payments')).toBeInTheDocument();
    expect(getByAltText('Credit')).toBeInTheDocument();
    expect(getByAltText('Settings')).toBeInTheDocument();
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
    expect(sidebar).toHaveClass('bg-dark-blue', 'text-white', 'min-h-screen', 'flex', 'flex-col', 'px-8', 'py-10');
  });

  it('should render logo correctly', () => {
    const { getByAltText } = render(<Sidebar />);
    const logo = getByAltText('aspire');
    expect(logo).toBeInTheDocument();
  });

  it('should have navigation items with proper structure', () => {
    const { container } = render(<Sidebar />);
    const navItems = container.querySelectorAll('nav > div');
    expect(navItems.length).toBeGreaterThan(0);
  });
}); 