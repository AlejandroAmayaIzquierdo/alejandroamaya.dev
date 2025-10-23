import { useEffect, useRef } from "react";
import Header from "./components/Header";
import Lenis from "lenis";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import WorkSection from "./components/WorkSection";
import ContactSection from "./components/ContactSection";

import "./fonts/MonumentExtended-Regular.otf";

const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    const aboutheight =
      document.getElementById("about")?.getBoundingClientRect().height || 0;

    console.log("About section height:", aboutheight);

    let offset = -80; // Default offset for header height
    if (sectionId === "about") {
      offset = -20; // Custom offset for About section
    } else if (sectionId === "work") {
      offset = 0; // Custom offset for Work section
    } else if (sectionId === "contact") {
      offset = -20; // Custom offset for Contact section
    }
    if (section && lenisRef.current) {
      const sectionTop = section.offsetTop;

      lenisRef.current.scrollTo(sectionTop, {
        offset: offset,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenisRef.current = lenis;
  }, []);

  return (
    <div className="bg-background">
      <Header
        lenis={lenisRef.current}
        onNavClick={(section) => handleScrollToSection(section)}
      />

      <main>
        <HomeSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default App;
