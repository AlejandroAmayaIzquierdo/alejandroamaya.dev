import { useEffect, useRef } from "react";
import Header from "./components/Header";
import Lenis from "lenis";
import HomeSection from "./components/HomeSection";
import "./fonts/MonumentExtended-Regular.otf";
import AboutSection from "./components/AboutSection";
import WorkSection from "./components/WorkSection";

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
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center"
        >
          <h1 className="text-4xl font-bold">Contact Section</h1>
        </section>
      </main>
    </div>
  );
};

export default App;
