export interface Character {
  name: string;
  url: string;
  id?: string | null;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created?: string;
  edited?: string;
  homeworld: string;
}

export interface CharacterWithHomeworld extends Character {
  homeworldName: string;
}

export type FilterMode = 'all' | 'liked' | 'filtered';

export interface CreatedCharacter {
  id: string;
  name: string;
}
