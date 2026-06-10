'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function About() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

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
      title: 'IT Specialist - Databases',
      issuer: 'Certiport',
      year: '2025',
      link: 'https://www.credly.com/badges/f6760691-622f-4451-9f27-abb5d5d58e6e/public_url',
      badge: '/certifications/it-specialist-databases.png',
    },
    {
      title: 'IT Specialist - Java',
      issuer: 'Certiport',
      year: '2024',
      link: 'https://www.credly.com/badges/e2f0cbbc-d628-4e4c-b477-cc9809627ad2/public_url',
      badge: '/certifications/it-specialist-java.png',
    },
    {
      title: 'IT Specialist - Network Security',
      issuer: 'Certiport',
      year: '2026',
      link: 'https://www.credly.com/badges/94210450-fe84-4171-9a3d-8c58096de2f5/public_url',
      badge: '/certifications/it-specialist-network-security.png',
    },
  ];

  const recognitions = [
    {
      title: '2nd Runner-Up – Hack4Gov (Regional)',
      issuer: 'Department of Information and Communications Technology (DICT)',
      year: 'October 2025',
      link: 'https://www.facebook.com/DICTDavaoRegion/posts/pfbid0KFTeWaNnuf1YnQX1wxSvyyNbgtJ8QEKdAJeUvE1oFGbk7zQAd8A2pU8A8SsJzNcnl',
      image: '/recognitions/hack4gov.png',
      description:
        'Secured 2nd Runner-Up in the regional round of Hack4Gov 2025 as part of a four-member team. Competed in a CTF-style event tackling real-world government security challenges, with focus on web exploitation, digital forensics, and OSINT.',
    },
  ];

  return (
    <section id="about" className="section-shell">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">Full-Stack Dev.</h2>
          <p className="section-copy">
            An overview of core technical philosophies, development methodologies, and architectural
            values applied across full-stack applications.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          <motion.article variants={item} className="surface-card p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-foreground">Technical Mindset</h3>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                I start with understanding requirements, defining clean API contracts, and planning
                out component architecture. As a student, I am constantly practicing and
                incorporating industry-standard patterns.
              </p>
              <p>
                I strongly value mentorship and constructive feedback, using them to refine my
                coding practices and deepen my understanding of software design.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="/CV-April-Bords-Nerosa.pdf"
                download="CV-April-Bords-Nerosa.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg
                  className="h-4.5 w-4.5"
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
                Download CV / Resume
              </a>
            </div>
          </motion.article>

          <motion.article variants={item} className="surface-card p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-foreground">What I optimize for</h3>
            <div className="mt-5 space-y-3">
              {[
                'Adopting modern full-stack patterns to build highly responsive interfaces.',
                'Writing clean, modular, and self-documenting codebases.',
                'Leveraging constructive feedback and mentorship to accelerate technical growth.',
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/60 p-3"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-(--brand)" />
                  <p className="text-sm leading-relaxed text-foreground/90">{point}</p>
                </div>
              ))}
            </div>
          </motion.article>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {Object.entries(techStacks).map(([category, technologies]) => (
            <motion.div key={category} variants={item} className="surface-card p-6">
              <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {category}
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span key={tech} className="pill-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-14"
        >
          <h3 className="text-lg font-semibold text-foreground">Certifications</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {certifications.map((cert) => (
              <motion.div
                key={cert.title}
                variants={item}
                className="relative flex glass-card p-3 items-center rounded-lg group cursor-pointer hover:bg-background/50 transition-colors"
              >
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Image src={cert.badge} alt={`${cert.title} badge`} width={62} height={62} />
                  <div>
                    <h4 className="mt-2 text-base font-semibold text-foreground">{cert.title}</h4>
                    <div className="flex items-center mt-1">
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      <span className="mx-2 border border-gray-600 w-2 bg-muted-foreground" />
                      <p className="text-xs font-semibold uppercase text-muted-foreground">
                        {cert.year}
                      </p>
                    </div>
                  </div>
                  <div className="absolute right-3.5 bottom-3 group-hover:translate-x-0.5 transition-transform">
                    <svg
                      className="h-4 w-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-14"
        >
          <h3 className="text-lg font-semibold text-foreground">Recognitions</h3>
          <div className="mt-5 grid gap-4">
            {recognitions.map((recognition) => (
              <motion.article
                key={recognition.title}
                variants={item}
                className="group overflow-hidden rounded-3xl border border-border/70 bg-card/80 shadow-[0_12px_40px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-card"
              >
                <a
                  href={recognition.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-full gap-0 md:grid-cols-[280px_1fr]"
                >
                  <div className="relative min-h-52 overflow-hidden bg-muted/40">
                    <Image
                      src={recognition.image}
                      alt={`${recognition.title} image`}
                      fill
                      sizes="(min-width: 768px) 280px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                      Recognition
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-sm font-medium text-white/80">{recognition.year}</p>
                    </div>
                  </div>

                  <div className="relative flex flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-xl font-semibold tracking-tight text-foreground">
                          {recognition.title}
                        </h4>
                        <p className="mt-2 text-sm text-muted-foreground">{recognition.issuer}</p>
                      </div>
                      <div className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {recognition.year}
                      </div>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/85">
                      {recognition.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground/90 transition-transform group-hover:translate-x-0.5">
                      <span>View details</span>
                      <svg
                        className="h-4 w-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
