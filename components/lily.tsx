/**
 * Higanbana (彼岸花) — the shared mark.
 *
 * Drawn entirely as open strokes so it can be animated stroke-by-stroke:
 *   - 6 recurved petals, each sweeping out and curling back on itself
 *   - 6 long arcing stamens, the "spider legs", each tipped with an anther
 *   - a bare stem, because the flower blooms leafless (葉見ず花見ず)
 *
 * Everything radiates from the node at (100, 132) in a 200x200 viewBox.
 * The splash animates these same paths; keeping one source means the mark
 * that draws itself on load is literally the mark in the navbar.
 */

export const LILY_NODE = { x: 100, y: 132 } as const;

/** Base petal, pointing up and curling back to the left. */
const PETAL_PATH = 'M100 132 C99 108 95 84 84 62 C92 78 94 94 86 106';

/** Base stamen — reaches roughly 40% further than a petal. */
const STAMEN_PATH = 'M100 132 C96 100 88 66 62 40';

/** Anther sits at the stamen tip and rotates with it. */
const ANTHER = { cx: 62, cy: 40 } as const;

/**
 * Rotations are pre-compensated for each base path's own lean (petals lean
 * ~13deg left, stamens ~22deg), so the rendered fan is symmetric about vertical.
 */
export const PETAL_ROTATIONS = [-62, -32, -2, 28, 58, 88] as const;
export const STAMEN_ROTATIONS = [-48, -20, 8, 36, 64, 92] as const;

export const STEM_PATH = 'M100 132 L100 205';

type Stroke = { d: string; rotate: number };

export const PETALS: Stroke[] = PETAL_ROTATIONS.map((rotate) => ({ d: PETAL_PATH, rotate }));
export const STAMENS: Stroke[] = STAMEN_ROTATIONS.map((rotate) => ({ d: STAMEN_PATH, rotate }));
export const ANTHERS = STAMEN_ROTATIONS.map((rotate) => ({ ...ANTHER, rotate }));

export const rotateAtNode = (deg: number) => `rotate(${deg} ${LILY_NODE.x} ${LILY_NODE.y})`;

type LilyProps = {
  className?: string;
  /** Stroke width in viewBox units. Petals get this, stamens get 60% of it. */
  weight?: number;
  /** Draw the stem below the node. */
  stem?: boolean;
  title?: string;
};

/**
 * Static mark. Inherits `currentColor`, so callers set the red with a text
 * colour and can dim the whole thing with opacity.
 */
export function Lily({ className, weight = 3, stem = true, title }: LilyProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}

      {stem ? <path d={STEM_PATH} strokeWidth={weight * 0.7} opacity={0.55} /> : null}

      {STAMENS.map((s, i) => (
        <path
          key={`stamen-${i}`}
          d={s.d}
          transform={rotateAtNode(s.rotate)}
          strokeWidth={weight * 0.6}
          opacity={0.8}
        />
      ))}

      {PETALS.map((p, i) => (
        <path key={`petal-${i}`} d={p.d} transform={rotateAtNode(p.rotate)} strokeWidth={weight} />
      ))}

      {ANTHERS.map((a, i) => (
        <circle
          key={`anther-${i}`}
          cx={a.cx}
          cy={a.cy}
          r={weight * 1.1}
          transform={rotateAtNode(a.rotate)}
          fill="currentColor"
          stroke="none"
        />
      ))}
    </svg>
  );
}
