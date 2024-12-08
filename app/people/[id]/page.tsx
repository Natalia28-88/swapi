import { ButtonBack, CharacterForm, Container } from '@/shared/components';
import React from 'react';

export default async function CharacterPage({ params: { id } }: { params: { id: string } }) {
  return (
    <Container>
      <CharacterForm characterId={id} />
      <ButtonBack />
    </Container>
  );
}
