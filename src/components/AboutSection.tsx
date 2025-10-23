import { useTransform, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useScroll from "../hooks/useScroll";
import { motion } from "motion/react";
// import ParallaxCard from "./ParallaxCard";
import type { SubSection } from "./StickySubSection";
import StickySubSection from "./StickySubSection";
import ParallaxCard from "./ParallaxCard";
// import { batch, FadeIn, StickyIn, ZoomIn } from "react-scroll-motion";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AboutSectionProps extends React.HTMLAttributes<HTMLElement> {}
const AboutSection: React.FC<AboutSectionProps> = () => {
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
      title: "About Me",
      content: (
        <div>
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
              using <span className="font-semibold">WebSockets</span> in both{" "}
              <span className="font-semibold">Node.js</span> and{" "}
              <span className="font-semibold">C#</span>.
            </p>

            <p className="text-base md:text-xl leading-relaxed font-light font-[manrope]">
              While I find my deepest enjoyment in backend development, I also
              have over{" "}
              <span className="font-semibold">3 years of experience</span>{" "}
              working with <span className="font-semibold">React</span> and{" "}
              <span className="font-semibold">Angular</span>. That said,{" "}
              <span className="font-semibold text-primary">Svelte</span> has a
              special place in my heart for its elegant simplicity and
              reactivity.
            </p>

            <p className="text-base md:text-xl leading-relaxed font-light font-[manrope]">
              I'm always on the lookout for{" "}
              <span className="font-semibold text-primary">new challenges</span>{" "}
              and{" "}
              <span className="font-semibold text-primary">
                interesting projects
              </span>{" "}
              — especially those that push the boundaries of what's possible in
              real-time, connected applications.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "skills",
      title: "Skills",
      content: (
        <div className="space-y-4">
          {[
            { name: "C# / ASP.NET", level: 95 },
            { name: "React / TypeScript", level: 90 },
            { name: "Node.js / WebSockets", level: 85 },
            { name: "SQL / MongoDB", level: 88 },
            { name: "Docker / CI/CD", level: 80 },
          ].map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-2">
                <span className="text-lg font-semibold text-secondary">
                  {skill.name}
                </span>
                <span className="text-lg">{skill.level}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <motion.div
                  className="bg-secondary h-3 rounded-full"
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
    {
      id: "tools",
      title: "Tools & Technologies",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Visual Studio",
            "VS Code",
            "Git / GitHub",
            "Docker",
            "Postman",
            "Figma",
            "Azure",
            "Vercel",
            "MongoDB Atlas",
          ].map((tool) => (
            <motion.div
              key={tool}
              className="bg-card border border-border rounded-lg p-4 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-lg font-medium">{tool}</span>
            </motion.div>
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
      className="min-h-screen relative mx-2"
    >
      <div className="bg-foreground w-full h-full flex flex-col justify-start items-center p-10 rounded-t-2xl">
        <div className="w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-primary font-[Space-Grotesk-Bold]">
            ABOUT /
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-2 items-start justify-start w-full">
          <motion.div
            className="w-1/2 pt-10"
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

          <div className="w-1/2 space-y-0 pt-32">
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
