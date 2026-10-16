export const animatedLoop = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  const [start, _] = time;

  tl.fromTo(
    section,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: "none",
      duration: 5,
    },
    start,
  );
};
