import { useTransform, useMotionValue } from "motion/react";
import { useEffect } from "react";
import useScroll from "../hooks/useScroll";
import { motion } from "motion/react";
import ParallaxCard from "./ParallaxCard";
import AboutMeSubSection from "./AboutMeSubSection";
import SkillsSubSection from "./SkillsSubSection";

// interface AboutSectionProps {}
const AboutSection: React.FC = () => {
  const { scroll } = useScroll();

  const scrollMotion = useMotionValue(scroll);
  useEffect(() => {
    scrollMotion.set(scroll);
  }, [scroll, scrollMotion]);

  const opacity = useTransform(scrollMotion, [0, 120], [0, 1]);
  const y = useTransform(scrollMotion, [0, 130], [100, 0]);
  const scale = useTransform(scrollMotion, [0, 130], [0.95, 1]);

  const followScroll = useTransform(scrollMotion, [990, 1500], [0, 525]);

  return (
    <motion.section
      id="work"
      style={{
        opacity: opacity.get(),
        transform: `translateY(${y.get()}px) scale(${scale.get()})`,
      }}
      className="min-h-[150vh] flex items-start justify-start px-2 md:px-0"
    >
      <div className="bg-foreground w-full ml-0 mr-0 md:ml-2 md:mr-2 min-h-[150vh] rounded-t-2xl flex flex-col justify-start items-center p-4 md:p-10">
        <div className="w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-primary font-[Space-Grotesk-Bold]">
            ABOUT /
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-start w-full pt-10">
          <motion.div
            style={{
              transform: `translateY(${followScroll.get()}px)`,
            }}
            className="w-full md:w-1/2"
          >
            <ParallaxCard height={400}>
              <img
                className="rounded-tl-sm rounded-br-sm grayscale"
                src="/photo.jpg"
              />
            </ParallaxCard>
          </motion.div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center pt-15 md:pt-40 pb-20 lg:pb-0">
            <AboutMeSubSection />
            <SkillsSubSection />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
