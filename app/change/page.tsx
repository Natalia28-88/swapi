'use client';

import { CharacterList, Container, CreatedCharacterList, Pagination } from '@/shared/components';
import { useClientSideStorage } from '@/shared/hooks/use-client-side-storage';
import { RootState, useAppDispatch } from '@/shared/store';
import { setRemainingCharacters } from '@/shared/store/filter';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const ITEMS_PER_PAGE = 10;

export default function ChangePage() {
  const { items } = useSelector((state: RootState) => state.people);
  const { remainingCharacters } = useSelector((state: RootState) => state.filter);
  const dispatch = useAppDispatch();

  const [createdCharactersFromStorage] = useClientSideStorage('createdCharacters', []);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleTrashClick = (characterId: string) => {
    const updatedRemainingCharacters = remainingCharacters.filter((id) => id !== characterId);
    dispatch(setRemainingCharacters(updatedRemainingCharacters)); //
    localStorage.setItem('remainingCharacters', JSON.stringify(updatedRemainingCharacters));
  };

  const filteredItems = items.filter((character) => {
    const characterId = character.url?.split('/').slice(-2, -1)[0] || '';
    return remainingCharacters.includes(characterId);
  });
  // .filter((character) => {
  //   return character.name.toLowerCase().includes(searchQuery.toLowerCase());
  // });

  // Объединяем фильтрованные персонажи из Redux и созданные вручную
  const combinedItems = [...filteredItems, ...createdCharactersFromStorage];

  // Пагинация
  const paginatedItems = combinedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(combinedItems.length / ITEMS_PER_PAGE);

  return (
    <Container className="font-mono text-[22px]">
      <div className="px-10 flex justify-center flex-col items-center">
        <CreatedCharacterList className="mb-10" />

        <CharacterList
          items={paginatedItems}
          searchQuery=""
          currentPage={currentPage}
          showTrashButton={true}
          onTrashClick={handleTrashClick}
        />
        {combinedItems.length > ITEMS_PER_PAGE && (
          <Pagination total={totalPages} current={currentPage} onChange={setCurrentPage} />
        )}
      </div>
    </Container>
  );
}

// 'use client';

// import { CharacterList, Container, Pagination } from '@/shared/components';
// import { useClientSideStorage } from '@/shared/hooks/use-client-side-storage';
// import { RootState, useAppDispatch } from '@/shared/store';
// import { setRemainingCharacters } from '@/shared/store/filter';
// import Link from 'next/link';
// import React from 'react';
// import { useSelector } from 'react-redux';

// const ITEMS_PER_PAGE = 15;

// export default function ChangePage() {
//   const { items } = useSelector((state: RootState) => state.people);
//   const { remainingCharacters, createdCharacters } = useSelector(
//     (state: RootState) => state.filter,
//   );
//   const dispatch = useAppDispatch();

//   const [createdCharactersFromStorage] = useClientSideStorage('createdCharacters', []);

//   const [currentPage, setCurrentPage] = React.useState(1);

//   const handleTrashClick = (characterId: string) => {
//     const updatedRemainingCharacters = remainingCharacters.filter((id) => id !== characterId);
//     dispatch(setRemainingCharacters(updatedRemainingCharacters)); // Обновляем состояние через Redux
//     localStorage.setItem('remainingCharacters', JSON.stringify(updatedRemainingCharacters));
//   };

//   const filteredItems = items.filter((character) => {
//     const characterId = character.url.split('/').slice(-2, -1)[0];
//     return remainingCharacters.includes(characterId);
//   });

//   const combinedItems = [...filteredItems, ...createdCharacters, ...createdCharactersFromStorage];

//   const paginatedItems = combinedItems.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE,
//   );
//   const totalPages = Math.ceil(combinedItems.length / ITEMS_PER_PAGE);

//   return (
//     <Container className="font-mono text-[22px]">
//       <div className="px-10 flex justify-center flex-col items-center">
//         <Link href="/creation">
//           <button className="bg-[#244545] text-white p-2 rounded text-[24px]">+</button>
//         </Link>

//         <CharacterList
//           items={paginatedItems}
//           searchQuery=""
//           currentPage={currentPage}
//           showTrashButton={true}
//           onTrashClick={handleTrashClick}
//         />
//         {combinedItems.length > ITEMS_PER_PAGE && (
//           <Pagination total={totalPages} current={currentPage} onChange={setCurrentPage} />
//         )}
//       </div>
//     </Container>
//   );
// }
