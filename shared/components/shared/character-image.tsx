import React, { useState } from 'react';
import { Skeleton } from '..';

interface Props {
  imageUrl: string;
  altText?: string;
}

export const CharacterImage: React.FC<Props> = ({ imageUrl, altText }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => setIsLoading(false);

  //   // Для теста
  //   React.useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 5000);
  //   });

  return (
    <div className="w-1/2 relative">
      {isLoading && <Skeleton className="absolute top-0 left-0 w-[250px] h-[300px] rounded-xl" />}
      <img
        src={imageUrl}
        alt={altText || 'Character'}
        width={250}
        height={300}
        className={`rounded-xl transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};
