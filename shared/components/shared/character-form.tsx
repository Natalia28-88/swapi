'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CharacterDetails,
  CharacterImage,
  Loading,
} from '..';

import { Status } from '@/shared/store/people';
import { useCharacterInfo } from '@/shared/hooks/use-character-info';

interface Props {
  characterId: string;
  className?: string;
}

export const CharacterForm: React.FC<Props> = ({ characterId, className }) => {
  const { selectedCharacter, characterStatus } = useCharacterInfo(characterId);

  if (characterStatus === Status.LOADING) return <Loading />;
  if (characterStatus === Status.ERROR)
    return (
      <p className="text-center mt-10 text-xl">
        Error loading character details. Please try again.
      </p>
    );

  return (
    <Card className="px-10 mx-40 my-10">
      <CardHeader>
        <CardTitle>{selectedCharacter?.name}</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="flex min-h-[300px]">
        <CharacterImage
          imageUrl={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
          altText={selectedCharacter?.name}
        />
        <CharacterDetails character={selectedCharacter} />
      </CardContent>
      <CardFooter>
        <p>
          Created - {selectedCharacter?.created} / Edited - {selectedCharacter?.edited}
        </p>
      </CardFooter>
      <div className="flex justify-center"></div>
    </Card>
  );
};
