'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Lily } from '@/components/lily';
import { Spine } from '@/components/spine';

const links = [
  { label: 'GitHub', handle: '@Zero0blanK', href: 'https://github.com/Zero0blanK' },
  {
    label: 'LinkedIn',
    handle: 'april-bords-nerosa',
    href: 'https://www.linkedin.com/in/april-bords-nerosa-41a17336b/',
  },
  {
    label: 'Facebook',
    handle: 'aprilbords.nerosa',
    href: 'https://www.facebook.com/aprilbords.nerosa',
  },
];

export function Contact() {
  const [time, setTime] = useState('');
  const [phHour, setPhHour] = useState(12);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const phNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
      setTime(
        phNow.toLocaleString('en-US', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      );
      setPhHour(phNow.getHours());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const atDesk = mounted && phHour >= 9 && phHour < 17;

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <Spine
      id="contact"
      kanji="岸"
      eyebrow="Shore"
      cap="end"
      title="Say something first."
      copy={
        <>
          <span className="font-display">彼岸</span> is the far bank — the shore on the other side.
          Crossing it only takes an email. I read every one, and I answer the ones about building
          things.
        </>
      }
    >

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-90px' }}
          className="relative mt-14 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]"
        >
          <motion.div variants={item} className="surface-card relative overflow-hidden p-8 sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-16 w-96 text-lily/[0.06]"
            >
              <Lily className="h-auto w-full" weight={1.6} />
            </div>

            <div className="relative">
              <a
                href="mailto:aprilbords.n@gmail.com"
                className="font-display group inline-block text-2xl leading-tight text-foreground transition-colors hover:text-lily sm:text-4xl"
              >
                aprilbords.n@gmail.com
                <span
                  aria-hidden
                  className="mt-2 block h-px w-full origin-left scale-x-[0.45] transition-transform duration-500 ease-out group-hover:scale-x-100"
                  style={{
                    background:
                      'linear-gradient(90deg, var(--lily), color-mix(in srgb, var(--lily) 10%, transparent))',
                  }}
                />
              </a>

              <p className="mt-7 max-w-lg leading-[1.85] text-muted-foreground">
                Open to internships, junior full-stack roles, and project collaborations. If you
                have a brief, send it — if you only have a problem, send that instead.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href="mailto:aprilbords.n@gmail.com" className="btn-primary">
                  Send an email
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
                <a
                  href="/CV-April-Bords-Nerosa.pdf"
                  download="CV-April-Bords-Nerosa.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="surface-card flex flex-col p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">Status</p>

            <div className="mt-5 flex items-center gap-3">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${atDesk ? 'animate-pulse' : ''}`}
                style={{ background: atDesk ? 'var(--stem)' : 'var(--ash)' }}
              />
              <p className="text-sm leading-snug text-foreground">
                {atDesk ? 'At the desk now' : 'Away — replies next business day'}
              </p>
            </div>

            {mounted && (
              <p className="font-mono mt-3 text-[11px] uppercase tracking-[0.2em] text-ash">
                {time} · Davao, PH (UTC+8)
              </p>
            )}

            <div className="mt-8 space-y-px border-t border-border/70 pt-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between border-b border-border/60 py-3 transition-colors"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/85 transition-colors group-hover:text-lily">
                    {link.label}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.06em] text-ash transition-transform duration-300 group-hover:-translate-x-0.5">
                    {link.handle}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-20 flex items-center gap-5 border-t border-border/70 pt-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ash">
            © 2026 April Bords M. Nerosa
          </p>
          <span aria-hidden className="h-px flex-1 bg-border/70" />
          <span className="font-display text-sm text-lily/70">彼岸花</span>
        </div>
    </Spine>
  );
}
