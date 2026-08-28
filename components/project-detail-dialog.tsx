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
import { isFullProject, type AnyProject } from '@/lib/project-data';

type LightboxState = { images: string[]; index: number } | null;

type ProjectDetailDialogProps = {
  projectId: string | null;
  projects: AnyProject[];
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

const overlayButton =
  'flex h-8 w-8 items-center justify-center border border-white/25 bg-black/55 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-black/80 group-hover:opacity-100 focus-visible:opacity-100';

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
    <div className={`group relative overflow-hidden border border-border/70 ${className}`}>
      <Image
        key={images[index]}
        src={images[index]}
        alt={`${alt} ${index + 1}`}
        fill
        sizes="(min-width: 640px) 42rem, 100vw"
        className="object-cover"
      />

      {onExpand && (
        <button
          type="button"
          aria-label="Expand image"
          onClick={onExpand}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <span className="font-mono border border-white/25 bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            Expand
          </span>
        </button>
      )}

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={onPrev}
            className={`${overlayButton} absolute left-2 top-1/2 -translate-y-1/2`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={onNext}
            className={`${overlayButton} absolute right-2 top-1/2 -translate-y-1/2`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <span className="font-mono absolute bottom-3 right-3 border border-white/20 bg-black/55 px-2 py-0.5 text-[10px] tracking-[0.1em] text-white backdrop-blur-sm">
            {index + 1} / {images.length}
          </span>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => onDotClick(i)}
                className={`transition-all duration-300 ${
                  i === index ? 'w-6 bg-lily' : 'w-3 bg-white/45 hover:bg-white/80'
                }`}
                style={{ height: 2 }}
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

  const dialogImages = useMemo(() => activeProject?.images ?? [], [activeProject]);

  /** Mini builds carry only the basics; everything else is case-study-only. */
  const caseStudy = activeProject && isFullProject(activeProject) ? activeProject : null;

  function handleDetailOpenChange(open: boolean) {
    if (!open) {
      onClose();
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
      <Dialog open={Boolean(activeProject)} onOpenChange={handleDetailOpenChange}>
        <DialogContent className="surface-card max-h-[82vh] overflow-y-auto p-0 sm:max-w-3xl">
          {activeProject && (
            <>
              {/* Header band, tinted like the petal base */}
              <div
                className="border-b border-border/70 p-6 sm:p-8"
                style={{
                  background:
                    'linear-gradient(180deg, color-mix(in srgb, var(--wine) 22%, transparent), transparent)',
                }}
              >
                <DialogHeader className="space-y-0 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="pill-chip pill-chip-lily">{activeProject.year}</span>
                    {caseStudy && <span className="pill-chip">{caseStudy.role}</span>}
                  </div>
                  <DialogTitle className="font-display mt-4 text-3xl leading-tight tracking-tight">
                    {activeProject.title}
                  </DialogTitle>
                  <DialogDescription className="mt-3 text-sm leading-[1.85] text-muted-foreground">
                    {activeProject.subtitle ? `${activeProject.subtitle} — ` : ''}
                    {activeProject.description}
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="space-y-8 p-6 sm:p-8">
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

                {caseStudy && (
                  <p className="border-l-2 border-lily pl-4 text-[15px] leading-[1.8] text-foreground/90">
                    {caseStudy.impact}
                  </p>
                )}

                {caseStudy && (
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-lily">
                      What I did
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {caseStudy.responsibilities.map((r, i) => (
                        <li
                          key={r}
                          className="flex items-start gap-4 border-b border-border/50 pb-3 last:border-0 last:pb-0"
                        >
                          <span className="font-mono mt-0.5 shrink-0 text-[10px] tracking-[0.16em] text-ash">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm leading-[1.8] text-foreground/90">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {caseStudy && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="border border-border/70 p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ash">
                        The problem
                      </p>
                      <p className="mt-3 text-sm leading-[1.8] text-foreground/90">
                        {caseStudy.challenge}
                      </p>
                    </div>
                    <div className="border border-lily/35 bg-lily/[0.04] p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lily">
                        What I built
                      </p>
                      <p className="mt-3 text-sm leading-[1.8] text-foreground/90">
                        {caseStudy.solution}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
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
                    Source
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
                    <span
                      className="font-mono inline-flex cursor-not-allowed items-center justify-center gap-2 border border-border/50 px-7 py-3.5 text-[13px] uppercase tracking-[0.16em] text-ash/60"
                      style={{ borderRadius: 'var(--radius)' }}
                    >
                      Not deployed
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Lightbox — a second dialog stacked above the detail view ── */}
      <Dialog
        open={Boolean(lightbox)}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
      >
        <DialogContent
          className="flex max-w-[95vw] flex-col items-center gap-4 border-0 bg-transparent p-2 shadow-none sm:max-w-[74vw] sm:p-4"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            Image {lightbox ? lightbox.index + 1 : ''} of {lightbox?.images.length}
          </DialogTitle>
          <DialogDescription className="sr-only">Full-screen image viewer</DialogDescription>

          {lightbox && (
            <>
              <div className="relative flex w-full items-center justify-center border border-border/50 bg-black/70 p-2">
                <Image
                  key={lightbox.images[lightbox.index]}
                  src={lightbox.images[lightbox.index]}
                  alt={`Screenshot ${lightbox.index + 1}`}
                  width={1600}
                  height={1000}
                  className="max-h-[72vh] w-auto object-contain"
                />
              </div>

              {lightbox.images.length > 1 && (
                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={lightboxPrev}
                    className="flex h-10 w-10 items-center justify-center border border-border bg-background/70 text-foreground transition-colors hover:border-lily hover:text-lily"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="flex gap-1.5">
                    {lightbox.images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to image ${i + 1}`}
                        onClick={() => setLightbox((lb) => (lb ? { ...lb, index: i } : null))}
                        className={`transition-all duration-300 ${
                          i === lightbox.index ? 'w-7 bg-lily' : 'w-3 bg-foreground/35'
                        }`}
                        style={{ height: 2 }}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={lightboxNext}
                    className="flex h-10 w-10 items-center justify-center border border-border bg-background/70 text-foreground transition-colors hover:border-lily hover:text-lily"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ash">
                {lightbox.index + 1} / {lightbox.images.length}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
