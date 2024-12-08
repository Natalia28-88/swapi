import { useAppDispatch } from '@/shared/store';
import { removeCharacter } from '@/shared/store/filter';
import { Trash } from 'lucide-react';
import React from 'react';

interface Props {
  characterId: string;
  className?: string;
}

export const ButtonTrash: React.FC<Props> = ({ characterId, className }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(removeCharacter(characterId))}
      className="hover:text-gray-700 text-gray-500"
      title="Delete"
    >
      <Trash size={20} />
    </button>
  );
};
