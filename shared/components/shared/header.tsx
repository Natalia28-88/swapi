'use client';

import React from 'react';
import qs from 'qs';

import { Container, FilterButtons, SearchBar, Title } from './';
import Link from 'next/link';
import { RootState, useAppDispatch } from '@/shared/store';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { setSearchQuery } from '@/shared/store/filter';
import { setPage } from '@/shared/store/people';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useSelector((state: RootState) => state.filter.searchQuery);

  const router = useRouter();
  const pathname = usePathname();

  // Синхронизация URL при изменении строки поиска
  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(setPage(1));

    const queryString = qs.stringify({ search: query });
    router.push(`/?${queryString}`);

    if (!query) {
      dispatch(setPage(1));
    }
  };

  // if (!isLoading) return <Loading />;

  const isHomePage = pathname === '/';

  return (
    <Container>
      <Link href="/">
        <div className="py-15 flex justify-center flex-col">
          <Title text="STAR WARS" size="2xl" className="font-sans text-center tracking-[.4em]" />
        </div>
      </Link>

      <div className="flex justify-center flex-col items-center">
        {isHomePage && <SearchBar value={searchQuery} onChange={handleSearchChange} />}
        <FilterButtons className="mb-5" />
      </div>
    </Container>
  );
};
