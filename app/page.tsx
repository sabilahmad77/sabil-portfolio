import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
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
        <ScrollFloat variant="divider" height={100} />
        <About />
        <ScrollFloat variant="corner" height={80} />
        <Ventures />
        <Projects />
        <ScrollFloat variant="projects" height={110} />
        <Skills />
        <ScrollFloat variant="divider" height={90} scrollFactor={0.2} />
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
