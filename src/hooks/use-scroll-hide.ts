import { useState, useEffect, useCallback, useRef } from 'react';

interface UseScrollHideOptions {
  threshold?: number;
  debounceMs?: number;
}

export function useScrollHide({ threshold = 10, debounceMs = 100 }: UseScrollHideOptions = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDiff = currentScrollY - lastScrollY.current;
    
    // Check if at top of page
    setIsAtTop(currentScrollY < 10);
    
    // Only trigger hide/show if scroll difference exceeds threshold
    if (Math.abs(scrollDiff) > threshold) {
      if (scrollDiff > 0 && currentScrollY > 50) {
        // Scrolling down & not at very top - hide
        setIsVisible(false);
      } else if (scrollDiff < 0) {
        // Scrolling up - show
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    }
    
    ticking.current = false;
  }, [threshold]);

  const handleScroll = useCallback(() => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!ticking.current) {
      // Use requestAnimationFrame for smooth updates
      window.requestAnimationFrame(() => {
        updateScrollState();
      });
      ticking.current = true;
    }

    // Debounce: Show bars after scrolling stops
    timeoutRef.current = setTimeout(() => {
      // If user stops scrolling, we could optionally show bars
      // setIsVisible(true);
    }, debounceMs);
  }, [updateScrollState, debounceMs]);

  useEffect(() => {
    // Only apply on mobile screens
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        window.addEventListener('scroll', handleScroll, { passive: true });
      } else {
        window.removeEventListener('scroll', handleScroll);
        setIsVisible(true);
      }
    };

    // Initial check
    handleMediaChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMediaChange);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll]);

  return { isVisible, isAtTop };
}
