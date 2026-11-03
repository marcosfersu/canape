import { animateShowText } from "./animateShowText";

export const animateHospitality = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  const [start, end] = time;
  const duration = end - start;

  tl.fromTo(
    section,
    { yPercent: 100 },
    {
      yPercent: 0,
      ease: "none",
      duration,
    },
    start,
  );

  const showText = animateShowText(section, start + duration / 2);

  if (!showText) return;

  tl.call(() => showText.play(), [], showText.position);

  tl.to(
    section,
    {
      yPercent: -100,
      ease: "none",
      duration,
    },
    end,
  );
};
