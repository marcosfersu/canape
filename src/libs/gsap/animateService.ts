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

  const showText = animateShowText(section, start);

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
      duration: 26,
    },
    start + 8,
  );

  if (serviceText) {
    tl.fromTo(
      serviceText,
      {
        yPercent: 100,
      },
      { yPercent: -130, ease: "none", duration: 10 },
      start + 4,
    );
  }

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
