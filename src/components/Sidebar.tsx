'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { SIDEBAR_ITEMS, COMPANY_DESCRIPTION, COMPANY_LOGO_URL } from '@/constants/sideBarConstants';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
  const pathName = usePathname();
  
  return (
    <aside className="hidden lg:block bg-dark-blue text-white min-h-screen flex flex-col px-8 py-10 lg:w-[340px]">
      {/* Logo and tagline */}
      <div className="mb-20">
        <div className="flex items-center mb-2">
          {/* Placeholder logo */}
          <Image src={COMPANY_LOGO_URL} alt="aspire" width={125} height={35} />
        </div>
        <div className="text-md text-white opacity-30 leading-tight">
          {COMPANY_DESCRIPTION}
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex flex-col">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            iconUrl={item.iconUrl}
            href={item.href}
            isActive={item.href === pathName}
            variant="sidebar"
          />
        ))}
      </nav>
    </aside>
  );
} 