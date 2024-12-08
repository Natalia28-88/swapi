import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../instance';
import { Character, CharacterWithHomeworld } from '../dto/people.dto';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const ITEMS_PER_PAGE = 15;

export const fetchPeople = createAsyncThunk('people/fetchPeople', async () => {
  // Проверка закешированных данных
  const cashedData = localStorage.getItem('characters');
  if (cashedData) return JSON.parse(cashedData);

  let page = 1;
  let allData: Character[] = [];
  let hasMore = true;

  while (hasMore) {
    const { data } = await axiosInstance.get(`/people/?page=${page}`);
    allData = [...allData, ...data.results];
    hasMore = !!data.next;
    page++;
  }

  localStorage.setItem('characters', JSON.stringify(allData));

  return allData;
});

export const fetchCharacterDetails = createAsyncThunk(
  'people/fetchCharacterDetails',
  async (id: string) => {
    const { data: characterData } = await axiosInstance.get<Character>(`/people/${id}`);
    let homeworldName = 'Unknown';
    if (characterData.homeworld) {
      const { data: homeworldData } = await axiosInstance.get<CharacterWithHomeworld>(
        characterData.homeworld,
      );
      homeworldName = homeworldData.name;
    }
    return { ...characterData, homeworldName };
  },
);

export interface PeopleSliceState {
  items: Character[];
  paginatedItems: Character[];
  totalPages: number;
  currentPage: number;
  status: Status;
  selectedCharacter: CharacterWithHomeworld | null;
  characterStatus: Status;
}

const initialState: PeopleSliceState = {
  items: [],
  paginatedItems: [],
  totalPages: 0,
  currentPage: 1,
  status: Status.LOADING,
  selectedCharacter: null,
  characterStatus: Status.LOADING,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;

      const start = (action.payload - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      state.paginatedItems = state.items.slice(start, end);
    },
    clearSelectedCharacter: (state) => {
      state.selectedCharacter = null;
      state.characterStatus = Status.LOADING;
    },
  },

  extraReducers: (builder) => {
    // Загрузка всех персонажей
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchPeople.fulfilled, (state, action: PayloadAction<Character[]>) => {
        state.items = action.payload;
        state.totalPages = Math.ceil(action.payload.length / ITEMS_PER_PAGE);

        const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        state.paginatedItems = state.items.slice(start, end);

        state.status = Status.SUCCESS;
      })
      .addCase(fetchPeople.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });

    // Загрузка детальной информации о персонаже
    builder
      .addCase(fetchCharacterDetails.pending, (state) => {
        state.characterStatus = Status.LOADING;
      })
      .addCase(
        fetchCharacterDetails.fulfilled,
        (state, action: PayloadAction<Character & { homeworldName: string }>) => {
          state.selectedCharacter = action.payload;
          state.characterStatus = Status.SUCCESS;
        },
      )
      .addCase(fetchCharacterDetails.rejected, (state) => {
        state.characterStatus = Status.ERROR;
        state.selectedCharacter = null;
      });
  },
});

export const { setPage, clearSelectedCharacter } = peopleSlice.actions;
export default peopleSlice.reducer;
