'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/store';

interface Props {
  className?: string;
}

export const ButtonBack: React.FC<Props> = ({ className }) => {
  const { searchQuery } = useSelector((state: RootState) => state.filter);

  // const searchQuery = searchParams.get('search') || ''; // Извлекаем параметр search, если он есть

  const backLink = searchQuery ? `/?search=${searchQuery}` : '/';
  return (
    <div className="mt-10 flex justify-center">
      <Link href={backLink}>
        <Button className="uppercase font-mono text-[20px] tracking-[10px]" variant={'ghost'}>
          Back button
        </Button>
      </Link>
    </div>
  );
};
