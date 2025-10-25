import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type Lenis from "lenis";
import useScroll from "../hooks/useScroll";
import ScrambleText, { type ScrambleTextRef } from "./ScrambleText";
import { useTranslation } from "react-i18next";
interface HeaderProps {
  lenis?: Lenis | null;
  onNavClick?: (section: string) => void;
}
const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const { scroll } = useScroll();

  const aboutScrambleRef = useRef<ScrambleTextRef>(null);
  const workScrambleRef = useRef<ScrambleTextRef>(null);
  const contactScrambleRef = useRef<ScrambleTextRef>(null);

  useEffect(() => {
    setShow(scroll < lastScroll || scroll < 50); // muestra si sube o está arriba
    setLastScroll(scroll);
  }, [scroll]);

  useEffect(() => {
    if (!show) return;

    setTimeout(() => {
      const refs = [aboutScrambleRef, workScrambleRef, contactScrambleRef];

      const delay = 250; // milliseconds between each scramble

      refs.forEach((ref, index) => {
        setTimeout(() => {
          ref.current?.scramble();
        }, index * delay);
      });
    }, 400);
  }, [show]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: show ? 0 : -80,
        opacity: show ? 1 : 0,
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute top-0 z-40 w-full"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 px-4 md:px-6">
        <div className="text-lg md:text-2xl font-bold font-[Space-Grotesk-Bold] text-pretty">
          {t("home.subtitle")}
        </div>
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            <div className="text-lg font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
              <li className="px-3 py-2 rounded-md">
                <div
                  onClick={() => onNavClick?.("about")}
                  className="font-[manrope] font-bold text-nowrap"
                >
                  <ScrambleText
                    ref={aboutScrambleRef}
                    className="text-nowrap"
                    autoStart={false}
                  >
                    {t("nav.about")}
                  </ScrambleText>
                </div>
              </li>
            </div>
          </ul>
          <ul className="flex space-x-4">
            <div className="text-lg font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
              <li className="px-3 py-2 rounded-md">
                <div
                  onClick={() => onNavClick?.("work")}
                  className="font-[manrope] font-bold"
                >
                  <ScrambleText ref={workScrambleRef} autoStart={false}>
                    {t("nav.work")}
                  </ScrambleText>
                </div>
              </li>
            </div>
          </ul>

          <ul className="flex space-x-4">
            <div className="text-lg font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
              <li className="px-3 py-2 rounded-md">
                <div
                  onClick={() => onNavClick?.("contact")}
                  className="font-[manrope] font-bold"
                >
                  <ScrambleText ref={contactScrambleRef} autoStart={false}>
                    {t("nav.contact")}
                  </ScrambleText>
                </div>
              </li>
            </div>
          </ul>
        </nav>
        {/* Mobile: simplified nav */}
        <nav className="flex md:hidden space-x-2">
          <a
            href="#about"
            className="text-sm font-[manrope] font-bold px-2 py-1"
          >
            {t("nav.about")}
          </a>
          <a
            href="#work"
            className="text-sm font-[manrope] font-bold px-2 py-1"
          >
            {t("nav.work")}
          </a>
          <a
            href="#contact"
            className="text-sm font-[manrope] font-bold px-2 py-1"
          >
            {t("nav.contact")}
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
