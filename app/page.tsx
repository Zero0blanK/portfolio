import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Projects } from '@/components/projects';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';

export default function Home() {
  return (
    <main className="relative isolate overflow-x-clip bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-35"
      />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      {/* <Experience /> */}
      <Contact />
    </main>
  );
}
