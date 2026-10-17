export const animateJournal = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  const [start, end] = time;
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

  tl.to(
    section,
    {
      yPercent: -100,
      ease: "none",
      duration: 5,
    },
    end,
  );
};
