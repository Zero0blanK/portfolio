'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { theme, toggleTheme, isAnimating } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Track scroll state for navbar blur/shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Track active section via IntersectionObserver (works for both scroll directions)
  useEffect(() => {
    const sectionIds = ['about', 'work', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          } else if (entry.boundingClientRect.top > 0) {
            const prevId = sectionIds[idx - 1];
            setActiveSection(prevId ? `#${prevId}` : '');
          }
        },
        {
          rootMargin: '-50% 0px -50% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#work' },
    // { label: 'Skills', href: '#skills' },
    // { label: 'Experience', href: '#experience' },
    // { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const isHome = pathname === '/';
  const getLinkHref = (href: string) => (href.startsWith('#') && !isHome ? `/${href}` : href);

  const handleNavClick = (href: string) => {
    setActiveSection(href.startsWith('/') ? href.slice(1) : href);
    setMenuOpen(false);
  };

  const isActive = (href: string) => activeSection === href;

  // Stagger animation variants for the overlay menu
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: [0.42, 0, 1, 1], delay: 0.1 },
    },
  };

  const linkContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
    exit: {
      transition: { staggerChildren: 0.04, staggerDirection: -1 },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, x: -30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      x: 20,
      filter: 'blur(4px)',
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6"
      >
        <div className="mx-auto w-full max-w-4xl">
          <div
            className={`flex relative rounded-2xl border px-3 py-2 transition-all duration-300 sm:px-4 ${scrolled
              ? 'border-border/90 bg-background/78 shadow-[0_14px_45px_-25px_rgba(16,23,43,0.7)] backdrop-blur-xl'
              : 'border-border/70 bg-background/62 backdrop-blur-lg'
              }`}
          >
            <div className='w-full flex justify-between'>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground/95"
              >
                <span className="h-2 w-2 rounded-full bg-(--brand)" />
                Mystyvyy
              </Link>
              <div className="flex items-center gap-4">
                {/* Desktop nav links */}
                <div className="hidden items-center gap-1 md:flex">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={getLinkHref(link.href)}
                      onClick={() => handleNavClick(link.href)}
                      className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors ${isActive(link.href)
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                        }`}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-(--brand)/12"
                          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                        />
                      )}
                    </a>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={isAnimating ? {} : { scale: 1.04 }}
                    whileTap={isAnimating ? {} : { scale: 0.96 }}
                    onClick={toggleTheme}
                    disabled={isAnimating}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/70 transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-50"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    )}
                  </motion.button>

                  {/* Burger / close button with Lucide icons */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/70 md:hidden"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {menuOpen ? (
                        <motion.span
                          key="close"
                          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                          <X className="h-4.5 w-4.5" strokeWidth={2} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="menu"
                          initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                          <Menu className="h-4.5 w-4.5" strokeWidth={2} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile overlay menu */}
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
            {/* Frosted glass backdrop */}
            <div className="absolute inset-0 bg-background/85 backdrop-blur-2xl" />

            {/* Decorative brand glow orb */}
            <div
              className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, var(--brand) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="pointer-events-none absolute -left-16 bottom-1/3 h-56 w-56 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(circle, var(--brand) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />

            {/* Menu content */}
            <div className="relative flex h-full flex-col justify-center px-8 sm:px-12">
              <motion.nav
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-2"
              >
                {navLinks.map((link, i) => (
                  <motion.div key={link.label} variants={linkItemVariants}>
                    <a
                      href={getLinkHref(link.href)}
                      onClick={() => handleNavClick(link.href)}
                      className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition-colors duration-200 hover:bg-secondary/50"
                    >
                      {/* Number indicator */}
                      <span className="text-xs font-medium tabular-nums text-muted-foreground/50 font-mono">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* Accent dot for active */}
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${isActive(link.href)
                          ? 'bg-(--brand) shadow-[0_0_8px_var(--brand)]'
                          : 'bg-border group-hover:bg-muted-foreground'
                          }`}
                      />

                      {/* Label */}
                      <span
                        className={`text-3xl font-semibold tracking-tight transition-colors duration-200 ${isActive(link.href)
                          ? 'text-foreground'
                          : 'text-foreground/70 group-hover:text-foreground'
                          }`}
                      >
                        {link.label}
                      </span>

                      {/* Hover arrow */}
                      <motion.span
                        className="ml-auto text-muted-foreground/0 group-hover:text-muted-foreground transition-colors duration-200"
                        initial={false}
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </motion.span>
                    </a>

                    {/* Subtle divider between links */}
                    {i < navLinks.length - 1 && (
                      <div className="mx-4 mt-1 h-px bg-border/40" />
                    )}
                  </motion.div>
                ))}
              </motion.nav>

              {/* Bottom accent strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-12 flex items-center gap-3 px-4"
              >
                <span className="h-px flex-1 bg-linear-to-r from-transparent via-border to-transparent" />
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
                  Let&apos;s connect
                </span>
                <span className="h-px flex-1 bg-linear-to-r from-transparent via-border to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
