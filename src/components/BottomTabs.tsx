'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { SIDEBAR_ITEMS } from '@/constants/sideBarConstants';
import SidebarItem from './SidebarItem';

export default function BottomTabs() {
  const pathName = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
      <div className="flex justify-around items-center py-2">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            iconUrl={item.iconMobileUrl}
            href={item.href}
            isActive={item.href === pathName}
            variant="bottom-tabs"
          />
        ))}
      </div>
    </nav>
  );
} 