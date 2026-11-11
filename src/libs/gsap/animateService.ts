import { animateShowText } from "./animateShowText";

export const animateService = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  const [start, end] = time;
  const duration = end - start;

  const serviceImages = section.querySelector(".service-images") as HTMLElement;
  const serviceText = section.querySelector(".service-text") as HTMLElement;

  const showText = animateShowText(section, start + 24);

  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  if (!showText) return;

  tl.call(() => showText.play(), [], showText.position);

  tl.fromTo(
    serviceImages,
    {
      xPercent: 100,
    },
    {
      xPercent: -100,
      ease: "none",
      duration: isMobile ? 40 : 25,
    },
    start + (isMobile ? -2 : 2),
  );

  tl.fromTo(
    serviceText,
    {
      y: window.innerHeight,
    },
    {
      y: 0,
      ease: "none",
      duration: 10,
    },
    start + 22,
  );

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
      duration: 10,
    },
    end,
  );
};
