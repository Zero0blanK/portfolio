'use client';

import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { ProjectIndex } from '@/components/project-index';
import { ProjectDetailDialog } from '@/components/project-detail-dialog';
import { Spine } from '@/components/spine';
import { projectCatalog } from '@/lib/project-data';

const featuredProjects = projectCatalog.slice(0, 4);

export function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const openProject = useCallback((id: string) => setActiveProjectId(id), []);

  return (
    <Spine
      id="work"
      kanji="花"
      eyebrow="Bloom"
      title="Four things I shipped."
      copy="A desktop and web manga reader, an attendance system that ran a university-wide event, an e-commerce platform, and a job board. Open any entry for the architecture and what went wrong first."
    >
      <ProjectIndex projects={featuredProjects} onOpen={openProject} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true, margin: '-90px' }}
        className="mt-12 flex flex-wrap items-center gap-6"
      >
        <Link href="/projects" className="btn-secondary">
          The full archive
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
        <span aria-hidden className="hidden h-px flex-1 bg-border/70 sm:block" />
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ash">
          {projectCatalog.length} projects · 3 mini builds
        </span>
      </motion.div>

      <ProjectDetailDialog
        projectId={activeProjectId}
        projects={featuredProjects}
        onClose={() => setActiveProjectId(null)}
      />
    </Spine>
  );
}
