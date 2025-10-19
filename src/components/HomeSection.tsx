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
import { useEffect } from "react";
const HomeSection: React.FC = () => {
  const isInView = usePageInView();
  const { scroll } = useScroll();

  const scrollMotion = useMotionValue(scroll);
  useEffect(() => {
    console.log({ scroll });
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
  const scale = useTransform(scrollMotion, [0, 800], [1, 0.95]);

  return (
    <motion.section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center gap-5 bg-background"
      style={{
        opacity: opacity.get(),
        transform: `translateY(${y.get()}px) scale(${scale.get()})`,
      }}
    >
      <div className="flex justify-center">
        {"Alejandro Amaya".split("").map((current, i) => (
          <motion.div
            key={i}
            variants={pullupVariant}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            custom={i}
            className="text-8xl font-extrabold font-[Space-Grotesk-Bold] text-foreground tracking-[0.2em]"
          >
            {current == "" ? <span>&nbsp;</span> : current}
          </motion.div>
        ))}
      </div>

      <span className="text-lg font-medium text-foreground font-[manrope]">
        Full Stack Developer
      </span>
      <ArrowUpRight
        strokeLinecap="butt"
        strokeLinejoin="miter"
        className="absolute bottom-0 right-0 text-foreground rotate-90 w-30 h-30"
      />
      <ArrowUpRight
        strokeLinecap="butt"
        strokeLinejoin="miter"
        className="absolute top-10 left-0 text-foreground -rotate-90 w-30 h-30"
      />
    </motion.section>
  );
};

export default HomeSection;
