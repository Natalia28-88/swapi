'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/shared/store';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};
