import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>(
    handler: () => void,
    enabled: boolean = true
) {
    const ref = useRef<T>(null);
    const mouseDownTargetRef = useRef<EventTarget | null>(null);
    const hasScrolledRef = useRef(false);

    useEffect(() => {
        if (!enabled) return;

        const handleMouseDown = (event: MouseEvent) => {
            mouseDownTargetRef.current = event.target;
            hasScrolledRef.current = false;
        };

        const handleScroll = () => {
            hasScrolledRef.current = true;
        };

        const handleMouseUp = () => {
            const target = mouseDownTargetRef.current;
            
            // Если был скролл — не закрываем панель
            if (hasScrolledRef.current) {
                mouseDownTargetRef.current = null;
                hasScrolledRef.current = false;
                return;
            }
            
            // Если клик был внутри панели — не закрываем
            if (ref.current?.contains(target as Node)) {
                mouseDownTargetRef.current = null;
                return;
            }
            
            handler();
            mouseDownTargetRef.current = null;
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('scroll', handleScroll, true);
        document.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('scroll', handleScroll, true);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handler, enabled]);

    return ref;
}