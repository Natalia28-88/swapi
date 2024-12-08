import { useClientSideStorage } from '@/shared/hooks/use-client-side-storage';
import React from 'react';
import { CharacterList, Container, Title } from './';
import Link from 'next/link';
import { RootState, useAppDispatch } from '@/shared/store';
import { useSelector } from 'react-redux';
import { loadCharacters, removeCharacter } from '@/shared/store/creation';
import { Trash } from 'lucide-react';
import { CreatedCharacter } from '@/shared/store/dto/people.dto';

interface Props {
  className?: string;
}

export const CreatedCharacterList: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const createdCharacters = useSelector((state: RootState) => state.creation.characters);

  const [createdCharactersFromStorage, setCreatedCharactersFromStorage] = useClientSideStorage<
    CreatedCharacter[]
  >('createdCharacters', []);

  React.useEffect(() => {
    if (createdCharactersFromStorage.length > 0) {
      dispatch(loadCharacters(createdCharactersFromStorage));
    }
  }, [dispatch, createdCharactersFromStorage]);

  const handleTrashClick = (characterId: string) => {
    // Удаляем персонажа из Redux и localStorage
    dispatch(removeCharacter(characterId));
    const updatedCharacters = createdCharactersFromStorage.filter(
      (char) => char.id !== characterId,
    );
    setCreatedCharactersFromStorage(updatedCharacters); // Обновляем состояние в useClientSideStorage
    localStorage.setItem('createdCharacters', JSON.stringify(updatedCharacters)); // Синхронизация с localStorage
  };

  return (
    <Container>
      <div className="flex justify-between mb-[40px] w-[480px]">
        <div>
          <Title text="Created Characters" className="mb-4 text-[24px]" />
          {createdCharactersFromStorage.length > 0 ? (
            <div className="space-y-4 w-[480px]">
              {createdCharactersFromStorage.map((char) => (
                <div
                  key={char.id}
                  className="flex items-center justify-between border-b border-gray-300 py-2"
                >
                  <div className="flex items-center">
                    {/* Серый квадрат как заглушка для изображения */}
                    <div
                      style={{
                        width: 35,
                        height: 35,
                        backgroundColor: '#ccc', // Серый цвет
                      }}
                      className="mr-4 flex items-center justify-center"
                    >
                      <span className="text-white">{char.name[0]}</span> {/* Первая буква имени */}
                    </div>
                    <span>{char.name}</span>
                  </div>
                  <button
                    onClick={() => handleTrashClick(char.id)}
                    className="hover:text-gray-700 text-gray-500"
                    title="Delete"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white">No custom characters yet. Create one!</p>
          )}
        </div>

        <Link href="/creation">
          <button className="bg-[#244545] text-white p-2 rounded text-[24px]" title="Add character">
            +
          </button>
        </Link>
      </div>
    </Container>
  );
};
