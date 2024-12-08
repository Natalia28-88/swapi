import Link from 'next/link';
import React from 'react';
import { Container, Title } from './';
import { Button } from '../ui';
import { BookOpenCheck, ListPlus } from 'lucide-react';

interface Props {
  className?: string;
}

export const EmptyFavorites: React.FC<Props> = ({ className }) => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-20 max-w-[700px]">
        <div className="mb-6 text-center ">
          <ListPlus size={64} className="text-gray-400 mb-4" />
        </div>
        <Title text="Your favorites are empty" size="xl" className="text-gray-400 mb-4" />
        <p className="text-gray-400 mb-6 text-center">
          It looks like you haven&apos;t added any characters to your favorites yet. Start by
          browsing and adding characters to your list.
        </p>
        <Link href="/" passHref>
          <Button
            className="uppercase font-mono text-[20px] tracking-[10px] mt-10"
            variant={'ghost'}
          >
            Go to Characters
          </Button>
        </Link>
      </div>
    </Container>
  );
};
