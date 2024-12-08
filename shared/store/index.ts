import { configureStore } from '@reduxjs/toolkit';
import people from './people';
import filter from './filter';
import creation from './creation';
import { useDispatch } from 'react-redux';
export const store = configureStore({
  reducer: {
    people,
    filter,
    creation,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
