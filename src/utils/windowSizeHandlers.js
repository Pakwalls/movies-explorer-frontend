import { useEffect, useState } from "react";

export const useListenWindowSize = () => {
  const [appSize, setAppSize] = useState(() => {
    if (window.innerWidth >= 1140) {
      return "large";
    } else if (window.innerWidth >= 712) {
      return "medium";
    } else {
      return "small";
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1140) {
        setAppSize("large");
      } else if (window.innerWidth >= 712) {
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
