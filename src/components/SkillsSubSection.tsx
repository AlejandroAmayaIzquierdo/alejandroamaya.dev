import { motion, useMotionValue, useTransform } from "motion/react";
import useScroll from "../hooks/useScroll";
import { useEffect, useState } from "react";

// interface SkillsSubSectionProps {}
const SkillsSubSection: React.FC = () => {
  const { scroll } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  const scrollMotion = useMotionValue(scroll);
  const windowWidth = useMotionValue(window.innerWidth);
  useEffect(() => {
    // console.log({ scroll });
    scrollMotion.set(scroll);
  }, [scroll, scrollMotion]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      windowWidth.set(window.innerWidth);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Responsive scroll ranges: mobile uses smaller values
  const scrollStart = isMobile ? 500 : 990;
  const scrollEnd = isMobile ? 900 : 1500;
  // const translateEnd = isMobile ? 80 : 200;

  const translateEndTransform = useTransform(
    windowWidth,
    [320, 1920],
    [80, 200]
  );

  const y = useTransform(
    scrollMotion,
    [scrollStart, scrollEnd],
    [0, translateEndTransform.get()]
  );
  // const clipPath = useTransform(
  //   scrollMotion,
  //   [975, 2000],
  //   ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  // );
  return (
    <motion.div
      style={{
        transform: `translateY(${y.get()}px)`,
        // clipPath: clipPath.get(),
      }}
      className="flex flex-col gap-4 items-start justify-start border-t-2 md:border-t-4 pt-4 md:pt-5 mt-6 md:mt-10 w-full"
    >
      <span className="flex-wrap-reverse text-primary font-bold font-[Space-Grotesk-Bold] text-xl md:text-2xl">
        (SKILLS)
      </span>
      <div className="max-w-4xl text-secondary space-y-4 md:space-y-6">
        <p className="text-base md:text-xl leading-relaxed font-light font-[manrope]">
          My technical skill set encompasses a variety of programming languages
          and frameworks. I am proficient in{" "}
          <span className="font-semibold">C#</span>,{" "}
          <span className="font-semibold">JavaScript</span>, and{" "}
          <span className="font-semibold">TypeScript</span>, which I utilize to
          build robust backend services and dynamic web applications.
        </p>
      </div>
    </motion.div>
  );
};

export default SkillsSubSection;
