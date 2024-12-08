import { cn } from '@/shared/libs/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={cn('mx-auto flex flex-col justify-center', className)}>{children}</div>;
};
