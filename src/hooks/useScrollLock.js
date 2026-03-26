import { useLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

/**
 * Global counter to handle multiple overlapping modals.
 */
let lockCount = 0;

export const ScrollLockHandler = () => {
    const lenis = useLenis();
    const isLockedRef = useRef(false);

    useEffect(() => {
        const handleLock = (e) => {
            const shouldLock = e.detail;
            
            if (shouldLock) {
                lockCount++;
            } else {
                lockCount = Math.max(0, lockCount - 1);
            }

            const targetLocked = lockCount > 0;

            if (targetLocked !== isLockedRef.current) {
                isLockedRef.current = targetLocked;
                if (targetLocked) {
                    lenis?.stop();
                    document.body.style.overflow = 'hidden';
                } else {
                    lenis?.start();
                    document.body.style.overflow = '';
                }
            }
        };

        window.addEventListener('lenis-scroll-lock', handleLock);
        
        return () => {
            window.removeEventListener('lenis-scroll-lock', handleLock);
            // Cleanup: make sure scroll is restored if component unmounts
            if (isLockedRef.current) {
                lenis?.start();
                document.body.style.overflow = '';
            }
        };
    }, [lenis]);

    return null;
};

/**
 * Hook to trigger the scroll lock.
 * @param {boolean} isLocked - Whether this component wants to lock the scroll.
 */
export const useScrollLock = (isLocked) => {
    useEffect(() => {
        if (isLocked) {
            window.dispatchEvent(new CustomEvent('lenis-scroll-lock', { detail: true }));
            return () => {
                window.dispatchEvent(new CustomEvent('lenis-scroll-lock', { detail: false }));
            };
        }
    }, [isLocked]);
};
