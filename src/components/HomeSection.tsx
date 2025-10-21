// interface HomeSectionProps {}
import {
  motion,
  useMotionValue,
  usePageInView,
  useTransform,
  type Variants,
} from "motion/react";

import { ArrowUpRight } from "lucide-react";
import useScroll from "../hooks/useScroll";
import ScrambleText from "./ScrambleText";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HomeSectionProps extends React.HTMLAttributes<HTMLElement> {}
const HomeSection: React.FC<HomeSectionProps> = () => {
  const isInView = usePageInView();
  const { scroll } = useScroll();

  const scrollMotion = useMotionValue(scroll);
  useEffect(() => {
    scrollMotion.set(scroll);
  }, [scroll, scrollMotion]);

  const pullupVariant: Variants = {
    initial: { y: "100%", clipPath: "inset(0 0 100% 0)" },
    animate: (i: number) => ({
      y: "0%",
      clipPath: "inset(0 0 0% 0)",
      transition: {
        delay: i * 0.04,
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  const y = useTransform(scrollMotion, [0, 800], [0, 500]);
  const opacity = useTransform(scrollMotion, [0, 800], [1, 0]);
  const scale = useTransform(scrollMotion, [0, 300], [1, 0.9]);

  return (
    <motion.section
      id="home"
      className="min-h-screen flex flex-col items-center justify-start gap-3 md:gap-5 bg-background pt-24 md:pt-40 px-4 md:px-0 relative overflow-hidden"
      style={{
        opacity: opacity.get(),
        transform: `translateY(${y.get()}px) scale(${scale.get()})`,
      }}
    >
      <div className="flex justify-center flex-wrap md:flex-nowrap">
        {"Alejandro Amaya"
          .toUpperCase()
          .split("")
          .map((current, i) => (
            <motion.div
              key={i}
              variants={pullupVariant}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              custom={i}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold font-[Space-Grotesk-Bold] text-foreground tracking-[0.05em] md:tracking-[0.1em]"
            >
              {current == " " ? <span>&nbsp;</span> : current}
            </motion.div>
          ))}
      </div>

      {/* Central image - hidden on mobile */}
      <div className="md:block absolute top-1/2 right-1/6 lg:-translate-x-1/5 md:-translate-x-1/5 -translate-y-1/2 w-[200px] h-[400px] md:w-[400px] md:h-[600px] -z-10">
        <img
          src="/pexels-steve-pancrate.jpg"
          alt="Developer portrait"
          className="w-full h-full object-cover grayscale"
        />
      </div>
      <div className="absolute top-1/3 left-2 md:left-8 text-right text-md md:text-md italic space-y-1 font-[manrope] text-secondary">
        <ScrambleText>Full Stack</ScrambleText>
        <ScrambleText>ASP.NET & C#</ScrambleText>
        <ScrambleText>React & Angular</ScrambleText>
        <ScrambleText>TypeScript</ScrambleText>
        <ScrambleText>Node.js</ScrambleText>
        <ScrambleText>APIs</ScrambleText>
        <ScrambleText>Websocket</ScrambleText>
      </div>

      {/* Large text at bottom */}
      <div className="absolute bottom-0 left-0 text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[12rem] font-[Space-Grotesk-Bold] font-extrabold tracking-tighter leading-none opacity-100">
        DEVELOPER
      </div>

      {/* Right side vertical text - hidden on mobile */}
      <div className="hidden md:block absolute top-1/2 right-4 -translate-y-1/2 text-xs tracking-widest font-[manrope] text-secondary">
        <div className="[writing-mode:vertical-lr] rotate-180">
          Full Stack Developer • {new Date().getFullYear()} • Tenerife
        </div>
      </div>
      <ArrowUpRight
        strokeLinecap="butt"
        strokeLinejoin="miter"
        className="absolute bottom-0 right-0 text-foreground rotate-90 w-20 h-20 md:w-30 md:h-30"
      />
      <ArrowUpRight
        strokeLinecap="butt"
        strokeLinejoin="miter"
        className="absolute lg:top-10 md:top-15 left-0 text-foreground -rotate-90 w-20 h-20 md:w-30 md:h-30"
      />
    </motion.section>
  );
};

export default HomeSection;
