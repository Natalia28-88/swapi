import React from 'react';
import { Input } from '..';

type Props = {
  value: string;
  onChange: (query: string) => void;
};

export const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  const handleInputСhange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      type="text"
      value={value}
      placeholder="Search for a character..."
      onChange={handleInputСhange}
      className="w-full max-w-md p-3 mb-5 font-mono"
    />
  );
};
