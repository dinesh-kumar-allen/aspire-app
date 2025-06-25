import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { useTabs } from '../useTabs';

describe('useTabs', () => {
  const mockTabs = [
    { id: 'tab1', label: 'Tab 1', content: React.createElement('div', null, 'Content 1') },
    { id: 'tab2', label: 'Tab 2', content: React.createElement('div', null, 'Content 2') },
    { id: 'tab3', label: 'Tab 3', content: React.createElement('div', null, 'Content 3') },
  ];

  it('should initialize with the first tab as active', () => {
    const { result } = renderHook(() => useTabs(mockTabs));

    expect(result.current.activeTabId).toBe('tab1');
    expect(result.current.activeTab).toEqual(mockTabs[0]);
  });

  it('should initialize with specified initial tab', () => {
    const { result } = renderHook(() => useTabs(mockTabs, 'tab2'));

    expect(result.current.activeTabId).toBe('tab2');
    expect(result.current.activeTab).toEqual(mockTabs[1]);
  });

  it('should change active tab when setActiveTab is called', () => {
    const { result } = renderHook(() => useTabs(mockTabs));

    act(() => {
      result.current.setActiveTab('tab3');
    });

    expect(result.current.activeTabId).toBe('tab3');
    expect(result.current.activeTab).toEqual(mockTabs[2]);
  });

  it('should return all tabs', () => {
    const { result } = renderHook(() => useTabs(mockTabs));

    expect(result.current.tabs).toEqual(mockTabs);
  });

  it('should handle empty tabs array', () => {
    const { result } = renderHook(() => useTabs([]));

    expect(result.current.activeTabId).toBe('');
    expect(result.current.activeTab).toBeUndefined();
  });

  it('should handle tabs without content', () => {
    const tabsWithoutContent = [
      { id: 'tab1', label: 'Tab 1' },
      { id: 'tab2', label: 'Tab 2' },
    ];

    const { result } = renderHook(() => useTabs(tabsWithoutContent));

    expect(result.current.activeTabId).toBe('tab1');
    expect(result.current.activeTab).toEqual(tabsWithoutContent[0]);
  });

  it('should maintain active tab when switching between tabs', () => {
    const { result } = renderHook(() => useTabs(mockTabs));

    act(() => {
      result.current.setActiveTab('tab2');
    });
    expect(result.current.activeTabId).toBe('tab2');

    act(() => {
      result.current.setActiveTab('tab1');
    });
    expect(result.current.activeTabId).toBe('tab1');

    act(() => {
      result.current.setActiveTab('tab3');
    });
    expect(result.current.activeTabId).toBe('tab3');
  });

  it('should handle invalid tab ID gracefully', () => {
    const { result } = renderHook(() => useTabs(mockTabs, 'nonexistent'));

    // Should keep the current active tab or default to first
    expect(result.current.activeTabId).toBe('nonexistent');
    expect(result.current.activeTab).toBe(mockTabs[0]); // Should fallback to first tab
  });
}); 