import { useTransform, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useScroll from "../hooks/useScroll";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
// import ParallaxCard from "./ParallaxCard";
import type { SubSection } from "./StickySubSection";
import StickySubSection from "./StickySubSection";
import ParallaxCard from "./ParallaxCard";
// import { batch, FadeIn, StickyIn, ZoomIn } from "react-scroll-motion";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AboutSectionProps extends React.HTMLAttributes<HTMLElement> {}
const AboutSection: React.FC<AboutSectionProps> = () => {
  const { t } = useTranslation();
  const { scroll } = useScroll();

  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState([100, 1000]);

  useEffect(() => {
    const heights = Array.from(document.querySelectorAll(".subsection")).map(
      (el) => el.getBoundingClientRect().height
    );

    const accumulated = heights.reduce<number[]>((acc, h, i) => {
      const prev = acc[i - 1] ?? 80; // empieza a 80px
      acc.push(prev + h * 0.2); // margen proporcional
      return acc;
    }, []);
    console.log("Calculated offsets:", accumulated);
  }, []);

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
        const start = sectionTop + window.innerHeight * 0.001;
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

  // Define subsections
  const subsections: SubSection[] = [
    {
      id: "about-me",
      title: t("about.aboutMe"),
      content: (
        <div>
          <div className="max-w-4xl text-secondary space-y-4 md:space-y-6">
            <p className="text-base md:text-xl leading-relaxed font-light font-[manrope]">
              {t("about.description.intro")}{" "}
              <span className="font-semibold text-primary">
                {t("about.description.developer")}
              </span>{" "}
              {t("about.description.specializing")}{" "}
              <span className="font-semibold">C#</span>{" "}
              {t("about.description.and")}{" "}
              <span className="font-semibold">ASP.NET</span>,{" "}
              {t("about.description.with")}{" "}
              <span className="font-semibold">
                {t("about.description.restApis")}
              </span>{" "}
              {t("about.description.and")}{" "}
              <span className="font-semibold">
                {t("about.description.realtimeApps")}
              </span>{" "}
              {t("about.description.using")}{" "}
              <span className="font-semibold">
                {t("about.description.websockets")}
              </span>{" "}
              {t("about.description.inBoth")}{" "}
              <span className="font-semibold">Node.js</span>{" "}
              {t("about.description.and")}{" "}
              <span className="font-semibold">C#</span>.
            </p>

            <p className="text-base md:text-xl leading-relaxed font-light font-[manrope]">
              {t("about.description.p2Intro")}{" "}
              <span className="font-semibold">
                {t("about.description.experience")}
              </span>{" "}
              {t("about.description.workingWith")}{" "}
              <span className="font-semibold">React</span>{" "}
              {t("about.description.and")}{" "}
              <span className="font-semibold">Angular</span>.{" "}
              {/* {t("about.description.thatSaid")}{" "} */}
              {/* <span className="font-semibold text-primary">
                {t("about.description.svelte")}
              </span>{" "}
              {t("about.description.hasSpecialPlace")} */}
            </p>

            <p className="text-base md:text-xl leading-relaxed font-light font-[manrope]">
              {t("about.description.p3Intro")}{" "}
              <span className="font-semibold text-primary">
                {t("about.description.newChallenges")}
              </span>{" "}
              {t("about.description.and")}{" "}
              <span className="font-semibold text-primary">
                {t("about.description.interestingProjects")}
              </span>{" "}
              {t("about.description.especially")}
            </p>
          </div>
        </div>
      ),
    },

    {
      id: "experience",
      title: t("about.experienceTitle"),
      content: (
        <div className="space-y-6">
          <motion.div
            className="border-l-2 border-primary pl-4 pb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <h3 className="text-lg md:text-xl font-bold text-primary">
                {t("about.experience.role")}
              </h3>
              <span className="text-sm text-muted-foreground">
                {t("about.experience.period")}
              </span>
            </div>
            <p className="text-base md:text-lg font-semibold text-secondary mb-2">
              {t("about.experience.company")}
            </p>
            <p className="text-sm md:text-base text-secondary/80 leading-relaxed">
              {t("about.experience.description")}
            </p>
          </motion.div>
        </div>
      ),
    },
    {
      id: "skills",
      title: t("about.skillsTitle"),
      content: (
        <div className="space-y-4">
          {[
            { name: t("about.skillsList.csharp"), level: 95 },
            { name: "React", level: 90 },
            { name: "WebSockets", level: 85 },
            { name: "SQL", level: 88 },
            { name: "Docker", level: 80 },
          ].map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-2">
                <span className="text-lg font-semibold text-secondary">
                  {skill.name}
                </span>
                <span className="text-lg text-primary">{skill.level}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <motion.div
                  className="bg-primary h-3 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      style={{
        opacity: opacity.get(),
        transform: `translateY(${y.get()}px) scale(${scale.get()})`,
      }}
      className="min-h-screen relative flex items-start justify-start"
    >
      <div className="bg-foreground w-full ml-2 mr-2 h-full flex flex-col justify-start items-center p-3 md:p-5 rounded-t-2xl">
        <div className="w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-primary font-[Space-Grotesk-Bold]">
            {t("about.title")}
          </h1>
        </div>

        <div className=" flex flex-col md:flex-row gap-4 md:gap-2 items-start justify-start w-full">
          <motion.div
            className="w-1/2 pt-10 hidden md:block"
            style={{
              transform: `translateY(${followScroll.get()}px)`,
            }}
          >
            <ParallaxCard height={400}>
              <img
                className="rounded-tl-sm rounded-br-sm grayscale"
                src="/photo.jpg"
              />
            </ParallaxCard>
          </motion.div>
          {/* Right Column - Stacked Subsections */}

          <div className="w-full md:w-1/2 space-y-0 pt-32">
            {subsections.map((subsection, index) => (
              <StickySubSection
                key={subsection.id}
                subsection={subsection}
                index={index}
                total={subsections.length}
                scrollMotion={scrollMotion}
                scrollRange={scrollRange}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
