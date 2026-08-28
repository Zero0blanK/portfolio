'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Spine } from '@/components/spine';
import { roles, seminars, service, type Role } from '@/lib/experience-data';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

/** Small caps heading used to separate the three kinds of record. */
function Rubric({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">{children}</h3>
  );
}

/**
 * One role, set as a dated record: period in the margin, substance in the
 * column. Same hairline language as the project index rather than another card
 * — the page already has enough boxes.
 */
export function RoleEntry({ role }: { role: Role }) {
  return (
    <div className="grid gap-x-8 gap-y-4 border-b border-border/70 py-9 sm:py-11 lg:grid-cols-[10rem_1fr]">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-lily">{role.period}</p>
        {role.location && (
          <p className="font-mono mt-2 text-[10px] uppercase tracking-[0.16em] text-ash">
            {role.location}
          </p>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="font-display text-2xl leading-tight text-foreground sm:text-[2rem]">
          {role.title}
        </h3>
        <p className="font-mono mt-2.5 text-[11px] uppercase tracking-[0.18em] text-ash">
          {role.org}
        </p>

        <ul className="mt-6 space-y-3">
          {role.highlights.map((highlight, i) => (
            <li
              key={highlight}
              className="flex items-start gap-4 border-b border-border/50 pb-3 last:border-0 last:pb-0"
            >
              <span className="font-mono mt-0.5 shrink-0 text-[10px] tracking-[0.16em] text-ash">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm leading-[1.8] text-foreground/90">{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {role.technologies.map((tech) => (
            <span key={tech} className="pill-chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Committee seats are real, but they aren't jobs — one line each. */
export function ServiceList() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-90px' }}
    >
      <Rubric>Service</Rubric>

      <ul className="mt-6 border-t border-border/70">
        {service.map((seat) => (
          <motion.li
            key={seat.id}
            variants={item}
            className="grid gap-x-6 gap-y-1 border-b border-border/70 py-4 sm:grid-cols-[11rem_1fr]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
              {seat.period}
            </p>
            <p className="text-sm leading-snug text-foreground/90">
              {seat.title}
              <span className="text-ash"> · {seat.org}</span>
            </p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/**
 * Seminars. The one with certificates shows them; the ones without are still
 * worth a line, so they get a plain row rather than a placeholder card.
 */
export function SeminarList() {
  const withTracks = seminars.filter((s) => s.tracks?.length);
  const listed = seminars.filter((s) => !s.tracks?.length);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-90px' }}
    >
      <Rubric>Seminars</Rubric>

      {withTracks.map((seminar) => (
        <motion.div key={seminar.id} variants={item} className="mt-6 border-t border-border/70 pt-7">
          <h4 className="font-display text-xl leading-tight text-foreground sm:text-2xl">
            {seminar.title}
          </h4>
          <p className="font-mono mt-2 text-[10px] uppercase tracking-[0.16em] text-ash">
            {seminar.org}
            {seminar.date ? ` · ${seminar.date}` : ''}
            {seminar.venue ? ` · ${seminar.venue}` : ''}
          </p>

          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {seminar.tracks?.map((track) => (
              <li key={track.title}>
                <a
                  href={track.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bloom-card group block"
                >
                  <span className="relative block aspect-[3/2] overflow-hidden">
                    <Image
                      src={track.certificate}
                      alt={`Certificate of participation — ${track.title}`}
                      fill
                      sizes="(min-width: 640px) 18rem, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* Certificates are near-white; the wash keeps them in palette */}
                    <span
                      aria-hidden
                      className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-40"
                      style={{
                        background:
                          'linear-gradient(180deg, color-mix(in srgb, var(--wine) 28%, transparent) 0%, color-mix(in srgb, var(--wine) 60%, transparent) 100%)',
                      }}
                    />
                  </span>

                  <span className="block p-4">
                    <span className="block text-sm leading-snug text-foreground/90 transition-colors group-hover:text-lily">
                      {track.title}
                    </span>
                    <span className="font-mono mt-2 block text-[10px] uppercase tracking-[0.14em] text-ash">
                      {track.speaker}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}

      <ul className="mt-8 border-t border-border/70">
        {listed.map((seminar) => (
          <motion.li
            key={seminar.id}
            variants={item}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border/70 py-4"
          >
            <p className="text-sm leading-snug text-foreground/90">{seminar.title}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash">
              {seminar.org}
            </p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Experience() {
  return (
    <Spine
      id="experience"
      kanji="道"
      eyebrow="Path"
      title="Two months inside a running codebase."
      copy="Sundo Platform's app already existed when I arrived, which is the useful kind of hard: read someone else's schema, match someone else's component patterns, and leave the thing better than you found it."
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-90px' }}
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
    </Spine>
  );
}
