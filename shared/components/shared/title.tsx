import clsx from 'clsx';
import React from 'react';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Props {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const Title: React.FC<Props> = ({ text, size, className }) => {
  const mapTagBySize: Record<TitleSize, keyof JSX.IntrinsicElements> = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  };

  const mapClassNameBySize: Record<TitleSize, string> = {
    xs: 'text-[16px]',
    sm: 'text-[22px]',
    md: 'text-[26px]',
    lg: 'text-[32px]',
    xl: 'text-[40px]',
    '2xl': 'text-[68px]',
  };

  const Tag = mapTagBySize[size || 'md'];
  return <Tag className={clsx(mapClassNameBySize[size || 'md'], className)}>{text}</Tag>;
};
