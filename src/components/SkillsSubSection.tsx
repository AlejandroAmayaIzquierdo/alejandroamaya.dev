import { motion, useMotionValue, useTransform } from "motion/react";
import useScroll from "../hooks/useScroll";
import { useEffect } from "react";

// interface SkillsSubSectionProps {}
const SkillsSubSection: React.FC = () => {
  const { scroll } = useScroll();

  const scrollMotion = useMotionValue(scroll);
  useEffect(() => {
    console.log({ scroll });
    scrollMotion.set(scroll);
  }, [scroll, scrollMotion]);

  const y = useTransform(scrollMotion, [975, 1500], [0, 100]);
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
      className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 flex flex-1 flex-row items-start justify-start border-t-4 pt-5 mt-10"
    >
      <span className="flex-wrap-reverse text-primary font-bold font-[Space-Grotesk-Bold] text-2xl">
        (SKILLS)
      </span>
      <div className="max-w-4xl text-secondary space-y-6">
        <p className="text-xl leading-relaxed font-light font-[manrope]">
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
