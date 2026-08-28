'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Maximize2 } from 'lucide-react';
import { isFullProject, type AnyProject } from '@/lib/project-data';

type ProjectCardProps = {
  project: AnyProject;
  onViewDetails: (projectId: string) => void;
  onExpandImage?: (projectId: string, imageIndex: number) => void;
  variant?: 'default' | 'compact';
};

const overlayButton =
  'flex h-7 w-7 items-center justify-center border border-white/25 bg-black/55 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-black/80 group-hover:opacity-100 focus-visible:opacity-100';

export function ProjectCard({
  project,
  onViewDetails,
  onExpandImage,
  variant = 'default',
}: ProjectCardProps) {
  const images = project.images;
  const [imageIndex, setImageIndex] = useState(0);
  const hasMultiple = images.length > 1;
  const isCompact = variant === 'compact';

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
      className="bloom-card flex h-full cursor-pointer flex-col"
    >
      {/* ── Image ── */}
      <div className={`group relative ${isCompact ? 'h-52' : 'h-56'} border-b border-border/70`}>
        <Image
          src={images[imageIndex]}
          alt={`${project.title} screenshot ${imageIndex + 1}`}
          fill
          sizes="(min-width: 1280px) 24rem, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
        {/* Wine wash keeps every screenshot inside the palette */}
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--wine) 22%, transparent) 0%, transparent 45%, color-mix(in srgb, var(--wine) 62%, transparent) 100%)',
          }}
        />

        {'role' in project && (
          <span className="pill-chip absolute left-3 top-3 border-white/25 bg-black/50 text-white backdrop-blur-sm">
            {project.role}
          </span>
        )}

        <span className="pill-chip absolute right-3 top-3 border-white/25 bg-black/50 text-white backdrop-blur-sm">
          {project.year}
        </span>

        <button
          type="button"
          aria-label="Expand image"
          onClick={handleExpand}
          className={`${overlayButton} absolute bottom-3 right-3`}
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>

        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={prev}
              className={`${overlayButton} absolute left-2 top-1/2 -translate-y-1/2`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={next}
              className={`${overlayButton} absolute right-2 top-1/2 -translate-y-1/2`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex(i);
                  }}
                  className={`transition-all duration-300 ${
                    i === imageIndex ? 'w-6 bg-lily' : 'w-3 bg-white/45 hover:bg-white/80'
                  }`}
                  style={{ height: 2 }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className={`font-display ${isCompact ? 'text-lg' : 'text-xl'} leading-snug text-foreground`}
        >
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="font-mono mt-1.5 text-[10px] uppercase tracking-[0.16em] text-ash">
            {project.subtitle}
          </p>
        )}

        <p
          className={`${isCompact ? 'mt-2 line-clamp-2' : 'mt-3 line-clamp-3'} text-sm leading-[1.75] text-muted-foreground`}
        >
          {project.description}
        </p>

        {!isCompact && isFullProject(project) && (
          <p className="mt-4 border-l-2 border-lily/50 pl-3 text-sm leading-relaxed text-foreground/90">
            {project.impact}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, isCompact ? 3 : 5).map((tag) => (
            <span key={tag} className="pill-chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="font-mono inline-flex items-center justify-center gap-1.5 border border-border px-3 py-2.5 text-[10px] uppercase tracking-[0.16em] text-foreground/90 transition-colors hover:border-lily/50 hover:text-lily"
            style={{ borderRadius: 'var(--radius)' }}
          >
            <Github className="h-3.5 w-3.5" />
            Source
          </a>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="font-mono inline-flex items-center justify-center gap-1.5 border border-lily/40 bg-lily/10 px-3 py-2.5 text-[10px] uppercase tracking-[0.16em] text-lily transition-colors hover:border-lily hover:bg-lily/20"
              style={{ borderRadius: 'var(--radius)' }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </a>
          ) : (
            <span
              className="font-mono inline-flex cursor-not-allowed items-center justify-center gap-1.5 border border-border/50 px-3 py-2.5 text-[10px] uppercase tracking-[0.16em] text-ash/60"
              style={{ borderRadius: 'var(--radius)' }}
            >
              Not deployed
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
