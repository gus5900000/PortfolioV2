'use client';
import { useEffect, useState, useCallback, useRef } from 'react';

// Throttle function to limit the frequency of scroll event handling
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>('');
  const sectionsCache = useRef<Map<string, HTMLElement>>(new Map());

  // Memoized function to get section elements with caching
  const getSectionElements = useCallback(() => {
    const elements: { id: string; element: HTMLElement; top: number }[] = [];
    
    sectionIds.forEach(id => {
      // Try to get from cache first
      let element = sectionsCache.current.get(id);
      
      // If not in cache or element no longer exists, query DOM
      if (!element || !document.contains(element)) {
        const foundElement = document.getElementById(id);
        if (foundElement) {
          element = foundElement;
          sectionsCache.current.set(id, element);
        } else {
          // Remove from cache if element doesn't exist
          sectionsCache.current.delete(id);
          console.warn(`ScrollSpy: Section with id "${id}" not found`);
          return;
        }
      }
      
      elements.push({
        id,
        element,
        top: element.getBoundingClientRect().top + window.scrollY
      });
    });
    
    return elements.sort((a, b) => a.top - b.top);
  }, [sectionIds]);

  useEffect(() => {
    // Early return if no sections provided
    if (!sectionIds.length) {
      console.warn('ScrollSpy: No section IDs provided');
      return;
    }

    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Store the current cache reference for cleanup
    const currentCache = sectionsCache.current;
    
    // Clear cache when sectionIds change
    currentCache.clear();

    // Throttled scroll handler
    const handleScroll = throttle(() => {
      try {
        const scrollPosition = window.scrollY + offset;
        const sections = getSectionElements();
        
        if (sections.length === 0) {
          setActiveSection('');
          return;
        }

        // Find the active section
        let newActiveSection = '';
        
        for (let i = sections.length - 1; i >= 0; i--) {
          if (sections[i].top <= scrollPosition) {
            newActiveSection = sections[i].id;
            break;
          }
        }
        
        // Only update state if the active section has changed
        setActiveSection(prevActive => 
          prevActive !== newActiveSection ? newActiveSection : prevActive
        );
      } catch (error) {
        console.error('ScrollSpy: Error in scroll handler:', error);
      }
    }, 16); // ~60fps throttling

    // Initial check with error handling
    try {
      handleScroll();
    } catch (error) {
      console.error('ScrollSpy: Error in initial scroll check:', error);
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen for resize events as they can change section positions
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      currentCache.clear();
    };
  }, [sectionIds, offset, getSectionElements]);

  return activeSection;
}
