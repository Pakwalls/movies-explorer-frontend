import {
  LARGE_COUNT,
  LARGE_PAGGINATOR,
  MEDIUM_COUNT,
  MEDIUM_PAGGINATOR,
  SMALL_COUNT,
} from "./constants";

export const setAppSizing = (appSize, setInitCount, setPagginator) => {
  if (appSize === "large") {
    setInitCount(LARGE_COUNT);
    setPagginator(LARGE_PAGGINATOR);
  } else if (appSize === "medium") {
    setInitCount(MEDIUM_COUNT);
    setPagginator(MEDIUM_PAGGINATOR);
  } else {
    setInitCount(SMALL_COUNT);
    setPagginator(MEDIUM_PAGGINATOR);
  }
};
