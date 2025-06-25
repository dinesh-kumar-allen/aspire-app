'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { SIDEBAR_ITEMS, COMPANY_DESCRIPTION, COMPANY_LOGO_URL } from '@/constants/sideBarConstants';

export default function Sidebar() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <aside className="bg-dark-blue text-white min-h-screen flex flex-col px-8 py-10 lg:w-[340px]">
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
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = item.href  === pathName
          return <div
            key={item.label}
            className={`pb-15 flex items-center cursor-pointer text-base ${isActive ? 'text-highlight-green font-bold' : 'text-white font-medium'}`}
            onClick={() => router.push(item.href)}
          >
            <Image src={item.iconUrl} alt={item.label} width={24} height={24} className='mr-4' />
            {item.label}
          </div>
        })}
      </nav>
    </aside>
  );
} 