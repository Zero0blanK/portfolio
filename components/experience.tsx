'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const experiences = [
  {
    id: 1,
    title: '',
    company: '',
    period: '',
    description:
      '',
    technologies: [''],
  },
];

export function Experience() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
    <section id="experience" className="section-shell">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-label">Experience</span>
          <h2 className="section-title">
            Building products across design, engineering, and growth stages.
          </h2>
          <p className="section-copy">
            A progression of roles focused on product quality, performance, and system-level
            thinking.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative mt-12"
        >
          <div className="absolute bottom-0 left-2 top-0 hidden w-px bg-border md:block" />
          <div className="space-y-6">
            {experiences.map((exp) => (
              <motion.article key={exp.id} variants={item} className="relative md:pl-12">
                <span className="absolute left-0 top-8 hidden h-4 w-4 rounded-full border border-border bg-background md:block" />
                <div className="surface-card p-6 sm:p-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                        {exp.company}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-foreground">{exp.title}</h3>
                    </div>
                    <span className="pill-chip">{exp.period}</span>
                  </div>

                  <p className="mt-4 leading-relaxed text-muted-foreground">{exp.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="pill-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-10"
        >
          <Link href="/experiences" className="btn-secondary">
            View full timeline
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
