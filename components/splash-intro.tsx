'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ANTHERS, PETALS, STAMENS, STEM_PATH, rotateAtNode } from '@/components/lily';
import { Hanko } from '@/components/hanko';

/**
 * The bloom.
 *
 * Composed as a printed plate rather than a loading screen: crop marks at the
 * corners, the flower's title set vertically down the left edge the way a
 * hanging scroll is inscribed, the season it blooms in on the right, the
 * imprint at bottom right. The lily draws itself out of the ground in the
 * middle of it.
 *
 * Runs 4.2s end to end. The overlay ships in the static HTML rather than
 * mounting after hydration, so the page never flashes behind it; a repeat visit
 * in the same tab removes it before first paint, and any key or click skips.
 */

const SEEN_KEY = 'higanbana:bloomed';

/**
 * Every beat in one table, in seconds.
 *
 * Three movements, and the third is the one that's easy to forget: the plate
 * draws (0 → 1.9), the type and seal land (1.55 → 2.90), then it *holds* fully
 * assembled for 0.65s before lifting. Without that hold the exit overlaps the
 * last element still settling and the whole thing reads as cut off, however
 * long the individual animations are.
 *
 * `assembled` is the moment nothing is still moving. Keep `exitAt` at or after
 * it — that gap is the hold, and it is what makes the sequence feel composed.
 */
const T = {
  crop: { at: 0, dur: 0.6 },
  ground: { at: 0.1, dur: 0.7 },
  stem: { at: 0.28, dur: 0.55 },
  stamen: { at: 0.5, dur: 0.85, stagger: 0.07 },
  petal: { at: 0.75, dur: 0.8, stagger: 0.07 },
  ghost: { at: 1.15 },
  glow: { at: 1.3 },
  anther: { at: 1.55, stagger: 0.05 },
  title: { at: 1.55 },
  season: { at: 1.65 },
  name: { at: 1.75 },
  role: { at: 2.05 },
  seal: { at: 2.25 },
  meta: { at: 2.4 },
  /** Last pixel stops moving here (meta at 2.40 + its 0.5s settle). */
  assembled: 2.9,
  exitAt: 3550,
  exitDur: 0.65,
} as const;

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Resolved once per page load, before any component mounts, so the hero can
 * time its entrance to the curtain lifting on a first visit and skip the wait
 * entirely on a repeat one.
 */
const splashWillPlay = (() => {
  if (typeof window === 'undefined') return true;
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return true;
  }
})();

/** Delay to hang an entrance animation off, in seconds. */
export function introDelay(base = 0) {
  return (splashWillPlay ? T.exitAt / 1000 + 0.2 : 0.1) + base;
}

/** Fixed, not themed — this curtain runs before the theme resolves. */
const INK = '#0b0608';
const LILY = '#e4304a';
const EMBER = '#ff6b5b';
const WINE = '#7a0f22';
const RICE = '#f2e9e4';
const ASH = '#8a6f74';

/**
 * Sparks lifting off the anthers, in two waves — the second drifts through the
 * hold so the finished plate still has something alive in it before it lifts.
 */
const EMBERS = [
  { x: -58, drift: -14, delay: 1.7, dur: 1.9, size: 2.5, rise: 84 },
  { x: -22, drift: 10, delay: 1.88, dur: 2.1, size: 1.8, rise: 108 },
  { x: 12, drift: -8, delay: 1.78, dur: 1.8, size: 3, rise: 72 },
  { x: 44, drift: 16, delay: 2.0, dur: 2.0, size: 2, rise: 96 },
  { x: 68, drift: -6, delay: 1.94, dur: 1.7, size: 2.4, rise: 66 },
  { x: -74, drift: 8, delay: 2.45, dur: 1.9, size: 2, rise: 92 },
  { x: 30, drift: -12, delay: 2.62, dur: 1.7, size: 2.6, rise: 78 },
  { x: -6, drift: 14, delay: 2.8, dur: 1.6, size: 1.8, rise: 100 },
];

const FALLING_PETALS = [
  { x: '16%', delay: 0, drift: -26, spin: -38, size: 13 },
  { x: '30%', delay: 0.06, drift: 18, spin: 44, size: 9 },
  { x: '45%', delay: 0.02, drift: -12, spin: 25, size: 16 },
  { x: '58%', delay: 0.1, drift: 30, spin: -52, size: 10 },
  { x: '72%', delay: 0.04, drift: -20, spin: 33, size: 14 },
  { x: '86%', delay: 0.08, drift: 14, spin: -29, size: 8 },
];

/** L-shaped crop marks, one per corner. */
const CROP_CORNERS = [
  { pos: 'left-6 top-6 sm:left-9 sm:top-9', d: 'M0 22 L0 0 L22 0' },
  { pos: 'right-6 top-6 sm:right-9 sm:top-9', d: 'M10 22 L32 22 L32 0', box: true },
  { pos: 'left-6 bottom-6 sm:left-9 sm:bottom-9', d: 'M0 0 L0 22 L22 22' },
  { pos: 'right-6 bottom-6 sm:right-9 sm:bottom-9', d: 'M10 0 L32 0 L32 22', box: true },
];

export function SplashIntro() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(SEEN_KEY)) setVisible(false);
    } catch {
      // Blocked storage — just play the intro.
    }
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Nothing to do; the intro simply plays again next load.
    }
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    // Don't yank the reader away from a deep link like /#contact
    if (!window.location.hash) window.scrollTo(0, 0);

    timers.current.push(setTimeout(dismiss, reduceMotion ? 900 : T.exitAt));

    window.addEventListener('keydown', dismiss);
    window.addEventListener('pointerdown', dismiss);

    return () => {
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('pointerdown', dismiss);
      timers.current.forEach(clearTimeout);
      timers.current = [];
      document.body.style.overflow = '';
    };
  }, [visible, dismiss, reduceMotion]);

  /** Stroke-drawing transition for an SVG path. */
  const draw = (at: number, dur: number) => ({
    pathLength: { duration: dur, delay: at, ease: [0.33, 0.9, 0.42, 1] as const },
    opacity: { duration: 0.18, delay: at },
  });

  /** Fade/rise for a piece of the plate's furniture. */
  const settle = (at: number, dur = 0.7) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: dur, delay: reduceMotion ? 0 : at, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-200 flex select-none items-center justify-center overflow-hidden"
          style={{ backgroundColor: INK }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reduceMotion ? 1 : 1.07,
            filter: reduceMotion ? 'blur(0px)' : 'blur(6px)',
            transition: { duration: reduceMotion ? 0.25 : T.exitDur, ease: [0.7, 0, 0.84, 0] },
          }}
        >
          {/* Ink wash pooling under the flower */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(58% 44% at 50% 60%, ${WINE}66 0%, transparent 72%)`,
            }}
          />

          {/* ── Corner crop marks ── */}
          {CROP_CORNERS.map((corner, i) => (
            <svg
              key={`crop-${i}`}
              aria-hidden
              viewBox="0 0 32 22"
              fill="none"
              className={`pointer-events-none absolute h-5 w-7 ${corner.pos}`}
            >
              <motion.path
                d={corner.d}
                stroke={LILY}
                strokeWidth={1}
                opacity={0.55}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={draw(reduceMotion ? 0 : T.crop.at + i * 0.05, T.crop.dur)}
              />
            </svg>
          ))}

          {/* ── Top left: the flower's name, inscribed down the edge ── */}
          <motion.div
            {...settle(T.title.at)}
            className="pointer-events-none absolute left-6 top-16 flex flex-col items-center gap-3 sm:left-9 sm:top-20"
          >
            <span
              className="font-display writing-vertical text-sm sm:text-base"
              style={{ color: LILY, letterSpacing: '0.28em' }}
            >
              彼岸花
            </span>
            <span className="h-10 w-px" style={{ background: `${LILY}55` }} />
            <span
              className="font-mono writing-vertical text-[9px] uppercase"
              style={{ color: ASH, letterSpacing: '0.3em' }}
            >
              higanbana
            </span>
          </motion.div>

          {/* ── Top right: the season it blooms in ── */}
          <motion.div
            {...settle(T.season.at)}
            className="pointer-events-none absolute right-6 top-16 text-right sm:right-9 sm:top-20"
          >
            <p className="font-display text-sm sm:text-base" style={{ color: RICE, opacity: 0.75 }}>
              秋分
            </p>
            <p
              className="font-mono mt-1.5 text-[9px] uppercase"
              style={{ color: ASH, letterSpacing: '0.26em' }}
            >
              autumn equinox
            </p>
          </motion.div>

          {/* ── The plate ── */}
          <div className="relative flex flex-col items-center px-6">
            <div className="relative">
              {/* Ignition glow at the node */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[64%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: `radial-gradient(circle, ${LILY}88 0%, transparent 68%)` }}
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{
                  opacity: [0, 0.9, 0.42, 0.62, 0.44],
                  scale: [0.2, 1.15, 1, 1.06, 1],
                }}
                transition={{
                  duration: reduceMotion ? 0.6 : 2.3,
                  delay: reduceMotion ? 0 : T.glow.at,
                  times: [0, 0.2, 0.44, 0.74, 1],
                  ease: 'easeInOut',
                }}
              />

              {/* A second bloom set behind and larger, for depth */}
              <motion.svg
                viewBox="0 0 200 200"
                fill="none"
                aria-hidden
                className="absolute -left-16 -top-10 h-72 w-72 sm:-left-24 sm:h-96 sm:w-96"
                stroke={WINE}
                strokeLinecap="round"
                initial={{ opacity: 0, rotate: -14 }}
                animate={{ opacity: 0.5, rotate: -9 }}
                transition={{ duration: 1.4, delay: reduceMotion ? 0 : T.ghost.at }}
              >
                {PETALS.map((p, i) => (
                  <path key={`g-${i}`} d={p.d} transform={rotateAtNode(p.rotate)} strokeWidth={2} />
                ))}
                {STAMENS.map((s, i) => (
                  <path
                    key={`gs-${i}`}
                    d={s.d}
                    transform={rotateAtNode(s.rotate)}
                    strokeWidth={1.2}
                  />
                ))}
              </motion.svg>

              {/* Sparks lifting off the anthers */}
              {!reduceMotion &&
                EMBERS.map((ember, i) => (
                  <motion.span
                    key={`ember-${i}`}
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-[58%] rounded-full"
                    style={{
                      width: ember.size,
                      height: ember.size,
                      background: EMBER,
                      marginLeft: ember.x,
                    }}
                    initial={{ opacity: 0, y: 0, x: 0 }}
                    animate={{ opacity: [0, 0.9, 0], y: -ember.rise, x: ember.drift }}
                    transition={{ duration: ember.dur, delay: ember.delay, ease: 'easeOut' }}
                  />
                ))}

              <svg
                viewBox="0 0 200 210"
                fill="none"
                aria-hidden
                className="relative h-56 w-56 sm:h-72 sm:w-72"
                stroke={LILY}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: `drop-shadow(0 0 16px ${LILY}66)` }}
              >
                {/* The ground it rises out of */}
                <motion.path
                  d="M14 204 L186 204"
                  strokeWidth={1}
                  opacity={0.34}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  style={{ transformOrigin: 'center' }}
                  transition={draw(reduceMotion ? 0 : T.ground.at, T.ground.dur)}
                />

                <motion.path
                  d={STEM_PATH}
                  strokeWidth={2}
                  opacity={0.55}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={draw(reduceMotion ? 0 : T.stem.at, T.stem.dur)}
                />

                {/* Stamens reach first — the spider legs open before the petals */}
                {STAMENS.map((s, i) => (
                  <motion.path
                    key={`s-${i}`}
                    d={s.d}
                    transform={rotateAtNode(s.rotate)}
                    strokeWidth={1.7}
                    opacity={0.85}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={draw(
                      reduceMotion ? 0 : T.stamen.at + i * T.stamen.stagger,
                      T.stamen.dur,
                    )}
                  />
                ))}

                {PETALS.map((p, i) => (
                  <motion.path
                    key={`p-${i}`}
                    d={p.d}
                    transform={rotateAtNode(p.rotate)}
                    strokeWidth={3}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={draw(
                      reduceMotion ? 0 : T.petal.at + i * T.petal.stagger,
                      T.petal.dur,
                    )}
                  />
                ))}

                {/* Anthers ignite last, tip by tip */}
                {ANTHERS.map((a, i) => (
                  <motion.circle
                    key={`a-${i}`}
                    cx={a.cx}
                    cy={a.cy}
                    r={3.2}
                    transform={rotateAtNode(a.rotate)}
                    fill={EMBER}
                    stroke="none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    transition={{
                      duration: 0.45,
                      delay: reduceMotion ? 0 : T.anther.at + i * T.anther.stagger,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* Name resolving out of blur */}
            <motion.h1
              className="font-display mt-1 flex flex-wrap justify-center gap-x-[0.3em] text-center text-3xl sm:text-5xl"
              style={{ color: RICE }}
              initial="hidden"
              animate="shown"
              transition={{ staggerChildren: 0.09, delayChildren: reduceMotion ? 0 : T.name.at }}
            >
              {['April', 'Bords', 'Nerosa'].map((word) => (
                <motion.span
                  key={word}
                  variants={{
                    hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
                    shown: { opacity: 1, y: 0, filter: 'blur(0px)' },
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div {...settle(T.role.at, 0.5)} className="mt-5 flex items-center gap-3">
              <span className="h-px w-8 sm:w-12" style={{ background: `${LILY}88` }} />
              <span
                className="font-mono text-[10px] uppercase sm:text-[11px]"
                style={{ color: ASH, letterSpacing: '0.32em' }}
              >
                Full-stack developer
              </span>
              <span className="h-px w-8 sm:w-12" style={{ background: `${LILY}88` }} />
            </motion.div>
          </div>

          {/* ── Bottom left: where ── */}
          <motion.p
            {...settle(T.meta.at, 0.5)}
            className="font-mono pointer-events-none absolute bottom-16 left-6 text-[9px] uppercase sm:bottom-20 sm:left-9"
            style={{ color: ASH, letterSpacing: '0.26em' }}
          >
            Davao · 7°04′N 125°36′E
          </motion.p>

          {/* ── Bottom right: the seal, pressed ── */}
          <motion.div
            className="pointer-events-none absolute bottom-14 right-6 sm:bottom-16 sm:right-9"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.9, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.45,
              delay: reduceMotion ? 0 : T.seal.at,
              ease: [0.2, 1.5, 0.4, 1],
            }}
          >
            <Hanko ink={INK} size={2.4} />
          </motion.div>

          {/* Petals shed as the curtain lifts */}
          {!reduceMotion &&
            FALLING_PETALS.map((petal, i) => (
              <motion.span
                key={`fall-${i}`}
                aria-hidden
                className="pointer-events-none absolute top-1/2"
                style={{
                  left: petal.x,
                  width: petal.size,
                  height: petal.size * 2.1,
                  borderRadius: '60% 60% 60% 60% / 90% 90% 20% 20%',
                  background: `linear-gradient(160deg, ${LILY}, ${WINE})`,
                }}
                initial={{ opacity: 0, y: -10, rotate: 0 }}
                animate={{ opacity: 0 }}
                exit={{
                  opacity: [0, 0.85, 0],
                  y: [0, 220],
                  x: [0, petal.drift],
                  rotate: [0, petal.spin],
                  transition: { duration: 0.9, delay: petal.delay, ease: 'easeIn' },
                }}
              />
            ))}

          {mounted && (
            <button
              type="button"
              onClick={dismiss}
              className="font-mono absolute bottom-6 right-6 text-[9px] uppercase transition-colors hover:text-[#f2e9e4] sm:bottom-7 sm:right-9"
              style={{ color: ASH, letterSpacing: '0.3em' }}
            >
              Skip
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
