import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useQueryParam(key: string): [string | null, (value: string | ((prev: string) => string)) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const setValue = useCallback((value: string | ((prev: string) => string)) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            const newValue = typeof value === "string" ? value : value(prev.get(key) || "");
            
            if (newValue) {
                next.set(key, newValue);
            } else {
                next.delete(key);
            }
            return next;
        });
    }, [key, setSearchParams]);
    
    return [searchParams.get(key), setValue];
}

// Кастомный хук для батчинга
export function useBatchUpdateQuery() {
    const [, setSearchParams] = useSearchParams();
    
    const batchUpdate = useCallback((updates: Record<string, string | null>) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            Object.entries(updates).forEach(([key, value]) => {
                if (value && value !== "") {
                    next.set(key, value);
                } else {
                    next.delete(key);
                }
            });
            return next;
        });
    }, [setSearchParams]);
    
    return batchUpdate;
}