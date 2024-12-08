import React from 'react';

export const useClientSideStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = React.useState<T>(() => {
    // Инициализация только при монтировании
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    }
    return defaultValue;
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setValue(JSON.parse(storedValue));
      }
    }
  }, [key]); // Зависимость только от ключа

  const setStoredValue = React.useCallback(
    (newValue: T) => {
      setValue(newValue);
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    },
    [key],
  ); // Используем useCallback для оптимизации

  return [value, setStoredValue] as const;
};
