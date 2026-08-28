/**
 * Roles, from the CV in public/CV-April-Bords-Nerosa.pdf.
 *
 * Two kinds, kept apart on purpose: `work` is paid or formal engineering time
 * and gets the full entry; `service` is a committee seat, which is real but
 * isn't a job, so it gets a one-line record instead. Padding the second to look
 * like the first is the thing that makes a junior CV read as thin.
 *
 * Both the landing section and /experiences render from here — the page and the
 * summary can't disagree.
 */

export type Role = {
  id: string;
  title: string;
  org: string;
  location?: string;
  /** Display string, e.g. "Jul — Aug 2026". */
  period: string;
  highlights: string[];
  technologies: string[];
};

export type ServiceRole = {
  id: string;
  title: string;
  org: string;
  period: string;
};

export const roles: Role[] = [
  {
    id: 'sundo-2026',
    title: 'Software Development Intern',
    org: 'Sundo Platform Inc.',
    location: 'Davao City, PH',
    period: 'Jul — Aug 2026',
    highlights: [
      "Analyzed database requirements and relationships, and produced the Entity-Relationship Diagrams that documented the application's data structure.",
      'Built 10+ reusable mobile frontend components in Expo and React Native, feeding into feature work and a consistent set of UI patterns.',
      'Assisted with testing, debugging, and troubleshooting frontend functionality alongside the development team.',
    ],
    technologies: ['Expo', 'React Native', 'ERD Design', 'Testing & Debugging'],
  },
];

export const service: ServiceRole[] = [
  {
    id: 'umsdc',
    title: 'Tech Committee Member',
    org: 'UM Student Developer Community',
    period: 'Aug 2025 — Jul 2026',
  },
  {
    id: 'jbecp',
    title: 'Tech Committee Member',
    org: 'Junior Blockchain Education Consortium of the Philippines — UM Davao',
    period: 'Aug 2025 — Jul 2026',
  },
  {
    id: 'enigma',
    title: 'Tech Committee Member',
    org: 'University of Mindanao Enigma',
    period: 'Aug 2024 — Jul 2025',
  },
];

export type SeminarTrack = {
  title: string;
  speaker: string;
  /** Certificate scan in public/seminars/. */
  certificate: string;
};

export type Seminar = {
  id: string;
  title: string;
  org: string;
  date?: string;
  venue?: string;
  /**
   * Sessions within a single event. The three internship certificates are all
   * from one seminar day, so they're tracks of one entry rather than three
   * separate seminars — listing them separately would triple the same day.
   */
  tracks?: SeminarTrack[];
};

export const seminars: Seminar[] = [
  {
    id: 'internship-predeployment-2026',
    title: 'Internship Pre-deployment Seminar',
    org: 'College of Computing Education, University of Mindanao',
    date: '10 June 2026',
    venue: 'DPT Auditorium, Davao City',
    tracks: [
      {
        title: 'Office Etiquette and Work Ethics',
        speaker: 'Joshua Franklin Martin Villegas',
        certificate: '/seminars/WEMH.png',
      },
      {
        title: 'Gender Sensitivity and Sexual Harassment Awareness',
        speaker: 'Renz Jeason Batuto',
        certificate: '/seminars/GSSH.png',
      },
      {
        title: 'Innovative Culture in the Office, Mental Hygiene, and Leadership',
        speaker: 'Cindy Grace Espinosa',
        certificate: '/seminars/LIC.png',
      },
    ],
  },
  {
    id: 'industry-integration-sqa',
    title: 'Industry Integration — Software Quality Assurance in Modern Practice',
    org: 'University of Mindanao',
  },
  {
    id: 'git-github-js-workshop',
    title: 'Software Development — Git, GitHub & JavaScript Workshop',
    org: 'University of Mindanao',
  },
];
