import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:',.<>?/`~ ";

type Props = {
  children: string;
};

const ScrambleText: React.FC<Props> = ({ children }) => {
  const intervalRef = useRef<number | null>(null);
  const TARGET_TEXT = children;

  const [text, setText] = useState(TARGET_TEXT);

  const stopScramble = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setText(TARGET_TEXT);
  }, [TARGET_TEXT]);

  const scramble = useCallback(() => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  }, [TARGET_TEXT, stopScramble]);

  useEffect(() => {
    scramble();
    return () => stopScramble();
  }, [scramble, stopScramble]);

  return (
    <motion.div
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="relative overflow-hidden"
    >
      <span>{text}</span>
    </motion.div>
  );
};

export default ScrambleText;
