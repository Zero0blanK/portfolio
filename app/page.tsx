import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Experience } from '@/components/experience';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';
import { SealToTop } from '@/components/seal-to-top';

/**
 * Sections stack with no gap so each one's spine segment meets the next and
 * the stalk runs unbroken from the hero's node to the bloom at the foot.
 */
export default function Home() {
  return (
    <main className="relative isolate overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 paddy-field" />

      <Navbar />

      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />

      <SealToTop />
    </main>
  );
}
