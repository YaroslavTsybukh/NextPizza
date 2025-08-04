import { RefObject, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<HTMLElement>, callback: VoidFunction) => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    }, [ref, callback]);
};
