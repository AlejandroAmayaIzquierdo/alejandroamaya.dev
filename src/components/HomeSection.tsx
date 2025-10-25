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
import { useTranslation } from "react-i18next";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HomeSectionProps extends React.HTMLAttributes<HTMLElement> {}
const HomeSection: React.FC<HomeSectionProps> = () => {
  const { t } = useTranslation();
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

  // Animation for central image
  const imageScale = useTransform(scrollMotion, [0, 400], [1, 1.2]);
  const imageOpacity = useTransform(scrollMotion, [0, 600], [1, 0]);

  // Animation for DEVELOPER text
  const developerX = useTransform(scrollMotion, [0, 800], [0, -200]);

  // Animation for vertical text
  const verticalTextY = useTransform(scrollMotion, [0, 800], [0, -100]);

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
        {t("home.title")
          .toUpperCase()
          .split("")
          .map((current, i) => (
            <motion.div
              key={i}
              variants={pullupVariant}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              custom={i}
              spellCheck="false"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold font-[Space-Grotesk-Bold] text-foreground tracking-[0.05em] md:tracking-[0.1em]"
            >
              {current == " " ? <span>&nbsp;</span> : current}
            </motion.div>
          ))}
      </div>

      {/* Central image - hidden on mobile */}
      <motion.div
        className="md:block absolute top-1/2 right-1/6 lg:-translate-x-1/5 md:-translate-x-1/5 -translate-y-1/2 w-[200px] h-[400px] md:w-[400px] md:h-[600px] -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          scale: imageScale,
          opacity: imageOpacity,
        }}
      >
        <img
          src="/pexels-steve-pancrate.jpg"
          alt="Developer portrait"
          className="w-full h-full object-cover grayscale"
        />
      </motion.div>
      <motion.div
        className="absolute top-1/3 left-2 md:left-8 text-right text-md md:text-md italic space-y-1 font-[manrope] text-secondary"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, staggerChildren: 0.1 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ScrambleText>Full Stack</ScrambleText>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ScrambleText>ASP.NET & C#</ScrambleText>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <ScrambleText>React & Angular</ScrambleText>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <ScrambleText>TypeScript</ScrambleText>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <ScrambleText>Node.js</ScrambleText>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <ScrambleText>APIs</ScrambleText>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
        >
          <ScrambleText>Websocket</ScrambleText>
        </motion.div>
      </motion.div>

      {/* Large text at bottom */}
      <motion.div
        className="absolute bottom-0 left-5 text-[3rem] sm:text-[3rem] md:text-[5rem] lg:text-[8rem] xl:text-[11rem] font-[Space-Grotesk-Bold] font-extrabold tracking-tighter leading-none opacity-100"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        spellCheck="false"
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        style={{
          x: developerX,
        }}
      >
        {t("home.role")}
      </motion.div>

      {/* Right side vertical text */}
      <motion.div
        className="block absolute top-1/2 right-4 -translate-y-1/2 text-xs tracking-widest font-[manrope] text-secondary"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          y: verticalTextY,
        }}
      >
        <div
          className="[writing-mode:vertical-lr] rotate-180"
          spellCheck="false"
        >
          {t("home.location", { year: new Date().getFullYear() })}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 90, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="hidden md:block absolute bottom-0 right-0"
      >
        <ArrowUpRight
          strokeLinecap="butt"
          strokeLinejoin="miter"
          className="text-foreground w-20 h-20 md:w-30 md:h-30"
        />
      </motion.div>
      <motion.div
        className="hidden md:block absolute lg:top-10 md:top-15 left-0"
        initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
        animate={{ opacity: 1, rotate: -90, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <ArrowUpRight
          strokeLinecap="butt"
          strokeLinejoin="miter"
          className="text-foreground w-20 h-20 md:w-30 md:h-30"
        />
      </motion.div>
    </motion.section>
  );
};

export default HomeSection;
