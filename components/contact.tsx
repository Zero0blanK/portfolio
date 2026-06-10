'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Contact() {
  const [time, setTime] = useState<string>('');
  const [phHour, setPhHour] = useState<number>(12);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const phNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
      const estTime = phNow.toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setTime(estTime);
      setPhHour(phNow.getHours());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAvailabilityStatus = () => {
    if (!mounted) return { available: true, label: 'Available' };
    const isBusinessHours = phHour >= 9 && phHour < 17;
    return {
      available: isBusinessHours,
      label: isBusinessHours ? 'Available for new projects' : 'Offline, replying next business day',
    };
  };

  const status = getAvailabilityStatus();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="contact" className="section-shell pb-16 sm:pb-20">
      <div className="section-inner">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="surface-card relative overflow-hidden p-6 sm:p-10"
        >
          <div className="absolute -left-12 top-0 h-56 w-56 rounded-full bg-(--brand) opacity-20 blur-3xl" />
          <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-400/15" />

          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <motion.div variants={item}>
              <span className="section-label">Let&apos;s build something exceptional</span>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Ready to turn your next idea into a high-performing digital product?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                I partner with teams that value intentional design, robust engineering, and product
                decisions grounded in outcomes.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="mailto:aprilbords.n@gmail.com" className="btn-primary">
                  Send an email
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/april-bords-nerosa-41a17336b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </motion.div>

            <motion.div variants={item} className="glass-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Availability
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${status.available ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}
                />
                <p className="text-sm font-medium text-foreground">{status.label}</p>
              </div>
              {mounted && <p className="mt-2 text-sm text-muted-foreground">{time} (Philippines)</p>}

              <div className="mt-6 space-y-2 border-t border-border/70 pt-6 text-sm text-muted-foreground">
                <a
                  href="https://www.facebook.com/aprilbords.nerosa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-2 py-1 transition-colors hover:bg-secondary/80 hover:text-foreground"
                >
                  Facebook
                  <span aria-hidden>{'->'}</span>
                </a>
                <a
                  href="https://github.com/Zero0blanK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-2 py-1 transition-colors hover:bg-secondary/80 hover:text-foreground"
                >
                  GitHub
                  <span aria-hidden>{'->'}</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/april-bords-nerosa-41a17336b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-2 py-1 transition-colors hover:bg-secondary/80 hover:text-foreground"
                >
                  LinkedIn
                  <span aria-hidden>{'->'}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          &copy; 2026 April Bords M. Nerosa. Designed and built with intention.
        </p>
      </div>
    </section>
  );
}
