'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ProjectData } from '@/lib/project-data';
import type { MiniProjectData } from '@/lib/project-mini-data';

type LightboxState = { images: string[]; index: number } | null;

type ProjectDetailDialogProps = {
  projectId: string | null;
  projects: (ProjectData | MiniProjectData)[];
  onClose: () => void;
};

type CarouselProps = {
  images: string[];
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (i: number) => void;
  onExpand?: () => void;
  alt: string;
  className?: string;
};

function ImageCarousel({
  images,
  index,
  onPrev,
  onNext,
  onDotClick,
  onExpand,
  alt,
  className = '',
}: CarouselProps) {
  const hasMultiple = images.length > 1;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border/70 ${className}`}
    >
      <Image
        key={images[index]}
        src={images[index]}
        alt={`${alt} ${index + 1}`}
        fill
        className="object-cover transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-gray-100/5" />

      {/* Click-to-expand overlay */}
      {onExpand && (
        <button
          type="button"
          aria-label="Expand image"
          onClick={onExpand}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
        >
          <span className="flex items-center gap-1.5 rounded-lg border border-white/30 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            Click to expand
          </span>
        </button>
      )}

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={onPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-3 right-3 rounded-md border border-white/20 bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            {index + 1} / {images.length}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => onDotClick(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ProjectDetailDialog({ projectId, projects, onClose }: ProjectDetailDialogProps) {
  const [dialogImageIndex, setDialogImageIndex] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === projectId) ?? null,
    [projectId, projects],
  );

  const dialogImages = useMemo(() => {
    if (!activeProject) return [];
    return activeProject.images;
  }, [activeProject]);

  function handleDetailOpenChange(open: boolean) {
    if (!open) {
      onClose();
      // Reset index for next open
      setDialogImageIndex(0);
    }
  }

  function openLightbox() {
    setLightbox({ images: dialogImages, index: dialogImageIndex });
  }

  function lightboxPrev() {
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : null,
    );
  }

  function lightboxNext() {
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : null));
  }

  return (
    <>
      {/* ── Project detail dialog ── */}
      <Dialog open={Boolean(activeProject)} onOpenChange={handleDetailOpenChange}>
        <DialogContent className="sm:max-w-3xl surface-card max-h-[75vh] overflow-y-auto rounded-xl border border-border/70 p-6 shadow-lg">
          {activeProject && (
            <>
              <DialogHeader>
                <div className="mb-2 flex items-center gap-2">
                  <span className="pill-chip">{activeProject.year}</span>
                  {'role' in activeProject && (
                    <span className="pill-chip">{activeProject.role}</span>
                  )}
                </div>
                <DialogTitle className="text-2xl">{activeProject.title}</DialogTitle>
                <DialogDescription className="text-sm leading-relaxed">
                  {activeProject.subtitle ? `${activeProject.subtitle} - ` : ''}
                  {activeProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <ImageCarousel
                  images={dialogImages}
                  index={dialogImageIndex}
                  alt={`${activeProject.title} preview`}
                  onPrev={() =>
                    setDialogImageIndex((i) => (i - 1 + dialogImages.length) % dialogImages.length)
                  }
                  onNext={() => setDialogImageIndex((i) => (i + 1) % dialogImages.length)}
                  onDotClick={setDialogImageIndex}
                  onExpand={openLightbox}
                  className="h-72"
                />

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Key responsibilities
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {'responsibilities' in activeProject && activeProject.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-foreground/90">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/70 bg-card/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Challenge
                    </p>
                    {'challenge' in activeProject && (
                      <p className="mt-1 text-sm text-foreground/90">{activeProject.challenge}</p>
                    )}
                  </div>
                  <div className="rounded-xl border border-border/70 bg-card/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Solution
                    </p>
                    {'solution' in activeProject && (
                      <p className="mt-1 text-sm text-foreground/90">{activeProject.solution}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span key={tag} className="pill-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github className="h-4 w-4" />
                    GitHub repository
                  </a>
                  {activeProject.demoUrl ? (
                    <a
                      href={activeProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live demo
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-flex cursor-not-allowed items-center justify-center gap-1 rounded-lg border border-border bg-card/50 px-3 py-2 text-xs font-semibold text-muted-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Lightbox — second Radix Dialog stacked above the detail dialog ── */}
      <Dialog
        open={Boolean(lightbox)}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
      >
        <DialogContent
          className="flex max-w-[95vw] sm:max-w-[70vw] min-h-[50vh] sm:min-h-[80vh] flex-col items-center gap-2 sm:gap-4 border-0 bg-transparent p-2 sm:p-4 shadow-none text-foreground"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            Image {lightbox ? lightbox.index + 1 : ''} of {lightbox?.images.length}
          </DialogTitle>
          <DialogDescription className="sr-only">Full-screen image viewer</DialogDescription>

          {lightbox && (
            <>
              <div className="relative flex w-full sm:w-fit min-h-[40vh] sm:min-h-190 top-6 sm:top-11.5 items-center justify-center overflow-hidden rounded-lg bg-black/60 p-1 sm:p-2">
                <Image
                  key={lightbox.images[lightbox.index]}
                  src={lightbox.images[lightbox.index]}
                  alt={`Screenshot ${lightbox.index + 1}`}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[60vh] sm:max-h-none w-auto"
                />
              </div>

              {lightbox.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between gap-2 sm:gap-4 px-1 sm:px-12">
                  <div
                    className="flex items-center gap-2 h-full group cursor-pointer"
                    onClick={lightboxPrev}
                  >
                    <button
                      type="button"
                      aria-label="Previous image"
                      className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full text-foreground transition-colors bg-background/60 sm:bg-background/50 hover:bg-background/80 group-hover:bg-background/80 cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-8 sm:w-8" />
                    </button>
                  </div>

                  <div className="absolute bottom-10 sm:bottom-16 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-1.5 bg-background/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                    {lightbox.images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to image ${i + 1}`}
                        onClick={() => setLightbox((lb) => (lb ? { ...lb, index: i } : null))}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-200 ${
                          i === lightbox.index
                            ? 'w-4 sm:w-6 bg-foreground'
                            : 'w-1.5 sm:w-2 bg-foreground/40 hover:bg-foreground/70'
                        }`}
                      />
                    ))}
                  </div>
                  <div
                    className="flex items-center gap-2 h-full group cursor-pointer"
                    onClick={lightboxNext}
                  >
                    <button
                      type="button"
                      aria-label="Next image"
                      className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full text-foreground transition-colors bg-background/60 sm:bg-background/50 hover:bg-background/80 group-hover:bg-background/80 cursor-pointer"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-8 sm:w-8" />
                    </button>
                  </div>
                </div>
              )}

              <p className="text-[10px] sm:text-xs font-semibold text-foreground/50">
                {lightbox.index + 1} / {lightbox.images.length}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
