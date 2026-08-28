'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { ProjectCard } from '@/components/project-card';
import { ProjectDetailDialog } from '@/components/project-detail-dialog';
import { FilamentDivider } from '@/components/filament-divider';
import { Lily } from '@/components/lily';
import { projectCatalog } from '@/lib/project-data';
import { miniCatalog } from '@/lib/project-mini-data';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ProjectsPage() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const openProject = useCallback((id: string) => setActiveProjectId(id), []);

  const openLightboxFromCard = useCallback((projectId: string, _imageIndex: number) => {
    setActiveProjectId(projectId);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 paddy-field" />
      <Navbar />

      <section className="section-shell pt-32">
        <div className="section-inner">
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
                  <span aria-hidden className="eyebrow-kanji">花</span>
                  Archive
                </div>
                <h1 className="section-title">Everything, in the order it was built.</h1>
                <p className="section-copy">
                  Production work first, then the small builds I cut my teeth on. Open any card for
                  the architecture, the constraint that shaped it, and what I&apos;d do differently.
                </p>
              </div>
              <span aria-hidden className="hidden w-24 shrink-0 text-lily/15 lg:block">
                <Lily className="h-auto w-full" weight={2.4} />
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {projectCatalog.map((project) => (
              <motion.div key={project.id} variants={item}>
                <ProjectCard
                  project={project}
                  onViewDetails={openProject}
                  onExpandImage={openLightboxFromCard}
                />
              </motion.div>
            ))}
          </motion.div>

          <FilamentDivider className="my-20" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="eyebrow">
              <span aria-hidden className="eyebrow-kanji">芽</span>
              First shoots
            </div>
            <h2 className="section-title">Where it started.</h2>
            <p className="section-copy">
              The Odin Project exercises from 2023 — plain HTML, CSS, and JavaScript, no framework
              to hide behind. They&apos;re here because the fundamentals in them still show up in
              everything above.
            </p>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {miniCatalog.map((miniProject) => (
                <motion.div key={miniProject.id} variants={item}>
                  <ProjectCard
                    project={miniProject}
                    onViewDetails={openProject}
                    onExpandImage={openLightboxFromCard}
                    variant="compact"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="surface-card mt-20 flex flex-col items-center gap-6 p-10 text-center sm:p-14"
          >
            <span aria-hidden className="w-14 text-lily/50">
              <Lily className="h-auto w-full" weight={3} />
            </span>
            <p className="font-display max-w-md text-2xl leading-snug text-foreground sm:text-3xl">
              Want to see the next one built with you in it?
            </p>
            <Link href="/#contact" className="btn-primary">
              Start a conversation
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <ProjectDetailDialog
        projectId={activeProjectId}
        projects={[...projectCatalog, ...miniCatalog]}
        onClose={() => setActiveProjectId(null)}
      />
    </main>
  );
}
