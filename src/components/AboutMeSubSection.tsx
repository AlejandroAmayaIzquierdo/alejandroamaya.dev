import { useMotionValue, useTransform } from "motion/react";
import useScroll from "../hooks/useScroll";
import { useEffect } from "react";
import { motion } from "motion/react";

// interface AboutMeSubSectionProps {}
const AboutMeSubSection: React.FC = () => {
  const { scroll } = useScroll();

  const scrollMotion = useMotionValue(scroll);
  useEffect(() => {
    console.log({ scroll });
    scrollMotion.set(scroll);
  }, [scroll, scrollMotion]);

  const y = useTransform(scrollMotion, [975, 1500], [0, 525]);
  const clipPath = useTransform(
    scrollMotion,
    [1000, 1500],
    ["inset(0 0 0% 0)", "inset(0 0 90% 0)"]
  );

  return (
    <motion.div
      style={{
        transform: `translateY(${y.get()}px)`,
        clipPath: clipPath.get(),
      }}
      className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 flex flex-1 flex-row items-start justify-start"
    >
      <span className="flex-wrap-reverse text-primary font-bold font-[Space-Grotesk-Bold] text-2xl">
        (ABOUT ME)
      </span>
      <div className="max-w-4xl text-secondary space-y-6">
        <p className="text-xl leading-relaxed font-light font-[manrope]">
          I’m a{" "}
          <span className="font-semibold text-primary">software developer</span>{" "}
          specializing in <span className="font-semibold">C#</span> and{" "}
          <span className="font-semibold">ASP.NET</span>, with solid experience
          creating <span className="font-semibold">REST APIs</span> and{" "}
          <span className="font-semibold">real-time applications</span> using{" "}
          <span className="font-semibold">WebSockets</span> in both{" "}
          <span className="font-semibold">Node.js</span> and{" "}
          <span className="font-semibold">C#</span>.
        </p>

        <p className="text-xl leading-relaxed font-light font-[manrope]">
          While I find my deepest enjoyment in backend development, I also have
          over <span className="font-semibold">3 years of experience</span>{" "}
          working with <span className="font-semibold">React</span> and{" "}
          <span className="font-semibold">Angular</span>. That said,{" "}
          <span className="font-semibold text-primary">Svelte</span> has a
          special place in my heart for its elegant simplicity and reactivity.
        </p>

        <p className="text-xl leading-relaxed font-light font-[manrope]">
          I’m always on the lookout for{" "}
          <span className="font-semibold text-primary">new challenges</span> and{" "}
          <span className="font-semibold text-primary">
            interesting projects
          </span>{" "}
          — especially those that push the boundaries of what’s possible in
          real-time, connected applications.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutMeSubSection;
