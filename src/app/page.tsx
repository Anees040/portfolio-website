import GeometricBackground from "@/components/GeometricBackground";
import Navigation from "@/components/Navigation";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <GeometricBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
