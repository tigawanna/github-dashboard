import { useState, useEffect } from "react";

export function useDebouncedValue<T = any>(
  value: T, 
  delay: number,
  onDebounced?: (value: T) => void
) {
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Skip debouncing if value hasn't changed
    if (value === debouncedValue) {
      return;
    }

    setIsDebouncing(true);
    
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
      onDebounced?.(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, onDebounced, debouncedValue]);

  return { debouncedValue, setDebouncedValue, isDebouncing };
}
