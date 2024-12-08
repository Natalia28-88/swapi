import { CharacterWithHomeworld } from '@/shared/store/dto/people.dto';
import React from 'react';

interface Props {
  character: CharacterWithHomeworld | null;
}

export const CharacterDetails: React.FC<Props> = ({ character }) => {
  return (
    <div>
      <p>Homeworld - {character?.homeworldName}</p>
      <br></br>
      <p>Height - {character?.height} cm</p>
      <p>Mass - {character?.mass} kg</p>
      <p>Hair Color - {character?.hair_color}</p>
      <p>Skin Color - {character?.skin_color}</p>
      <p>Eye Color - {character?.eye_color}</p>
      <p>Birth Year - {character?.birth_year}</p>
      <p>Gender - {character?.gender}</p>
    </div>
  );
};
