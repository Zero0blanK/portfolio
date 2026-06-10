'use client';

import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { ProjectDetailDialog } from '@/components/project-detail-dialog';
import { projectCatalog } from '@/lib/project-data';

const featuredProjects = projectCatalog.slice(0, 4);

export function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const openProject = useCallback((id: string) => setActiveProjectId(id), []);

  const openLightboxFromCard = useCallback((projectId: string, _imageIndex: number) => {
    // Open the detail dialog; lightbox state is managed inside ProjectDetailDialog
    setActiveProjectId(projectId);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="work" className="section-shell">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-label">Featured work</span>
          <h2 className="section-title">Turning ideas into functional products.</h2>
          <p className="section-copy">
            From full-stack web applications to interactive user experiences, these projects
            showcase my approach to building scalable and maintainable software.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
          {featuredProjects.map((project) => (
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
          transition={{ duration: 0.55, delay: 0.15 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-10"
        >
          <Link href="/projects" className="btn-secondary">
            View all projects
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <ProjectDetailDialog
        projectId={activeProjectId}
        projects={featuredProjects}
        onClose={() => setActiveProjectId(null)}
      />
    </section>
  );
}
