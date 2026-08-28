'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Lily } from '@/components/lily';
import { Hanko } from '@/components/hanko';
import { Spine } from '@/components/spine';
import { introDelay } from '@/components/splash-intro';

/**
 * A ledger, not a stat block — checkable facts set as records with the source
 * alongside, the way a citation reads.
 */
const LEDGER = [
  { value: '1,000+', label: 'Students checked in through UMAttend', source: 'UM Intramurals 2025' },
  {
    value: '1st RU',
    label: 'Quantum computing & cybersecurity CTF, five-person team',
    source: 'QCSP · Jun 2026',
  },
  { value: '2nd RU', label: 'Hack4Gov regional, four-person team', source: 'DICT · Oct 2025' },
  { value: '3', label: 'IT Specialist certifications', source: 'Certiport · 2024–26' },
];

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: introDelay() },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Spine id="home" kanji="序" eyebrow="Prologue" cap="start" className="pt-32 sm:pt-40">
      {/* The mark, blown up and bled off the right edge */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.8, delay: introDelay(-0.1), ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -right-40 -top-24 hidden w-[42rem] text-lily/[0.06] xl:block"
      >
        <Lily className="h-auto w-full" weight={1.4} />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16"
      >
        <div>
          <motion.h1
            variants={item}
            className="font-display mt-7 max-w-2xl text-[2.9rem] leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.2rem]"
          >
            I build the part
            <br />
            that holds
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-lily">everything up.</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1.5 -z-0 h-3"
                style={{
                  background:
                    'linear-gradient(90deg, color-mix(in srgb, var(--lily) 22%, transparent), transparent)',
                }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-base leading-[1.85] text-muted-foreground sm:text-[1.0625rem]"
          >
            April Bords Nerosa — full-stack developer in Davao. Download queues that retry and back
            off, REST APIs that hold through a thousand concurrent check-ins, and schemas that
            don&apos;t need rewriting six months later. Fresh off a development internship at
            Sundo Platform, and finishing a BS in Computer Science.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className="btn-primary">
              See the work
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <a href="#contact" className="btn-secondary">
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* ── Portrait as a hanging scroll ──
            Rods overhanging a narrow panel, seal at the foot. A kakemono is
            tall and narrow by construction, which is what makes it read as
            something hung rather than as a profile card. */}
        <motion.figure variants={item} className="relative mx-auto w-56 shrink-0 sm:w-64 lg:mx-0">
          <span
            aria-hidden
            className="block h-1.5 w-[calc(100%+1.75rem)] -translate-x-3.5"
            style={{ background: 'linear-gradient(90deg, var(--wine), var(--lily), var(--wine))' }}
          />

          <div className="relative overflow-hidden border-x border-border">
            <div className="relative h-[22rem] sm:h-[26rem]">
              <Image
                src="/user.jpg"
                alt="April Bords Nerosa"
                fill
                priority
                sizes="16rem"
                className="object-cover object-top"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, color-mix(in srgb, var(--wine) 20%, transparent) 0%, transparent 38%, color-mix(in srgb, var(--wine) 62%, transparent) 100%)',
                }}
              />
            </div>
          </div>

          <span
            aria-hidden
            className="block h-1.5 w-[calc(100%+1.75rem)] -translate-x-3.5"
            style={{ background: 'linear-gradient(90deg, var(--wine), var(--lily), var(--wine))' }}
          />

          <figcaption className="mt-4 flex items-end justify-between gap-3">
            <span>
              <span className="font-display block text-[15px] text-foreground">
                April Bords M. Nerosa
              </span>
              <span className="font-mono mt-1 block text-[9px] uppercase tracking-[0.2em] text-ash">
                BS Computer Science
              </span>
            </span>
            <Hanko size={1.9} />
          </figcaption>
        </motion.figure>
      </motion.div>

      {/* Ledger */}
      <motion.dl
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: introDelay(0.55), ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 max-w-2xl border-t border-border/70"
      >
        {LEDGER.map((row) => (
          <div
            key={row.value}
            className="flex items-baseline gap-4 border-b border-border/70 py-3.5 sm:gap-6"
          >
            <dt className="font-mono w-20 shrink-0 text-sm font-medium text-lily">{row.value}</dt>
            <dd className="flex-1 text-sm leading-snug text-foreground/85">{row.label}</dd>
            <dd className="font-mono hidden shrink-0 text-[10px] uppercase tracking-[0.18em] text-ash sm:block">
              {row.source}
            </dd>
          </div>
        ))}
      </motion.dl>
    </Spine>
  );
}
