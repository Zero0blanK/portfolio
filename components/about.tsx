'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Lily } from '@/components/lily';
import { Spine } from '@/components/spine';

const techStacks = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Java', 'PHP'],
  'Frontend Engineering': ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
  'Backend Engineering': [
    'Node.js',
    'Express.js',
    'Electron',
    'PHP',
    'PostgreSQL',
    'MySQL',
    'SQLite',
    'REST APIs',
  ],
  'Architecture & Dev Tools': [
    'VS Code',
    'Docker',
    'GitHub',
    'Git',
    'npm',
    'Figma',
    'System Design',
    'Version Control',
    'Security Best Practices',
  ],
};

const certifications = [
  {
    title: 'IT Specialist — Databases',
    issuer: 'Certiport',
    year: '2025',
    link: 'https://www.credly.com/badges/f6760691-622f-4451-9f27-abb5d5d58e6e/public_url',
    badge: '/certifications/it-specialist-databases.png',
  },
  {
    title: 'IT Specialist — Java',
    issuer: 'Certiport',
    year: '2024',
    link: 'https://www.credly.com/badges/e2f0cbbc-d628-4e4c-b477-cc9809627ad2/public_url',
    badge: '/certifications/it-specialist-java.png',
  },
  {
    title: 'IT Specialist — Network Security',
    issuer: 'Certiport',
    year: '2026',
    link: 'https://www.credly.com/badges/94210450-fe84-4171-9a3d-8c58096de2f5/public_url',
    badge: '/certifications/it-specialist-network-security.png',
  },
];

type Recognition = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  /** Public write-up, when there is one. */
  link?: string;
  image?: string;
};

const recognitions: Recognition[] = [
  {
    title: '2nd Runner-Up — Hack4Gov (Regional)',
    issuer: 'Department of Information and Communications Technology (DICT)',
    year: 'October 2025',
    link: 'https://www.facebook.com/DICTDavaoRegion/posts/pfbid0KFTeWaNnuf1YnQX1wxSvyyNbgtJ8QEKdAJeUvE1oFGbk7zQAd8A2pU8A8SsJzNcnl',
    image: '/recognitions/hack4gov.png',
    description:
      'Secured 2nd Runner-Up in the regional round of Hack4Gov 2025 as part of a four-member team. Competed in a CTF-style event tackling real-world government security challenges, with focus on web exploitation, digital forensics, and OSINT.',
  },
  {
    title: '1st Runner-Up — Quantum Computing & Cybersecurity Hackathon',
    issuer: 'Quantum Computing Society of the Philippines (QCSP)',
    year: 'June 2026',
    description:
      'Placed 1st Runner-Up with a five-member team, solving CTF-style challenges across quantum computing, cryptography, web exploitation, and OSINT under time pressure.',
    image: '/recognitions/QCSP_1.jpg',
    // No public write-up to link to yet; the card renders without one.
  },
];

const principles = [
  'Adopting modern full-stack patterns to build highly responsive interfaces.',
  'Writing clean, modular, and self-documenting codebases.',
  'Leveraging constructive feedback and mentorship to accelerate technical growth.',
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function About() {
  return (
    <Spine
      id="about"
      kanji="根"
      eyebrow="Root"
      title="The work that never surfaces."
      copy="A higanbana's leaf feeds the bulb all winter and dies before the flower ever opens — the two never meet. Most of what makes a product feel effortless works the same way. This is what sits under mine."
    >

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-90px' }}
          className="mt-14 grid gap-5 lg:grid-cols-2"
        >
          <motion.article variants={item} className="surface-card p-7 sm:p-9">
            <h3 className="font-display text-2xl text-foreground">How I approach a build</h3>
            <div className="mt-5 space-y-4 leading-[1.85] text-muted-foreground">
              <p>
                I start by understanding requirements, defining clean API contracts, and planning
                component architecture before writing anything. As a student I&apos;m constantly
                practising and folding in industry-standard patterns.
              </p>
              <p>
                I value mentorship and direct feedback, and use both to sharpen how I write code and
                how I think about software design.
              </p>
            </div>
            <a
              href="/CV-April-Bords-Nerosa.pdf"
              download="CV-April-Bords-Nerosa.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download CV
            </a>
          </motion.article>

          <motion.article variants={item} className="surface-card p-7 sm:p-9">
            <h3 className="font-display text-2xl text-foreground">What I optimise for</h3>
            <ul className="mt-6 space-y-4">
              {principles.map((point, i) => (
                <li key={point} className="flex items-start gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0">
                  <span className="font-mono mt-0.5 shrink-0 text-[11px] tracking-[0.2em] text-lily">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-[1.8] text-foreground/90">{point}</p>
                </li>
              ))}
            </ul>
          </motion.article>
        </motion.div>

        {/* Stack */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-90px' }}
          className="mt-5 grid gap-5 md:grid-cols-2"
        >
          {Object.entries(techStacks).map(([category, technologies]) => (
            <motion.div key={category} variants={item} className="surface-card p-7">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-lily">
                {category}
              </h4>
              <div className="mt-5 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span key={tech} className="pill-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-90px' }}
          className="mt-20"
        >
          <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
            Certifications
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {certifications.map((cert) => (
              <motion.a
                key={cert.title}
                variants={item}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bloom-card group flex items-center gap-4 p-4"
              >
                <Image
                  src={cert.badge}
                  alt=""
                  width={56}
                  height={56}
                  className="shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-display text-[15px] leading-snug text-foreground">
                    {cert.title}
                  </h4>
                  <p className="font-mono mt-1.5 text-[10px] uppercase tracking-[0.16em] text-ash">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
                <svg
                  className="ml-auto h-4 w-4 shrink-0 text-ash/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-lily"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Recognitions */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-90px' }}
          className="mt-16"
        >
          <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
            Recognitions
          </h3>
          <div className="mt-6 grid gap-4">
            {recognitions.map((recognition) => {
              // Not every placement has a public write-up or a photo yet, so the
              // card degrades: no link means it stops being a link, and no image
              // means the panel falls back to the mark.
              const Card = recognition.link ? motion.a : motion.div;
              const linkProps = recognition.link
                ? { href: recognition.link, target: '_blank', rel: 'noopener noreferrer' }
                : {};

              return (
                <Card
                  key={recognition.title}
                  variants={item}
                  {...linkProps}
                  className="bloom-card group grid gap-0 md:grid-cols-[300px_1fr]"
                >
                  <div className="relative min-h-56 overflow-hidden">
                    {recognition.image ? (
                      <Image
                        src={recognition.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 300px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center text-lily/25"
                        style={{
                          background:
                            'radial-gradient(120% 90% at 50% 120%, color-mix(in srgb, var(--wine) 60%, transparent), transparent 70%)',
                        }}
                      >
                        <Lily className="h-28 w-28" weight={2.6} />
                      </span>
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--wine) 70%, transparent) 100%)',
                      }}
                    />
                    <span className="pill-chip pill-chip-lily absolute left-4 top-4 backdrop-blur">
                      Recognition
                    </span>
                  </div>

                  <div className="flex flex-col p-6 sm:p-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-lily">
                      {recognition.year}
                    </p>
                    <h4 className="font-display mt-3 text-2xl leading-tight text-foreground">
                      {recognition.title}
                    </h4>
                    <p className="font-mono mt-2 text-[11px] uppercase tracking-[0.12em] text-ash">
                      {recognition.issuer}
                    </p>
                    <p className="mt-5 max-w-2xl text-sm leading-[1.85] text-foreground/85">
                      {recognition.description}
                    </p>
                    {recognition.link && (
                      <span className="font-mono mt-auto inline-flex items-center gap-2 pt-6 text-[11px] uppercase tracking-[0.2em] text-ash transition-colors group-hover:text-lily">
                        Read the announcement
                        <svg
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
    </Spine>
  );
}
