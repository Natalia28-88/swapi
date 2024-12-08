import React from 'react';
import { fetchCharacterDetails } from '../store/people';
import { RootState, useAppDispatch } from '@/shared/store';
import { useSelector } from 'react-redux';

export const useCharacterInfo = (characterId: string) => {
  const dispatch = useAppDispatch();
  const { selectedCharacter, characterStatus } = useSelector((state: RootState) => state.people);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCharacterDetails(characterId));
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchData();
  }, [dispatch, characterId]);

  return { selectedCharacter, characterStatus };
};
