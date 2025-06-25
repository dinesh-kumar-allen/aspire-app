'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

interface SidebarItemProps {
  label: string;
  iconUrl: string;
  href: string;
  isActive: boolean;
  variant: 'sidebar' | 'bottom-tabs';
}

export default function SidebarItem({ label, iconUrl, href, isActive, variant }: SidebarItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  if (variant === 'sidebar') {
    return (
      <div
        className={`pb-15 flex items-center cursor-pointer text-base ${
          isActive ? 'text-highlight-green font-bold' : 'text-white font-medium'
        }`}
        onClick={handleClick}
      >
        <Image src={iconUrl} alt={label} width={24} height={24} className='mr-4' />
        {label}
      </div>
    );
  }

  // bottom-tabs variant
  return (
    <div
      className={`flex flex-col items-center justify-center py-2 px-3 cursor-pointer transition-colors ${
        isActive 
          ? 'text-highlight-green' 
          : 'text-gray-600 hover:text-gray-800'
      }`}
      onClick={handleClick}
    >
      <Image 
        src={iconUrl} 
        alt={label} 
        width={20} 
        height={20} 
        className={`mb-1 ${isActive ? 'opacity-100' : 'opacity-70'}`}
      />
      <span className={`text-xs font-medium ${isActive ? 'font-semibold' : 'font-normal'}`}>
        {label}
      </span>
    </div>
  );
} 