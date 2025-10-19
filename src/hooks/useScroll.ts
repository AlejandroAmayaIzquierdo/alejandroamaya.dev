import { useEffect, useState } from "react";

const useScroll = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScroll(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return {
    scroll,
  };
};

export default useScroll;
