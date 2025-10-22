import React, { useRef } from "react";
import { motion } from "motion/react";

export interface SubSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface StickySubSectionProps {
  subsection: SubSection;
  index: number;
  total: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scrollMotion: any;
  scrollRange: number[];
  offsetTop?: number;
}

const StickySubSection: React.FC<StickySubSectionProps> = ({
  subsection,
  index,
}) => {
  const subSectionRef = useRef<HTMLDivElement>(null);

  // Calculate scroll range for this specific subsection

  //   const height = subSectionRef.current
  //     ? subSectionRef.current.getBoundingClientRect().height
  //     : 600;
  //   const rangeStart = scrollRange[0] + height * (index / total);
  //   const rangeEnd = scrollRange[0] + height * ((index + 1) / total);

  //   console.log(
  //     "rangeStart:",
  //     rangeStart,
  //     "rangeEnd:",
  //     rangeEnd,
  //     "index:",
  //     index,
  //     "total:",
  //     total
  //   );

  // Scale down as next section approaches
  //   const scale = useTransform(scrollMotion, [rangeStart, rangeEnd], [1, 0.95]);

  // Move up and fade out content (but keep title visible)
  //   const contentOpacity = useTransform(
  //     scrollMotion,
  //     [rangeStart, rangeEnd - 100, rangeEnd],
  //     [1, 1, 0]
  //   );

  //   const clipPath = useTransform(
  //     scrollMotion,
  //     [rangeStart, rangeEnd],
  //     ["inset(0% 0% 0% 0% round 16px)", "inset(0% 0% 100% 0% round 16px)"]
  //   );

  //   const contentY = useTransform(scrollMotion, [rangeStart, rangeEnd], [0, -50]);

  return (
    <div ref={subSectionRef} className="relative h-[100vh] subsection">
      <motion.div
        className="sticky rounded-2xl overflow-hidden mb-4 subsection bg-foreground"
        style={{
          top: "25%", // Stack with offset
          zIndex: index, // Higher z-index for earlier sections
        }}
      >
        {/* Title - Always Visible */}
        <h2 className="flex-wrap-reverse text-primary font-bold font-[Space-Grotesk-Bold] text-xl md:text-2xl pb-2 border-b-2">
          ({subsection.title})
        </h2>

        {/* Content - Fades out when next section comes */}
        <motion.div
          className="p-6"
          //   style={{
          //     opacity: contentOpacity,
          //     y: contentY,
          //     scale: scale,
          //     clipPath: clipPath,
          //   }}
        >
          {subsection.content}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StickySubSection;
