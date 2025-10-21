import { useTransform, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useScroll from "../hooks/useScroll";
import { motion } from "motion/react";
import ParallaxCard from "./ParallaxCard";
// import { batch, FadeIn, StickyIn, ZoomIn } from "react-scroll-motion";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AboutSectionProps extends React.HTMLAttributes<HTMLElement> {}
const AboutSection: React.FC<AboutSectionProps> = () => {
  const { scroll } = useScroll();

  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState([0, 1000]);

  // const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());

  const scrollMotion = useMotionValue(scroll);
  useEffect(() => {
    scrollMotion.set(scroll);
  }, [scroll, scrollMotion]);

  const opacity = useTransform(scrollMotion, [0, 120], [0, 1]);
  const y = useTransform(scrollMotion, [0, 130], [100, 0]);
  const scale = useTransform(scrollMotion, [0, 130], [0.95, 1]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const followScroll = useTransform(scrollMotion, scrollRange, [
    0,
    scrollRange[1] - scrollRange[0],
  ]);

  useEffect(() => {
    const calculateRange = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        const start = sectionTop + window.innerHeight * 0.3;
        const end = sectionTop + sectionHeight - window.innerHeight * 0.8;

        setScrollRange([Math.max(0, start), end]);
      }
    };

    window.addEventListener("resize", calculateRange);
    window.addEventListener("load", calculateRange);

    calculateRange();

    return () => {
      window.removeEventListener("resize", calculateRange);
      window.removeEventListener("load", calculateRange);
    };
  }, []);

  return (
    <motion.section
      id="work"
      ref={sectionRef}
      style={{
        opacity: opacity.get(),
        transform: `translateY(${y.get()}px) scale(${scale.get()})`,
      }}
      className="min-h-screen flex items-start justify-start px-2 md:px-0"
    >
      <div className="bg-foreground w-full ml-0 mr-0 md:ml-2 md:mr-2 h-full min-h-screen  rounded-t-2xl flex flex-col justify-start items-center p-4 md:p-10">
        <div className="w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-primary font-[Space-Grotesk-Bold]">
            ABOUT /
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-start w-full h-full">
          <motion.div className="w-full md:w-1/2">
            <ParallaxCard height={400}>
              <img
                className="rounded-tl-sm rounded-br-sm grayscale"
                src="/photo.jpg"
              />
            </ParallaxCard>
          </motion.div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center pt-15 md:pt-40 pb-20 lg:pb-0 h-full relative">
            {/* About Me Subsection */}
            <div>
              <span className="flex-wrap-reverse text-primary font-bold font-[Space-Grotesk-Bold] text-xl md:text-2xl">
                (ABOUT ME)
              </span>
              <div className="max-w-4xl text-secondary space-y-4 md:space-y-6">
                <p className="text-base md:text-xl leading-relaxed font-light font-[manrope]">
                  I'm a{" "}
                  <span className="font-semibold text-primary">
                    software developer
                  </span>{" "}
                  specializing in <span className="font-semibold">C#</span> and{" "}
                  <span className="font-semibold">ASP.NET</span>, with solid
                  experience creating{" "}
                  <span className="font-semibold">REST APIs</span> and{" "}
                  <span className="font-semibold">real-time applications</span>{" "}
                  using <span className="font-semibold">WebSockets</span> in
                  both <span className="font-semibold">Node.js</span> and{" "}
                  <span className="font-semibold">C#</span>.
                </p>

                <p className="text-base md:text-xl leading-relaxed font-light font-[manrope]">
                  While I find my deepest enjoyment in backend development, I
                  also have over{" "}
                  <span className="font-semibold">3 years of experience</span>{" "}
                  working with <span className="font-semibold">React</span> and{" "}
                  <span className="font-semibold">Angular</span>. That said,{" "}
                  <span className="font-semibold text-primary">Svelte</span> has
                  a special place in my heart for its elegant simplicity and
                  reactivity.
                </p>

                <p className="text-base md:text-xl leading-relaxed font-light font-[manrope]">
                  I'm always on the lookout for{" "}
                  <span className="font-semibold text-primary">
                    new challenges
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-primary">
                    interesting projects
                  </span>{" "}
                  — especially those that push the boundaries of what's possible
                  in real-time, connected applications.
                </p>
              </div>
            </div>
            {/* Skills Subsection */}
            <div className="border-t-4  w-full mt-2 pt-2">
              <span className="flex-wrap-reverse text-primary font-bold font-[Space-Grotesk-Bold] text-xl md:text-2xl">
                (SKILLS)
              </span>
              <div className="max-w-4xl text-secondary space-y-4 md:space-y-6">
                <p className="text-base md:text-xl leading-relaxed font-light font-[manrope]">
                  My technical skill set encompasses a variety of programming
                  languages and frameworks. I am proficient in{" "}
                  <span className="font-semibold">C#</span>,{" "}
                  <span className="font-semibold">JavaScript</span>, and{" "}
                  <span className="font-semibold">TypeScript</span>, which I
                  utilize to build robust backend services and dynamic web
                  applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
