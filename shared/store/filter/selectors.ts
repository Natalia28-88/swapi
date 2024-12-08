import { RootState } from '..';

export const selectFilter = (state: RootState) => state.filter;

export const selectSearchQuery = (state: RootState) => state.filter.searchQuery;
