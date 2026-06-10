'use client';

import { Navbar } from '@/components/navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';

const allExperiences = [
  {
    id: 1,
    title: '',
    company: '',
    period: '',
    location: '',
    description: '',
    responsibilities: ['', '', '', ''],
    technologies: [''],
  },
];

export default function ExperiencesPage() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55 },
    },
  };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-35"
      />
      <Navbar />

      <section className="section-shell pt-32">
        <div className="section-inner max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to home
            </Link>
            <span className="section-label mt-6 w-fit">Career timeline</span>
            <h1 className="section-title">Experience shaping products across disciplines.</h1>
            <p className="section-copy">
              Detailed context on roles, responsibilities, and technical scope across product
              design, frontend, backend, and architecture work.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="relative mt-12"
          >
            <div className="absolute bottom-0 left-2 top-0 hidden w-px bg-border md:block" />

            <div className="space-y-6">
              {allExperiences.length === 1 ? (
                <motion.div variants={item} className="surface-card p-8 text-center">
                  <h3 className="text-2xl font-semibold text-foreground">
                    My Development Journey
                  </h3>

                  <p className="mt-4 max-w-2xl mx-auto leading-relaxed text-muted-foreground">
                    I'm a Computer Science student with a strong interest in full-stack development. I enjoy solving problems, learning new technologies, and building applications that are both practical and user-friendly. My academic and personal projects have helped me develop a solid foundation in modern web development.
                  </p>

                  <p className="mt-4 max-w-2xl mx-auto leading-relaxed text-muted-foreground">
                    I'm actively seeking internship opportunities where I can contribute,
                    collaborate with experienced engineers, and continue growing as a developer.
                  </p>
                </motion.div>
              ) : (
                allExperiences.map((exp) => (
                  <motion.article key={exp.id} variants={item} className="relative md:pl-12">
                    <span className="absolute left-0 top-8 hidden h-4 w-4 rounded-full border border-border bg-background md:block" />

                    <div className="surface-card p-6 sm:p-7">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                            {exp.company}
                          </p>
                          <h2 className="mt-2 text-2xl font-semibold text-foreground">
                            {exp.title}
                          </h2>
                          <p className="mt-1 text-sm text-muted-foreground">{exp.location}</p>
                        </div>
                        <span className="pill-chip">{exp.period}</span>
                      </div>

                      <p className="mt-4 leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>

                      <div className="mt-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                          Key responsibilities
                        </p>
                        <ul className="mt-3 grid gap-2">
                          {exp.responsibilities.map((resp) => (
                            <li
                              key={resp}
                              className="flex items-start gap-2 text-sm text-foreground/90"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--brand)" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="pill-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="glass-card p-6 text-center sm:p-8">
              <p className="text-lg text-foreground">
                Need a product-minded design + engineering partner?
              </p>
              <Link href="/#contact" className="btn-primary mt-4">
                Start a conversation
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
