'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Lily } from '@/components/lily';
import { SECTIONS, SECTION_IDS } from '@/lib/sections';
import { useActiveSection } from '@/hooks/use-active-section';

/** Plain-English nav labels; the kanji comes from the section table. */
const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

const kanjiFor = (id: string) => SECTIONS.find((s) => s.id === id)?.kanji ?? '';

export function Navbar() {
  const { theme, toggleTheme, isAnimating } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isHome = pathname === '/';
  const activeSection = useActiveSection(SECTION_IDS, isHome);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const isActive = (id: string) => isHome && activeSection === id;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const } },
    exit: { opacity: 0, transition: { duration: 0.25, delay: 0.08 } },
  };

  const linkContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
    exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, x: -24, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
    exit: { opacity: 0, x: 16, filter: 'blur(4px)', transition: { duration: 0.2 } },
  };

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`border-b transition-all duration-500 ${
            scrolled
              ? 'border-border/80 bg-background/80 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="text-lily transition-transform duration-500 group-hover:rotate-[18deg]">
                <Lily className="h-6 w-6" weight={7} stem={false} />
              </span>
              <span className="font-display text-[15px] tracking-wide text-foreground">
                Mystyvyy
              </span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-3">
              <div className="hidden items-center md:flex">
                {NAV.map((link) => (
                  <a
                    key={link.id}
                    href={hrefFor(link.id)}
                    onClick={() => setMenuOpen(false)}
                    className={`font-mono relative px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                      isActive(link.id)
                        ? 'text-lily'
                        : 'text-ash hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    {isActive(link.id) && (
                      <motion.span
                        layoutId="nav-filament"
                        className="absolute inset-x-3 -bottom-px h-px"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, var(--lily), transparent)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                disabled={isAnimating}
                className="inline-flex h-9 w-9 items-center justify-center border border-border/80 text-ash transition-colors hover:border-lily/50 hover:text-lily disabled:pointer-events-none disabled:opacity-40"
                style={{ borderRadius: 'var(--radius)' }}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {theme === 'dark' ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.6}
                      d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.6}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-9 w-9 items-center justify-center border border-border/80 text-ash transition-colors hover:border-lily/50 hover:text-lily md:hidden"
                style={{ borderRadius: 'var(--radius)' }}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X className="h-4 w-4" strokeWidth={1.8} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu className="h-4 w-4" strokeWidth={1.8} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-background/94 backdrop-blur-2xl" />

            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full opacity-25"
              style={{
                background: 'radial-gradient(circle, var(--lily) 0%, transparent 70%)',
                filter: 'blur(70px)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 bottom-10 w-80 text-lily/10"
            >
              <Lily className="h-auto w-full" weight={1.6} />
            </div>

            <div className="relative flex h-full flex-col justify-center px-8">
              <motion.nav
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col"
              >
                {NAV.map((link) => (
                  <motion.a
                    key={link.id}
                    variants={linkItemVariants}
                    href={hrefFor(link.id)}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-5 border-b border-border/60 py-6"
                  >
                    <span
                      aria-hidden
                      className={`font-display text-2xl leading-none transition-colors duration-300 ${
                        isActive(link.id) ? 'text-lily' : 'text-ash/60 group-hover:text-lily'
                      }`}
                    >
                      {kanjiFor(link.id)}
                    </span>
                    <span
                      className={`font-display text-4xl transition-colors duration-300 ${
                        isActive(link.id) ? 'text-lily' : 'text-foreground'
                      }`}
                    >
                      {link.label}
                    </span>
                    <svg
                      className="ml-auto h-5 w-5 text-ash/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-lily"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.4}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </motion.a>
                ))}
              </motion.nav>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="font-mono mt-12 text-[10px] uppercase tracking-[0.3em] text-ash"
              >
                <span className="font-display">彼岸花</span> — Davao, Philippines
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
