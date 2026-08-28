/**
 * 落款 — the artist's seal.
 *
 * A Japanese composition is signed with a red stamp in a corner, and it's the
 * one place the palette is allowed to go fully saturated. Characters are knocked
 * out of the ink rather than printed on it, the block is very slightly rotated,
 * and the edge is imperfect — a seal is pressed by hand, not printed.
 */

type HankoProps = {
  /** Characters, stacked vertically. Keep to two or three. */
  chars?: string;
  /** Colour showing through the knocked-out glyphs. Defaults to the page. */
  ink?: string;
  className?: string;
  /** Edge length in rem for the narrow axis. */
  size?: number;
};

export function Hanko({
  chars = '彼岸花',
  ink = 'var(--background)',
  className = '',
  size = 2.1,
}: HankoProps) {
  return (
    <span
      aria-hidden
      className={`inline-flex select-none flex-col items-center justify-center leading-none ${className}`}
      style={{
        width: `${size}rem`,
        paddingBlock: `${size * 0.18}rem`,
        gap: `${size * 0.09}rem`,
        background: 'var(--lily)',
        color: ink,
        borderRadius: 2,
        transform: 'rotate(-2.5deg)',
        fontFamily: 'var(--font-display)',
        fontSize: `${size * 0.42}rem`,
        // The bite of a hand-pressed seal: ink pools at the edges.
        boxShadow: `inset 0 0 0 1px color-mix(in srgb, var(--wine) 55%, transparent),
                    inset 0 0 ${size * 0.3}rem color-mix(in srgb, var(--wine) 45%, transparent)`,
      }}
    >
      {chars.split('').map((char, i) => (
        <span key={`${char}-${i}`}>{char}</span>
      ))}
    </span>
  );
}
