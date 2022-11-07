import { useEffect, useState } from "react";
import { LARGE_BRAKEPOINT, MEDIUM_BRAKEPOINT } from "./constants";

export const useListenWindowSize = () => {
  const [appSize, setAppSize] = useState(() => {
    if (window.innerWidth >= LARGE_BRAKEPOINT) {
      return "large";
    } else if (window.innerWidth >= MEDIUM_BRAKEPOINT) {
      return "medium";
    } else {
      return "small";
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= LARGE_BRAKEPOINT) {
        setAppSize("large");
      } else if (window.innerWidth >= MEDIUM_BRAKEPOINT) {
        setAppSize("medium");
      } else {
        setAppSize("small");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return appSize;
};
