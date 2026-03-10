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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Ventures />
        <Projects />
        <Skills />
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
