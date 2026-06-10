'use client';

import { useCallback, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { ProjectDetailDialog } from '@/components/project-detail-dialog';
import { projectCatalog } from '@/lib/project-data';

export default function ProjectsPage() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const openProject = useCallback((id: string) => setActiveProjectId(id), []);

  const openLightboxFromCard = useCallback((projectId: string, _imageIndex: number) => {
    setActiveProjectId(projectId);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-35" />
      <Navbar />

      <section className="section-shell pt-32">
        <div className="section-inner">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </Link>
            <span className="section-label mt-6 w-fit">Project archive</span>
            <h1 className="section-title">A broader look at my recent product work.</h1>
            <p className="section-copy">
              Compact image-first cards with explicit modal actions for a cleaner UX flow.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="glass-card p-6 text-center sm:p-8">
              <p className="text-lg text-foreground">Interested in building the next one together?</p>
              <Link href="/#contact" className="btn-primary mt-4">
                Start a conversation
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectDetailDialog
        projectId={activeProjectId}
        projects={projectCatalog}
        onClose={() => setActiveProjectId(null)}
      />
    </main>
  );
}
