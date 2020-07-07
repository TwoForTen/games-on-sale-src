import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const localValue = JSON.parse(localStorage.getItem(key));
    return !localValue ? defaultValue : localValue;
  });

  useEffect(() => {
    const getStoredValue = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', getStoredValue);

    return () => window.removeEventListener('storage', getStoredValue);
  }, [key]);

  const setLocalValue = (newValue) => {
    setValue((currentValue) => {
      const endValue =
        typeof newValue === 'function' ? newValue(currentValue) : newValue;
      localStorage.setItem(key, JSON.stringify(endValue));
      return endValue;
    });
  };
  return [value, setLocalValue];
};

export default useLocalStorage;
