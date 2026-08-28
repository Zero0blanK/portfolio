'use client';

import { motion } from 'framer-motion';
import { Lily } from '@/components/lily';
import { useActiveSection } from '@/hooks/use-active-section';
import { SECTION_IDS } from '@/lib/sections';

type SpineProps = {
  id: string;
  /** Marker glyph — see lib/sections.ts for why each was chosen. */
  kanji: string;
  eyebrow: string;
  title?: React.ReactNode;
  copy?: React.ReactNode;
  /** 'start' begins the stalk at this node, 'end' terminates it below. */
  cap?: 'start' | 'end';
  /** Extra classes for the <section>. */
  className?: string;
  children: React.ReactNode;
};

/**
 * One node on the page's stalk.
 *
 * Every section renders through this, so the hairline runs unbroken from the
 * hero to the footer and the content column sits off-centre against it. The
 * node carries the section's kanji and blooms when you're reading that section
 * — the layout spine and the progress indicator are the same object.
 */
export function Spine({
  id,
  kanji,
  eyebrow,
  title,
  copy,
  cap,
  className = '',
  children,
}: SpineProps) {
  const active = useActiveSection(SECTION_IDS);
  const isActive = active === id;

  return (
    <section id={id} className={`section-shell ${className}`}>
      <div className="section-inner">
        <div className="spine">
          <div className="spine-rail" data-active={isActive} data-cap={cap}>
            <span aria-hidden className="spine-node">
              {kanji}
            </span>

            {/* The node opens into a full bloom when the section is in view */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 flex h-7 w-7 -translate-x-1/2 items-center justify-center text-lily"
              initial={false}
              animate={{ opacity: isActive ? 0.5 : 0, scale: isActive ? 2.6 : 0.6 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Lily className="h-full w-full" weight={6} stem={false} />
            </motion.span>

            {/* The stalk ends in the last bloom of the page */}
            {cap === 'end' && (
              <motion.span
                aria-hidden
                className="absolute left-0 w-10 -translate-x-1/2 translate-y-1/2 text-lily/45"
                style={{ bottom: '45%' }}
                initial={{ opacity: 0, rotate: -14 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Lily className="h-auto w-full" weight={3.5} />
              </motion.span>
            )}
          </div>

          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-90px' }}
            >
              <div className="eyebrow pt-1.5">
                {eyebrow}
                <span
                  aria-hidden
                  className="h-px w-14 sm:w-24"
                  style={{
                    background:
                      'linear-gradient(90deg, color-mix(in srgb, var(--lily) 55%, transparent), transparent)',
                  }}
                />
              </div>
              {title ? <h2 className="section-title">{title}</h2> : null}
              {copy ? <p className="section-copy">{copy}</p> : null}
            </motion.div>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
