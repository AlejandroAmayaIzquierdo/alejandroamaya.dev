import { motion, useMotionValue, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

interface ParallaxCardProps {
  children?: ReactNode;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({
  children,
  style,
  width,
  height,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  // Use smaller, symmetric input range to avoid excessive tilt to one side.
  // We'll compute offsets relative to the card center, so left/right are symmetric.
  const inputRange = [-200, 200];

  const cardRotateX = useTransform(cardY, inputRange, [12, -12]);
  const cardRotateY = useTransform(cardX, inputRange, [-12, 12]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) {
      // fallback to window center if ref not available
      const offsetX = event.clientX - window.innerWidth / 2;
      const offsetY = event.clientY - window.innerHeight / 2;
      cardX.set(offsetX);
      cardY.set(offsetY);
      return;
    }

    const rect = el.getBoundingClientRect();
    // compute mouse position relative to card center
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    // optional: normalize by half width/height to get -1..1 range then scale
    const normX =
      Math.max(Math.min(offsetX / (rect.width / 2), 1), -1) * inputRange[1];
    const normY =
      Math.max(Math.min(offsetY / (rect.height / 2), 1), -1) * inputRange[1];

    cardX.set(normX);
    cardY.set(normY);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };
  return (
    <motion.div
      style={{
        perspective: 900,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{
          margin: "auto",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          perspective: 900,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          key="card"
          style={{
            boxShadow: "0px 0px 30px -7px rgba(0,0,0,0.45)",
            borderRadius: 0,
            width: width || 400,
            height: height || 540,
            transformStyle: "preserve-3d",
            perspective: 900, // Set perspective on the card
            rotateX: cardRotateX,
            rotateY: cardRotateY,
          }}
          transition={{ velocity: 0 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ParallaxCard;
