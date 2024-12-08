'use client';

import { CharacterList, Container, EmptyFavorites, Pagination } from '@/shared/components';
import { RootState } from '@/shared/store';
import React from 'react';
import { useSelector } from 'react-redux';

const ITEMS_PER_PAGE = 15;

export default function FavoritesPage() {
  const { items } = useSelector((state: RootState) => state.people);
  const likedCharacters = useSelector((state: RootState) => state.filter.likedCharacters);

  const [currentPage, setCurrentPage] = React.useState(1);

  const favoriteItems = items.filter((character) => {
    const characterId = character.url.split('/').slice(-2, -1)[0];
    return likedCharacters.includes(characterId);
  });

  const paginatedItems = favoriteItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(favoriteItems.length / ITEMS_PER_PAGE);

  return (
    <Container className="font-mono text-[22px]">
      <div className="px-10 flex justify-center flex-col items-center">
        {favoriteItems.length === 0 && <EmptyFavorites />}
        <CharacterList items={paginatedItems} searchQuery="" currentPage={currentPage} />
        {favoriteItems.length > ITEMS_PER_PAGE && (
          <Pagination total={totalPages} current={currentPage} onChange={setCurrentPage} />
        )}
      </div>
    </Container>
  );
}
