'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hanko } from '@/components/hanko';

/**
 * The seal in the corner of the page.
 *
 * A Japanese composition is signed with a stamp in one corner, so the site's
 * back-to-top control is that stamp rather than a chevron in a circle. It
 * presses in once you're past the first screen — before that there is nowhere
 * to go back to.
 */
export function SealToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 1.5, rotate: -14 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.4, ease: [0.2, 1.5, 0.4, 1] }}
          className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8"
          aria-label="Back to top"
        >
          <Hanko size={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
