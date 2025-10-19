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
      <Header lenis={lenisRef.current} />

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
