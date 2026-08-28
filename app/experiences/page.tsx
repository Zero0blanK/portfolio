'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Lily } from '@/components/lily';
import { RoleEntry, SeminarList, ServiceList } from '@/components/experience';
import { roles } from '@/lib/experience-data';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ExperiencesPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 paddy-field" />
      <Navbar />

      <section className="section-shell pt-32">
        <div className="section-inner max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/"
              className="font-mono filament-link text-[11px] uppercase tracking-[0.24em] text-ash hover:text-lily"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to home
            </Link>

            <div className="mt-9 flex items-start justify-between gap-8">
              <div>
                <div className="eyebrow">
                  <span aria-hidden className="eyebrow-kanji">
                    道
                  </span>
                  Path
                </div>
                <h1 className="section-title">Where I am on the way.</h1>
                <p className="section-copy">
                  One internship, three committee seats, the seminars in between, and a degree
                  still in progress. The full record, with what each one actually asked of me.
                </p>
              </div>
              <span aria-hidden className="hidden w-20 shrink-0 text-lily/15 lg:block">
                <Lily className="h-auto w-full" weight={2.6} />
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="mt-14 border-t border-border/70"
          >
            {roles.map((role) => (
              <motion.div key={role.id} variants={item}>
                <RoleEntry role={role} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16">
            <ServiceList />
          </div>

          <div className="mt-16">
            <SeminarList />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="surface-card mt-20 p-8 sm:p-12"
          >
            <h2 className="font-display text-3xl leading-tight text-foreground">
              Looking for the next one.
            </h2>
            <p className="mt-5 max-w-2xl leading-[1.85] text-muted-foreground">
              I&apos;m after a role where I can contribute to a real codebase and work alongside
              engineers further along than me. The projects are the better evidence of what I can
              do — start there.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects" className="btn-primary">
                See what I&apos;ve built
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
              <Link href="/#contact" className="btn-secondary">
                Get in touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
