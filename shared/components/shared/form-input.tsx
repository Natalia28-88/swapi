import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ClearButton } from './clear-button';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ name, label, required, className, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name); // Отслеживание значения поля
  const errorText = errors?.[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true }); // Установка значения в пустую строку
  };

  return (
    <div className={`w-full ${className || ''}`}>
      {label && (
        <label className="font-medium mb-2 text-white block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          className="h-12 text-[24px] border rounded px-3 w-full bg-transparent placeholder:text-gray-400 font-mono"
          {...register(name)}
          {...props}
        />
        {Boolean(value) && (
          <div
            onClick={onClickClear}
            className="absolute right-2 top-2 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <ClearButton />
          </div>
        )}
      </div>

      {errorText && <p className="text-red-500 mt-1">{errorText}</p>}
    </div>
  );
};
