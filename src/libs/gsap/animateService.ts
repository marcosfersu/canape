import { animateShowText } from "./animateShowText";

export const animateService = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  const [start, end] = time;
  const duration = end - start;

  const createImages = section.querySelector(".create-images") as HTMLElement;
  const serviceText = section.querySelector(".service-text") as HTMLElement;

  const showText = animateShowText(section, start + 24);

  if (!showText) return;

  tl.call(() => showText.play(), [], showText.position);

  tl.fromTo(
    createImages,
    {
      xPercent: 100,
    },
    {
      xPercent: -100,
      ease: "none",
      duration: 25,
    },
    start + 2,
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
    start + 20,
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
