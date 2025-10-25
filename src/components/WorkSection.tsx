import { useEffect, useRef, useState } from "react";
import WorkComponent from "./WorkComponent";
import { useMotionValue } from "motion/react";
import useScroll from "../hooks/useScroll";
import { useTranslation } from "react-i18next";

// interface WorkSectionProps {}
const WorkSection: React.FC = () => {
  const { t } = useTranslation();
  const [countSection, setCurrentCountSection] = useState(1);
  // const [scrollRange, setScrollRange] = useState([0, 1000]);

  const { scroll } = useScroll();

  const scrollMotion = useMotionValue(scroll);
  const sectionRef = useRef<HTMLElement>(null);

  const refRplace = useRef<HTMLDivElement>(null);
  const refResponsive = useRef<HTMLDivElement>(null);
  const refRegexle = useRef<HTMLDivElement>(null);
  const refPollClash = useRef<HTMLDivElement>(null);

  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollMotion.set(scroll);

    if (
      refResponsive.current &&
      refRegexle.current &&
      refPollClash.current &&
      refRplace.current
    ) {
      const { bottom: bottomRplace } =
        refRplace.current.getBoundingClientRect();
      const { bottom: bottomResponsive } =
        refResponsive.current.getBoundingClientRect();
      const { bottom: bottomRegexle } =
        refRegexle.current.getBoundingClientRect();
      const { bottom: bottomPollClash } =
        refPollClash.current.getBoundingClientRect();
      const innerHeight = window.innerHeight;

      const numberHeight =
        numberRef.current?.getBoundingClientRect().height || 0;

      if (
        bottomRplace - innerHeight - numberHeight / 2 > 0 &&
        bottomResponsive - innerHeight - numberHeight / 2 > 0
      ) {
        setCurrentCountSection(1);
      }
      if (bottomResponsive - innerHeight - numberHeight / 2 < 0) {
        setCurrentCountSection(2);
      }
      if (bottomRegexle - innerHeight - numberHeight / 2 < 0) {
        setCurrentCountSection(3);
      }
      if (bottomPollClash - innerHeight - numberHeight / 2 < 0) {
        setCurrentCountSection(4);
      }
    }
  }, [scroll, scrollMotion]);

  // Calculate dynamic scroll ranges based on section position
  // useEffect(() => {
  //   const calculateRange = () => {
  //     if (sectionRef.current && refResponsive.current && refPollClash.current) {
  //       // Get the offsetTop of the section and last work item
  //       // const sectionTop = sectionRef.current.offsetTop;
  //       const responsiveTop = refResponsive.current.offsetTop;
  //       const lastItemTop = refPollClash.current.offsetTop;
  //       // const lastItemHeight = refPollClash.current.offsetHeight;

  //       // Start when section enters viewport
  //       const start = responsiveTop;
  //       // End when last item exits viewport
  //       const end = lastItemTop;

  //       setScrollRange([Math.max(0, start), end]);
  //     }
  //   };

  //   calculateRange();
  //   window.addEventListener("resize", calculateRange);
  //   // Recalculate after images/content load
  //   window.addEventListener("load", calculateRange);

  //   return () => {
  //     window.removeEventListener("resize", calculateRange);
  //     window.removeEventListener("load", calculateRange);
  //   };
  // }, []);

  // const y = useTransform(scrollMotion, scrollRange, [
  //   0,
  //   scrollRange[1] - scrollRange[0],
  // ]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="min-h-screen flex items-start justify-start"
    >
      <div className="bg-foreground w-full ml-2 mr-2 h-full flex flex-col justify-start items-center p-3 md:p-5 rounded-b-2xl">
        <div className="w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-primary font-[Space-Grotesk-Bold]">
            {t("work.title")}
          </h1>
        </div>

        <div className="w-full mt-10 flex flex-col gap-10">
          <div className="flex flex-row gap-5 flex-wrap justify-between items-start">
            <div className="text-secondary font-[Space-Grotesk-Bold] sticky top-12 col-span-5 hidden h-fit w-1/3 overflow-hidden text-[20vw] font-normal leading-[0.8] xl:flex mb-70">
              <span
                className="relative font-[Space-Grotesk-Bold]"
                ref={numberRef}
              >
                0
              </span>
              <div className="relative">
                <div
                  className="absolute flex h-full w-fit flex-col transition-all duration-1000 ease-in-out font-[Space-Grotesk-Bold]"
                  style={{
                    transform: `translateY(-${(countSection - 1) * 100}%)`,
                  }}
                >
                  <span className="inline-block font-[Space-Grotesk-Bold]">
                    1
                  </span>
                  <span className="inline-block font-[Space-Grotesk-Bold]">
                    2
                  </span>
                  <span className="inline-block font-[Space-Grotesk-Bold]">
                    3
                  </span>
                  <span className="inline-block font-[Space-Grotesk-Bold]">
                    4
                  </span>
                </div>
              </div>
            </div>
            <div className="w-1/0.5 gap-40">
              <WorkComponent
                ref={refRplace}
                title={t("work.rplace.title")}
                description={t("work.rplace.description")}
                videoSrc="/my-rplace.jpg"
                link="https://my-rplace.fly.dev/"
                isVideo={false}
              />
              <WorkComponent
                ref={refResponsive}
                title={t("work.responsiveExtension.title")}
                description={t("work.responsiveExtension.description")}
                link="https://chromewebstore.google.com/u/1/detail/responsive-extension/dppcabjajpicaohiikhpjgkgkpekloke"
                videoSrc="/responsive-extension.mp4"
              />
              <WorkComponent
                ref={refRegexle}
                title={t("work.regexle.title")}
                description={t("work.regexle.description")}
                videoSrc="/regexle.png"
                link="https://github.com/AlejandroAmayaIzquierdo/Regexle"
                isVideo={false}
              />
              <WorkComponent
                ref={refPollClash}
                title={t("work.pollClash.title")}
                description={t("work.pollClash.description")}
                videoSrc="/poll-clash.mp4"
                link="https://github.com/AlejandroAmayaIzquierdo/Poll_Clash"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
