'use client';

import { motion } from 'framer-motion';

/** Half a spray — mirrored at render time to make the full fan. */
const FILAMENTS = [
  'M600 44 C512 41 402 32 286 17',
  'M600 44 C498 43 372 39 214 30',
  'M600 44 C520 45 396 50 236 57',
];

/**
 * Divider drawn as a spray of stamens rather than a rule.
 *
 * Used on the pages that don't run on the spine (the archive, where the card
 * grid needs its own breathing room). The home page doesn't need it — the
 * stalk already runs through every section there.
 */
export function FilamentDivider({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none w-full ${className}`}>
      <motion.svg
        viewBox="0 0 1200 60"
        fill="none"
        preserveAspectRatio="none"
        className="h-10 w-full text-lily"
        initial="rest"
        whileInView="drawn"
        viewport={{ once: true, margin: '-40px' }}
      >
        {[1, -1].map((direction) =>
          FILAMENTS.map((d, i) => (
            <motion.path
              key={`${direction}-${i}`}
              d={d}
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              opacity={0.34 - i * 0.07}
              transform={direction === -1 ? 'matrix(-1 0 0 1 1200 0)' : undefined}
              variants={{ rest: { pathLength: 0 }, drawn: { pathLength: 1 } }}
              transition={{ duration: 1.1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          )),
        )}
        <motion.circle
          cx={600}
          cy={44}
          r={2.4}
          fill="currentColor"
          variants={{ rest: { opacity: 0, scale: 0 }, drawn: { opacity: 0.75, scale: 1 } }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </motion.svg>
    </div>
  );
}
