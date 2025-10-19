import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type Lenis from "lenis";
import useScroll from "../hooks/useScroll";

interface HeaderProps {
  lenis?: Lenis | null;
}
const Header: React.FC<HeaderProps> = () => {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const { scroll } = useScroll();

  useEffect(() => {
    setShow(scroll < lastScroll || scroll < 50); // muestra si sube o está arriba
    setLastScroll(scroll);
  }, [scroll]);

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
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="text-2xl font-bold font-[Space-Grotesk-Bold]">
          Full Stack Developer
        </div>
        <nav className="flex">
          <ul className="flex space-x-4">
            <div className="text-lg font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
              <li className="px-3 py-2 rounded-md">
                <a href="#about" className="font-[manrope] font-bold">
                  About
                </a>
              </li>
            </div>
          </ul>
          <ul className="flex space-x-4">
            <div className="text-lg font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
              <li className="px-3 py-2 rounded-md">
                <a href="#work" className="font-[manrope] font-bold">
                  Works
                </a>
              </li>
            </div>
          </ul>

          <ul className="flex space-x-4">
            <div className="text-lg font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
              <li className="px-3 py-2 rounded-md">
                <a href="#contact" className="font-[manrope] font-bold">
                  Contact
                </a>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
