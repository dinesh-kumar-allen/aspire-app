import { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content?: React.ReactNode;
}

export function useTabs(tabs: Tab[], initialTabId?: string) {
  const [activeTabId, setActiveTabId] = useState(initialTabId || tabs[0]?.id || '');

  const setActiveTab = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];

  return {
    tabs,
    activeTabId,
    activeTab,
    setActiveTab,
  };
} 