'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Maximize2 } from 'lucide-react';
import type { ProjectData } from '@/lib/project-data';

type ProjectCardProps = {
  project: ProjectData;
  onViewDetails: (projectId: string) => void;
  onExpandImage?: (projectId: string, imageIndex: number) => void;
};

export function ProjectCard({ project, onViewDetails, onExpandImage }: ProjectCardProps) {
  const images = project.images;
  const [imageIndex, setImageIndex] = useState(0);
  const hasMultiple = images.length > 1;

  function prev(e: React.MouseEvent) {
    e.stopPropagation();
    setImageIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next(e: React.MouseEvent) {
    e.stopPropagation();
    setImageIndex((i) => (i + 1) % images.length);
  }

  function handleExpand(e: React.MouseEvent) {
    e.stopPropagation();
    onExpandImage?.(project.id, imageIndex);
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onViewDetails(project.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onViewDetails(project.id);
        }
      }}
      className="surface-card flex h-full cursor-pointer flex-col overflow-hidden transition-colors hover:bg-card"
    >
      {/* ── Image area ── */}
      <div className="group relative h-60 border-b border-border/70">
        <Image
          src={images[imageIndex]}
          alt={`${project.title} screenshot ${imageIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Role badge */}
        <div className="absolute left-3 top-3 inline-flex items-center rounded-md border border-white/35 bg-black/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
          {project.role}
        </div>

        {/* Year badge */}
        <div className="absolute right-3 top-3 pill-chip border-white/35 bg-black/45 text-white">
          {project.year}
        </div>

        {/* Expand button */}
        <button
          type="button"
          aria-label="Expand image"
          onClick={handleExpand}
          className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-md border border-white/30 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>

        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === imageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground/90">
          {project.description}
        </p>

        <p className="mt-3 text-sm font-medium text-muted-foreground">
          Impact: <span className="text-foreground">{project.impact}</span>
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="pill-chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live demo
            </a>
          ) : (
            <button
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center gap-1 rounded-lg border border-border bg-card/50 px-3 py-2 text-xs font-semibold text-muted-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Unavailable
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
