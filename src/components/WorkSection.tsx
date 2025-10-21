import { useEffect, useRef, useState } from "react";
import WorkComponent from "./WorkComponent";
import { useMotionValue, useTransform } from "motion/react";
import useScroll from "../hooks/useScroll";

// interface WorkSectionProps {}
const WorkSection: React.FC = () => {
  const [countSection, setCurrentCountSection] = useState(1);
  const [scrollRange, setScrollRange] = useState([0, 1000]);

  const { scroll } = useScroll();

  const scrollMotion = useMotionValue(scroll);
  const sectionRef = useRef<HTMLElement>(null);
  const refResponsive = useRef<HTMLDivElement>(null);
  const refRegexle = useRef<HTMLDivElement>(null);
  const refPollClash = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollMotion.set(scroll);

    if (refResponsive.current && refRegexle.current && refPollClash.current) {
      const { bottom: bottomRegexle } =
        refRegexle.current.getBoundingClientRect();
      const { bottom: bottomPollClash } =
        refPollClash.current.getBoundingClientRect();
      const innerHeight = window.innerHeight;

      if (
        bottomRegexle - innerHeight > 0 &&
        bottomPollClash - innerHeight > 0
      ) {
        setCurrentCountSection(1);
      }
      if (bottomRegexle - innerHeight < 0) {
        setCurrentCountSection(2);
      }
      if (bottomPollClash - innerHeight < 0) {
        setCurrentCountSection(3);
      }
    }
  }, [scroll, scrollMotion]);

  // Calculate dynamic scroll ranges based on section position
  useEffect(() => {
    const calculateRange = () => {
      if (sectionRef.current && refResponsive.current && refPollClash.current) {
        // Get the offsetTop of the section and last work item
        // const sectionTop = sectionRef.current.offsetTop;
        const responsiveTop = refResponsive.current.offsetTop;
        const lastItemTop = refPollClash.current.offsetTop;
        // const lastItemHeight = refPollClash.current.offsetHeight;

        // Start when section enters viewport
        const start = responsiveTop;
        // End when last item exits viewport
        const end = lastItemTop;

        setScrollRange([Math.max(0, start), end]);
      }
    };

    calculateRange();
    window.addEventListener("resize", calculateRange);
    // Recalculate after images/content load
    window.addEventListener("load", calculateRange);

    return () => {
      window.removeEventListener("resize", calculateRange);
      window.removeEventListener("load", calculateRange);
    };
  }, []);

  const y = useTransform(scrollMotion, scrollRange, [
    0,
    scrollRange[1] - scrollRange[0],
  ]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-start justify-start"
    >
      <div className="bg-foreground w-full ml-2 mr-2 h-full flex flex-col justify-start items-center p-10 rounded-b-2xl">
        <div className="w-full">
          <h1 className="text-6xl font-bold text-primary font-[Space-Grotesk-Bold]">
            MY WORKS /
          </h1>
        </div>

        <div className="w-full mt-10 flex flex-col gap-10">
          <div className="flex flex-row gap-5 flex-wrap justify-between items-start">
            <h1
              className="text-9xl text-secondary w-1/5 font-[Space-Grotesk-Bold] p-10"
              style={{ transform: `translateY(${y.get()}px)` }}
            >
              {countSection.toString().padStart(2, "0")}
            </h1>
            <div className="w-3/5">
              <WorkComponent
                ref={refResponsive}
                title="Responsive Extension"
                description="A extension for developers to check responsive designs."
                link="https://chromewebstore.google.com/u/1/detail/responsive-extension/dppcabjajpicaohiikhpjgkgkpekloke"
                videoSrc="/responsive-extension.mp4"
              />
              <WorkComponent
                ref={refRegexle}
                title="Regexle"
                description="Regexle is a fun, daily challenge webapp where players must discover the correct regular expression to solve a given problem"
                videoSrc="/regexle.png"
                link="https://github.com/AlejandroAmayaIzquierdo/Regexle"
                isVideo={false}
              />
              <WorkComponent
                ref={refPollClash}
                title="Poll Clash"
                description="Poll Clash is an easy-to-use, real-time polling platform designed for scalability."
                videoSrc="/poll-clash.mp4"
                link="https://github.com/AlejandroAmayaIzquierdo/Poll_Clash"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
