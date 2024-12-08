'use client';

import { RootState } from '@/shared/store';
import { Heart, List, PenLine } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
  className?: string;
}

export const FilterButtons: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();
  const filterMode = useSelector((state: RootState) => state.filter.filterMode);

  return (
    <div className={`flex space-x-4 my-4 ${className}`}>
      {/* Кнопка "All" будет подсвечиваться только на главной странице */}
      <Link href="/" passHref>
        <button
          className={`flex items-center px-4 py-1 border rounded font-mono${
            pathname === '/' ? 'bg-[#244545] text-white' : ''
          }`}
        >
          <List className="mr-2" />
          All
        </button>
      </Link>

      {/* Кнопка "Favorites" */}
      <Link href="/favorites" passHref>
        <button
          className={`flex items-center px-4 py-1 border rounded font-mono ${
            pathname === '/favorites' ? 'bg-[#244545] text-white' : ''
          }`}
        >
          <Heart className="mr-2 text-red-500" />
          Favorites
        </button>
      </Link>

      {/* Кнопка "Change" */}
      <Link href="/change" passHref>
        <button
          className={`flex items-center px-4 py-1 border rounded font-mono ${
            pathname === '/change' ? 'bg-[#244545] text-white' : ''
          }`}
        >
          <PenLine className="mr-2 text-gray-500" />
          Change the list
        </button>
      </Link>
    </div>
  );
};
