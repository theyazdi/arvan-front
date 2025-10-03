"use client";
import { useEffect, useState } from 'react';

interface UseDebouncedSearchProps {
  searchTerm: string;
  delay?: number;
  minLength?: number;
}

export function useDebouncedSearch({ 
  searchTerm, 
  delay = 1000, 
  minLength = 1 
}: UseDebouncedSearchProps) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    if (searchTerm.length < minLength) {
      setDebouncedSearchTerm('');
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, delay, minLength]);

  return debouncedSearchTerm;
}
