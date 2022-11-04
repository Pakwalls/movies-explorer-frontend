export const setAppSizing = (appSize, setInitCount, setPagginator) => { 
  if (appSize === 'large') {
    setInitCount(12);
    setPagginator(3);
  } else if (appSize === 'medium') {
    setInitCount(8);
    setPagginator(2);
  } else {
    setInitCount(5);
    setPagginator(2);
  }
}