import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SidebarItem from '../SidebarItem';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

// Mock Next.js navigation hooks
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe('SidebarItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Sidebar variant', () => {
    const sidebarProps = {
      label: 'Test Item',
      iconUrl: '/test-icon.svg',
      href: '/test',
      isActive: false,
      variant: 'sidebar' as const,
    };

    it('should render sidebar item with correct structure', () => {
      render(<SidebarItem {...sidebarProps} />);

      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByAltText('Test Item')).toBeInTheDocument();
    });

    it('should apply active styles when isActive is true', () => {
      const { container } = render(<SidebarItem {...sidebarProps} isActive={true} />);
      
      const item = container.firstChild as HTMLElement;
      expect(item).toHaveClass('text-highlight-green', 'font-bold');
    });

    it('should apply inactive styles when isActive is false', () => {
      const { container } = render(<SidebarItem {...sidebarProps} isActive={false} />);
      
      const item = container.firstChild as HTMLElement;
      expect(item).toHaveClass('text-white', 'font-medium');
    });

    it('should navigate when clicked', () => {
      render(<SidebarItem {...sidebarProps} />);
      
      fireEvent.click(screen.getByText('Test Item'));
      expect(mockPush).toHaveBeenCalledWith('/test');
    });

    it('should have correct icon size for sidebar', () => {
      render(<SidebarItem {...sidebarProps} />);
      
      const icon = screen.getByAltText('Test Item');
      expect(icon).toHaveAttribute('width', '24');
      expect(icon).toHaveAttribute('height', '24');
    });
  });

  describe('Bottom-tabs variant', () => {
    const bottomTabsProps = {
      label: 'Test Item',
      iconUrl: '/test-icon.svg',
      href: '/test',
      isActive: false,
      variant: 'bottom-tabs' as const,
    };

    it('should render bottom-tabs item with correct structure', () => {
      render(<SidebarItem {...bottomTabsProps} />);

      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByAltText('Test Item')).toBeInTheDocument();
    });

    it('should apply active styles when isActive is true', () => {
      const { container } = render(<SidebarItem {...bottomTabsProps} isActive={true} />);
      
      const item = container.firstChild as HTMLElement;
      expect(item).toHaveClass('text-highlight-green');
    });

    it('should apply inactive styles when isActive is false', () => {
      const { container } = render(<SidebarItem {...bottomTabsProps} isActive={false} />);
      
      const item = container.firstChild as HTMLElement;
      expect(item).toHaveClass('text-gray-600', 'hover:text-gray-800');
    });

    it('should navigate when clicked', () => {
      render(<SidebarItem {...bottomTabsProps} />);
      
      fireEvent.click(screen.getByText('Test Item'));
      expect(mockPush).toHaveBeenCalledWith('/test');
    });

    it('should have correct icon size for bottom-tabs', () => {
      render(<SidebarItem {...bottomTabsProps} />);
      
      const icon = screen.getByAltText('Test Item');
      expect(icon).toHaveAttribute('width', '20');
      expect(icon).toHaveAttribute('height', '20');
    });

    it('should have proper text styling for bottom-tabs', () => {
      const { container } = render(<SidebarItem {...bottomTabsProps} />);
      
      const textElement = screen.getByText('Test Item');
      expect(textElement).toHaveClass('text-xs', 'font-medium');
    });
  });
}); 