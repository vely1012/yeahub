import { useQueryParam } from '@/shared/lib/useQueryParam';
import { useCallback } from 'react';

export function usePage() {
    const [pageStr, setPageStr] = useQueryParam('page');
    const page = parseInt(pageStr || '1', 10);
    
    const setPage = useCallback((pageArg: number | ((prevPage: number) => number)): void => {
            if (typeof pageArg === "function") {
                setPageStr((prev: string) => pageArg(parseInt(prev || '1', 10)).toString());
            } else {
                setPageStr(pageArg.toString());
            }
        }, [setPageStr]);
    
    return { page, setPage };
}