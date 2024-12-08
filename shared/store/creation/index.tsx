import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreatedCharacter } from '../dto/people.dto';

interface CreationState {
  characters: CreatedCharacter[];
}

const initialState: CreationState = {
  characters: [],
};

const creationSlice = createSlice({
  name: 'creation',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<CreatedCharacter>) => {
      state.characters.push(action.payload);
      localStorage.setItem('createdCharacters', JSON.stringify(state.characters));
    },
    removeCharacter: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter((char) => char.id !== action.payload);
      localStorage.setItem('createdCharacters', JSON.stringify(state.characters));
    },
    loadCharacters: (state, action: PayloadAction<CreatedCharacter[]>) => {
      state.characters = action.payload;
    },
  },
});

export const { addCharacter, removeCharacter, loadCharacters } = creationSlice.actions;

export default creationSlice.reducer;
