import { cn } from '@/shared/libs/utils';
import * as React from 'react';
import { ForwardedRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = 'text', name, placeholder, ...props },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const generatedPlaceholder = placeholder || (name ? `${name}` : '');

    return (
      <input
        type={type}
        placeholder={generatedPlaceholder}
        className={cn(
          'font-mono flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref} // Переадресация рефа
        {...props} // Передаем остальные пропсы
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
