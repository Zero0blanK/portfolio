'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which section owns the middle of the viewport.
 *
 * Shared by the navbar and the stem rail so the two can never disagree about
 * where the reader is. Returns a bare id (`"about"`), not a hash.
 */
export function useActiveSection(sectionIds: readonly string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    const observers = sectionIds.flatMap((id) => {
      const el = document.getElementById(id);
      if (!el) return [];

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        // A thin band across the middle of the screen, so the active section
        // flips at the same place scrolling up or down.
        { rootMargin: '-50% 0px -48% 0px', threshold: 0 },
      );

      observer.observe(el);
      return [observer];
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [sectionIds, enabled]);

  return active;
}
