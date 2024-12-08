import React from 'react';
import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import { RootState, useAppDispatch } from '@/shared/store';
import { toggleLikeCharacter } from '@/shared/store/filter';

interface Props {
  characterId: string;
  className?: string;
}

export const ButtonFavorites: React.FC<Props> = ({ characterId, className }) => {
  const dispatch = useAppDispatch();
  const likedCharacters = useSelector((state: RootState) => state.filter.likedCharacters);

  const isLiked = likedCharacters.includes(characterId!);

  return (
    <button
      onClick={() => dispatch(toggleLikeCharacter(characterId!))}
      title="Add to Favorites"
      className={`hover:text-red-500 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
    >
      <Heart fill={isLiked ? 'red' : 'none'} size={20} />
    </button>
  );
};
