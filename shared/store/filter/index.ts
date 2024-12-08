import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterWithHomeworld, FilterMode } from '../dto/people.dto';

interface FilterState {
  searchQuery: string;
  filterMode: FilterMode;
  remainingCharacters: string[];
  likedCharacters: string[];
  createdCharacters: Array<{
    id: string;
    name: string;
  }>;
}

const initialState: FilterState = {
  searchQuery: '',
  filterMode: 'all',
  remainingCharacters: [],
  likedCharacters: [],
  createdCharacters: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterMode: (state, action: PayloadAction<FilterMode>) => {
      state.filterMode = action.payload;
    },
    setRemainingCharacters: (state, action: PayloadAction<string[]>) => {
      state.remainingCharacters = action.payload;
    },
    setLikedCharacters: (state, action: PayloadAction<string[]>) => {
      state.likedCharacters = action.payload;
    },
    removeCharacter: (state, action: PayloadAction<string>) => {
      state.remainingCharacters = state.remainingCharacters.filter(
        (characterId) => characterId !== action.payload,
      );
      // const characterId = action.payload;
      // state.remainingCharacters = [...state.remainingCharacters, characterId];

      // localStorage.setItem('remainingCharacters', JSON.stringify(state.remainingCharacters));
    },
    toggleLikeCharacter: (state, action: PayloadAction<string>) => {
      const characterId = action.payload;
      if (state.likedCharacters.includes(characterId)) {
        state.likedCharacters = state.likedCharacters.filter((id) => id !== characterId);
      } else {
        state.likedCharacters = [...state.likedCharacters, characterId];
      }
      localStorage.setItem('likedCharacters', JSON.stringify(state.likedCharacters));
    },
    addCreatedCharacter: (
      state,
      action: PayloadAction<(typeof initialState.createdCharacters)[0]>,
    ) => {
      state.createdCharacters.push(action.payload);
    },
  },
});

export const {
  setSearchQuery,
  setFilterMode,
  setRemainingCharacters,
  removeCharacter,
  toggleLikeCharacter,
  setLikedCharacters,
  addCreatedCharacter,
} = filterSlice.actions;
export default filterSlice.reducer;
