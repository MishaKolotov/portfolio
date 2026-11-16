import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Stack } from '../components/Stack';
import { HowIWork } from '../components/HowIWork';
import { Outside } from '../components/Outside';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { HashOpener } from '../components/HashOpener';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="wrap" id="main">
        <Hero />
        <Experience />
        <Projects />
        <Stack />
        <HowIWork />
        <Outside />
        <Contact />
      </main>
      <Footer />
      <HashOpener />
    </>
  );
}
