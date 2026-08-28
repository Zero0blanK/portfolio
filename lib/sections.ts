/**
 * The home page sections, and the kanji that marks each one.
 *
 * The glyphs aren't decoration — they map to what the section actually holds.
 * A higanbana's leaf and flower never meet: the leaf feeds underground in
 * winter, the flower blooms bare in autumn. So the unseen groundwork is 根
 * (root) and the visible output is 花 (flower), with 道 (the path walked)
 * between them — which is also the order the plant grows in, and the order
 * the sections sit in on the page. 岸 is the shore of 彼岸, the far bank,
 * which is what a contact section is asking you to cross.
 */
export type Section = {
  id: string;
  kanji: string;
  romaji: string;
  /** Latin label shown on the spine node and in the section eyebrow. */
  label: string;
};

export const SECTIONS: readonly Section[] = [
  { id: 'home', kanji: '序', romaji: 'jo', label: 'Prologue' },
  { id: 'about', kanji: '根', romaji: 'ne', label: 'Root' },
  { id: 'experience', kanji: '道', romaji: 'michi', label: 'Path' },
  { id: 'work', kanji: '花', romaji: 'hana', label: 'Bloom' },
  { id: 'contact', kanji: '岸', romaji: 'kishi', label: 'Shore' },
] as const;

export const SECTION_IDS = SECTIONS.map((s) => s.id);
