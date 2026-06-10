export type ProjectData = {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  role: string;
  year: string;
  images: string[];
  tags: string[];
  impact: string;
  responsibilities: string[];
  challenge: string;
  solution: string;
  githubUrl: string;
  demoUrl: string;
};

export const projectCatalog: ProjectData[] = [
  {
    id: '1',
    title: 'Projekt Manga',
    description:
      'Projekt Manga is a hybrid desktop and web app for reading and downloading manga from multiple sources, featuring offline caching and a modular scraping system.',
    role: 'Full-Stack Developer',
    year: '2025 - Current',
    images: [
      '/projects/projektmanga/library.png',
      '/projects/projektmanga/manga-details.png',
      '/projects/projektmanga/extension.png',
      '/projects/projektmanga/recents.png',
      '/projects/projektmanga/downloads.png',
      '/projects/projektmanga/settings.png',
      '/projects/projektmanga/web-library.png',
    ],
    tags: ['Next.js', 'TypeScript', 'Electron', 'Tailwind CSS', 'Express.js', 'PrismaORM', 'MySQL'],
    impact: 'Not yet released, currently in development.',
    responsibilities: [
      'Designed a dual-mode architecture using Electron IPC and Express REST for seamless desktop and web operation.',
      'Built a modular scraping system with dynamically loaded site-specific scrapers using Cheerio and Axios.',
      'Implemented a queue-based background worker for batch downloads with retries, exponential backoff, and rate limiting.',
      'Optimized database queries and schema design using Prisma and MySQL/MariaDB.',
      'Developed a responsive UI using Next.js, React, Tailwind CSS, and Framer Motion with smooth animations and loading states.',
    ],
    challenge:
      'Maintaining high performance and responsiveness across both Electron and web environments, while handling large-scale image downloads without triggering rate limits or anti-bot protections.',
    solution:
      'Built a unified IPC/REST transport layer for cross-environment API handling and an adaptive download queue with rate limiting, retries, and concurrency control. Added request throttling with browser-like headers to improve reliability when fetching external content.',
    githubUrl: 'https://github.com/Zero0blanK/ProjektManga',
    demoUrl: '',
  },
  {
    id: '2',
    title: 'UMattend Attendance Management System',
    description:
      'UMAttend is a real-time attendance management system built for the University of Mindanao Intramurals. It streamlines attendance tracking by replacing manual sign-in sheets with a centralized web platform for managing events and recording check-ins and check-outs. I joined the project team as a volunteer backend engineer, where I helped develop the system’s API and data layer.',
    role: 'Backend Engineer',
    year: '2025',
    images: [
      '/projects/umattend/events.png',
      '/projects/umattend/event-details.png',
      '/projects/umattend/manage-event.png',
      '/projects/umattend/profile.png',
    ],
    tags: ['Express.js', 'TypeScript', 'PrismaORM', 'PostgreSQL', 'REST API', 'Google OAuth'],
    impact: 'Served 1,000+ students during the University of Mindanao intramurals event',
    responsibilities: [
      "Developed backend services for UMAttend, a real-time attendance system for the University of Mindanao's intramurals event.",
      'Built and maintained the RESTful API using Express.js and TypeScript with a layered architecture (routes → controllers → services → repositories)',
      'Collaborated with frontend and full-stack developers to ensure system performance and integration during high-traffic event periods.',
    ],
    challenge:
      "The University of Mindanao's intramurals relied on manual sign-in sheets to track student attendance — a slow and error-prone process that made real-time monitoring and post-event reporting difficult, especially during high-traffic periods.",
    solution:
      'Built a backend-driven attendance platform with a versioned REST API that supports real-time check-in/check-out tracking, role-based access for organizers and administrators, and efficient data storage with PostgreSQL and Prisma ORM — enabling accurate, scalable attendance management throughout the event.',
    githubUrl: 'https://github.com/riomar0001/umattend-app/tree/dev',
    demoUrl: 'https://umattend.site',
  },
  {
    id: '3',
    title: 'High Elevation E-Commerce Platform',
    description:
      'A modern, premium e-commerce platform built with cutting-edge technologies to provide a seamless coffee shopping experience.',
    role: 'Full-Stack Developer',
    year: '2026',
    images: [
      '/projects/highelevation/hero.png',
      '/projects/highelevation/products.png',
      '/projects/highelevation/product-details.png',
      '/projects/highelevation/cart.png',
      '/projects/highelevation/checkout.png',
      '/projects/highelevation/cdash.png',
    ],
    tags: [
      'Laravel',
      'PHP',
      'Tailwind CSS',
      'Alpine.js',
      'MySQL',
      'PayPal API',
      'PayMongo API',
      'Vite',
    ],
    impact:
      'Demonstrated full-stack technical execution by implementing scalable architecture patterns, strict relational data modeling, and secure third-party API integrations.',
    responsibilities: [
      'Structured a clean service layer (Checkout/Payment) to separate core business logic from controllers, making the codebase easier to maintain.',
      'Implemented a Factory Pattern to cleanly integrate PayMongo and PayPal with dynamic fallback error handling.',
      'Designed a relational database schema optimized to manage relationships across customers, inventory logs, and orders.',
      'Engineered an administrative dashboard featuring real-time sales reports, inventory controls, and low-stock alerts.',
    ],
    challenge:
      'Designing an e-commerce platform for specialty coffee beans that securely manages complex checkout transactions across multiple payment gateways (PayPal & PayMongo), enforces precise stock tracking/low-stock alerts, and handles dynamic pricing and international-ready features without race conditions.',
    solution:
      'Implemented a service-oriented Laravel backend with specialized services for checkout and payment logic, structured database transactions to prevent stock discrepancies, created an integrated admin dashboard with comprehensive KPI exports, and designed responsive Blade views styled with Tailwind CSS and enhanced with Alpine.js micro-interactions.',
    githubUrl: 'https://github.com/Zero0blanK/high-elevation-ecommerce',
    demoUrl: '',
  },
  {
    id: '4',
    title: 'Bayaw Jobs Board Platform',
    description:
      'A modern, premium job board and recruitment platform designed to streamline corporate hiring workflows and applicant job searches.',
    role: 'Frontend Developer',
    year: '2025',
    images: [
      '/projects/bayawjobs/landing.png',
      '/projects/bayawjobs/jobs.png',
      '/projects/bayawjobs/employers.png',
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Express.js',
      'PostgreSQL',
      'Prisma ORM',
      'Tailwind CSS',
      'Zustand',
      'Zod',
    ],
    impact:
      'Collaborated closely with the lead developer to build the frontend client and integrate key database and authentication APIs, facilitating efficient global state management and seamless user flows.',
    responsibilities: [
      'Assisted the lead developer in developing the Next.js frontend application and structuring components.',
      'Integrated backend API endpoints and database functionality into the client-side pages.',
      'Implemented global state management using Zustand to coordinate user sessions, candidate, and company dashboard states.',
      'Designed and validated frontend forms using React Hook Form and Zod to match API constraints.',
    ],
    challenge:
      'Building a multi-tenant platform serving both corporate recruiters and job seekers that securely manages file uploads, handles complex paginated job/applicant searches, and scales asynchronously without blocking Express API request-response cycles.',
    solution:
      'Assisted the lead developer by integrating Express API endpoints into the Next.js frontend, managing application state using Zustand, and building responsive UI views with Tailwind CSS and validated forms.',
    githubUrl: 'https://github.com/riomar0001/bayaw-jobs',
    demoUrl: '',
  },
];
