import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Project from "@/components/Project";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <section className="relative">
        <div className="relative z-0">
          <Skills />
        </div>

        <div className="relative z-10">
          <Project />
        </div>
      </section>
      <Contact />
    </>
  );
}
