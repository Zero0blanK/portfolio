'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="hero" className="section-shell pt-28 sm:pt-36">
      <div className="section-inner">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12"
        >
          <div className="space-y-8">
            <motion.div variants={item} className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Code. <span className="text-background bg-foreground px-4 py-1 rounded-md">Design.</span> Deliver.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                I'm April Bords Nerosa, a full-stack developer focused on creating reliable web applications, intuitive user experiences, and maintainable systems that help products grow.
              </p>
            </motion.div>
            <motion.div variants={item} className="flex flex-wrap gap-3">
              <a href="#work" className="btn-primary">
                Explore my work
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <a href="#contact" className="btn-secondary">
                Let&apos;s collaborate
              </a>
            </motion.div>
          </div>

          <motion.div variants={item} className="relative">
            <div className="surface-card rounded-md overflow-hidden p-4 sm:p-5">
              <div className="relative h-95 overflow-hidden rounded-2xl border border-border/70 sm:h-125">
                <Image
                  src="/user.jpg"
                  alt="April Bords M. Nerosa"
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-black/55 p-4 text-white">
                  <p className="text-sm font-semibold">April Bords M. Nerosa</p>
                  <p className="text-xs text-white/80">Bachelor of Science in Computer Science</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/70 bg-background/75 p-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Current focus</p>
                  <p className="mt-1 text-sm font-medium text-foreground">Full-stack development</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/75 p-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Availability</p>
                  <p className="mt-1 text-sm font-medium text-foreground">Open for selected projects</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
