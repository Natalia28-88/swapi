import React from 'react';
import { FormInput } from '.';

interface Props {
  className?: string;
}

export const CreationForm: React.FC<Props> = ({ className }) => {
  return (
    <div className="w-[500px] text-white">
      <FormInput name="name" placeholder="Please enter name" />
    </div>
  );
};
