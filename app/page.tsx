'use client';

import { CharacterList, Container, Loading, Pagination } from '@/shared/components';
import { RootState, useAppDispatch } from '@/shared/store';
import { fetchPeople, setPage, Status } from '@/shared/store/people';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { setLikedCharacters, setRemainingCharacters, setSearchQuery } from '@/shared/store/filter';

const ITEMS_PER_PAGE = 15;

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { items, status, currentPage } = useSelector((state: RootState) => state.people);
  const { searchQuery, filterMode, remainingCharacters, likedCharacters } = useSelector(
    (state: RootState) => state.filter,
  );

  const isMounted = React.useRef(false);

  const [isLoading, setIsLoading] = React.useState(false);

  // Инициализация сохранённых данных
  React.useEffect(() => {
    const storedRemainingCharacters = JSON.parse(
      localStorage.getItem('remainingCharacters') || '[]',
    );

    const storedLikedCharacters = JSON.parse(localStorage.getItem('likedCharacters') || '[]');

    dispatch(setRemainingCharacters(storedRemainingCharacters));
    dispatch(setLikedCharacters(storedLikedCharacters));

    setIsLoading(true);
  }, [dispatch]);

  // Загрузка данных при монтировании
  React.useEffect(() => {
    if (!isMounted.current) {
      const search = searchParams.get('search') || '';
      dispatch(setSearchQuery(search));
      dispatch(fetchPeople());
      isMounted.current = true;
    }
  }, [searchParams, dispatch]);

  const filteredItems = (() => {
    switch (filterMode) {
      case 'liked':
        // Избранные персонажи (пересечение ID с API)
        return items.filter((character) => {
          const characterId = character.url.split('/').slice(-2, -1)[0];
          return likedCharacters.includes(characterId);
        });

      case 'filtered':
        // Удалённые персонажи (исключительно из состояния remainingCharacters)
        return items.filter((character) => {
          const characterId = character.url.split('/').slice(-2, -1)[0];
          return !remainingCharacters.includes(characterId);
        });

      default:
        return items;
    }
  })();

  // Применение поиска
  const searchFilteredItems = filteredItems.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Пагинация
  const paginatedItems = searchFilteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(searchFilteredItems.length / ITEMS_PER_PAGE);

  if (status === Status.LOADING) return <Loading />;
  if (status === Status.ERROR) return <p>Error loading data</p>;

  return (
    <Container className="font-mono text-[22px]">
      <div className="px-10 flex justify-center flex-col items-center">
        <CharacterList searchQuery={searchQuery} items={paginatedItems} currentPage={currentPage} />
        <div>
          {filteredItems.length > ITEMS_PER_PAGE && (
            <Pagination
              total={totalPages}
              current={currentPage}
              onChange={(page) => dispatch(setPage(page))}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
