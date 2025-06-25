import React from 'react';
import { Tab } from '@/hooks/useTabs';

interface TabsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  'data-testid'?: string;
}

export default function Tabs({ tabs, activeTabId, onTabChange, className = '', 'data-testid': dataTestId }: TabsProps) {
  return (
    <div className={`flex space-x-8 ${className}`} data-testid={dataTestId}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative py-3 px-1 text-sm transition-colors cursor-pointer ${
            activeTabId === tab.id
              ? 'text-black font-bold'
              : 'text-black/30'
          }`}
          data-testid={`tab-${tab.id}`}
        >
          {tab.label}
          {activeTabId === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue rounded-t-sm" />
          )}
        </button>
      ))}
    </div>
  );
} 