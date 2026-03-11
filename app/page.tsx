import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HeroFeature from "@/components/sections/HeroFeature";
import About from "@/components/sections/About";
import Ventures from "@/components/sections/Ventures";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Writing from "@/components/sections/Writing";
import Vision from "@/components/sections/Vision";
import Contact from "@/components/sections/Contact";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollFloat from "@/components/3d/ScrollFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <HeroFeature />
        <ScrollFloat variant="corner" height={80} bgFrom="var(--color-abyss)" bgTo="var(--color-navy)" />
        <Ventures />
        <Projects />
        <ScrollFloat variant="projects" height={110} bgFrom="var(--color-navy)" bgTo="var(--color-abyss)" />
        <Skills />
        <ScrollFloat variant="divider" height={90} scrollFactor={0.2} bgFrom="var(--color-abyss)" bgTo="var(--color-navy)" />
        <Experience />
        <Writing />
        <Vision />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
