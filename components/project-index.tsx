'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { AnyProject } from '@/lib/project-data';
import { isFullProject } from '@/lib/project-data';

type ProjectIndexProps = {
  projects: AnyProject[];
  onOpen: (projectId: string) => void;
};

/**
 * The featured work, set as a catalogue index rather than a card grid.
 *
 * Four projects don't need thumbnails to be distinguished — they need titles
 * you can read at a glance and a year to place them. So each one is a full-
 * width entry with the title at display size, and the screenshot only surfaces
 * behind the row on hover, washed back far enough to stay a background. The
 * dense card grid still earns its place on /projects, where there are twelve.
 */
export function ProjectIndex({ projects, onOpen }: ProjectIndexProps) {
  return (
    <ul className="mt-14 border-t border-border/70">
      {projects.map((project, i) => (
        <motion.li
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-border/70"
        >
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="group relative block w-full cursor-pointer overflow-hidden px-1 py-8 text-left sm:py-10"
          >
            {/* The screenshot surfaces behind the row, washed right back */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              <Image
                src={project.images[0]}
                alt=""
                fill
                sizes="100vw"
                className="scale-105 object-cover object-top transition-transform duration-[1.4s] ease-out group-hover:scale-100"
              />
              <span
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, var(--background) 24%, color-mix(in srgb, var(--background) 72%, transparent) 62%, color-mix(in srgb, var(--wine) 55%, transparent))',
                }}
              />
            </span>

            {/* A filament grows along the entry as it opens */}
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 ease-out group-hover:w-full group-focus-visible:w-full"
              style={{ background: 'linear-gradient(90deg, var(--lily), transparent)' }}
            />

            <div className="relative grid gap-x-8 gap-y-3 lg:grid-cols-[8rem_1fr_auto] lg:items-baseline">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash transition-colors duration-500 group-hover:text-lily">
                {project.year}
              </p>

              <div className="min-w-0">
                <h3 className="font-display text-3xl leading-[1.1] text-foreground transition-colors duration-500 group-hover:text-lily sm:text-[2.6rem]">
                  {project.title}
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-[1.8] text-muted-foreground">
                  {isFullProject(project) ? project.impact : project.description}
                </p>

                <p className="font-mono mt-4 text-[10px] uppercase tracking-[0.16em] text-ash">
                  {project.tags.slice(0, 5).join(' · ')}
                </p>
              </div>

              <span className="flex items-center gap-3 lg:justify-end">
                {isFullProject(project) && (
                  <span className="font-mono hidden text-[10px] uppercase tracking-[0.18em] text-ash lg:block">
                    {project.role}
                  </span>
                )}
                <ArrowUpRight
                  aria-hidden
                  className="h-6 w-6 shrink-0 text-ash transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lily"
                  strokeWidth={1.2}
                />
              </span>
            </div>
          </button>
        </motion.li>
      ))}
    </ul>
  );
}
