import Link from 'next/link';
import React from 'react';
import { ButtonFavorites } from './button-favorites';
import { ButtonTrash } from './button-trash';

interface Props {
  items: { name: string; url: string }[];
  searchQuery: string;
  currentPage: number;
  showTrashButton?: boolean;
  onTrashClick?: (characterId: string) => void; // Функция для удаления
}

export const CharacterList: React.FC<Props> = React.memo(
  ({ items, searchQuery, currentPage, showTrashButton = false, onTrashClick }) => {
    return (
      <ol className="min-h-[650px]">
        {items.map((character) => {
          // const characterId = character.url.split('/').slice(-2, -1)[0] || '';
          const characterId =
            typeof character.url === 'string'
              ? character.url.split('/').slice(-2, -1)[0] || ''
              : '';

          return (
            <li
              key={character.url}
              className="flex align-center border-b border-[#72b3b3] w-[500px] relative"
            >
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
                alt={character.name}
                width={35}
                height={35}
              />
              <Link
                href={`/people/${characterId}`}
                className="pl-5 leading-loose hover:text-[#72b3b3]"
              >
                {character.name}
              </Link>

              <div className="flex items-center justify-center space-x-4 pr-4 absolute right-0 top-3">
                <ButtonFavorites characterId={characterId} />
                {showTrashButton && onTrashClick && <ButtonTrash characterId={characterId} />}
              </div>
            </li>
          );
        })}
      </ol>
    );
  },
);

CharacterList.displayName = 'CharacterList';
