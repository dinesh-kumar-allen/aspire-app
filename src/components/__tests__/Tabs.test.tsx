import React from 'react';
import { render } from '@testing-library/react';
import Tabs from '../Tabs';

const mockTabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
];

describe('Tabs Component', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all tabs', () => {
    const { getByText } = render(
      <Tabs
        tabs={mockTabs}
        activeTabId="tab1"
        onTabChange={mockOnTabChange}
      />
    );

    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(getByText('Tab 2')).toBeInTheDocument();
    expect(getByText('Tab 3')).toBeInTheDocument();
  });

  it('should call onTabChange when tab is clicked', () => {
    const { getByText } = render(
      <Tabs
        tabs={mockTabs}
        activeTabId="tab1"
        onTabChange={mockOnTabChange}
      />
    );

    const tab2 = getByText('Tab 2');
    tab2.click();

    expect(mockOnTabChange).toHaveBeenCalledWith('tab2');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Tabs
        tabs={mockTabs}
        activeTabId="tab1"
        onTabChange={mockOnTabChange}
        className="custom-class"
      />
    );

    const tabsContainer = container.firstChild;
    expect(tabsContainer).toHaveClass('custom-class');
  });

  it('should handle empty tabs array', () => {
    const { container } = render(
      <Tabs
        tabs={[]}
        activeTabId=""
        onTabChange={mockOnTabChange}
      />
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle single tab', () => {
    const singleTab = [mockTabs[0]];
    const { getByText, queryByText } = render(
      <Tabs
        tabs={singleTab}
        activeTabId="tab1"
        onTabChange={mockOnTabChange}
      />
    );

    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(queryByText('Tab 2')).not.toBeInTheDocument();
  });
}); 
 