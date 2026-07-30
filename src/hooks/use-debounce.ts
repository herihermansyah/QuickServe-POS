import {useEffect, useState} from "react";

export function useDebounce<T>(value: T, delay: 500): T {
  const [debounceVavlue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceVavlue;
}
