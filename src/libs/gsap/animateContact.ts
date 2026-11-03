import { animateShowText } from "./animateShowText";

export const animateContact = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  const [start, end] = time;
  const duration = end - start;

  const showText = animateShowText(section, start + duration / 2);

  if (!showText) return;

  tl.call(() => showText.play(), [], showText.position);

  tl.fromTo(
    section,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: "none",
      duration: duration,
    },
    start,
  );

  tl.to(
    section,
    {
      yPercent: -100,
      ease: "none",
      duration: duration,
    },
    end,
  );
};
