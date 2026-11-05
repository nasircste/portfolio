import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SocialRail } from "@/components/layout/SocialRail";
import { About } from "@/components/sections/About";
import { CallToAction } from "@/components/sections/CallToAction";
import { Competitive } from "@/components/sections/Competitive";
import { Contact } from "@/components/sections/Contact";
import { EducationResearch } from "@/components/sections/EducationResearch";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Cursor } from "@/components/shell/Cursor";
import { Loader } from "@/components/shell/Loader";
import { SmoothScroll } from "@/components/shell/SmoothScroll";
import { CharacterLayer } from "@/components/three/CharacterLayer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Loader />
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <SocialRail />
      <CharacterLayer />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <WhatIDo />
        <Experience />
        <Projects />
        <TechStack />
        <Competitive />
        <EducationResearch />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
