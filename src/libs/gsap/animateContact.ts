import { animateShowText } from "./animateShowText";
import { gsap } from "./index";

export const animateContact = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  const imagesSection = section.querySelectorAll(
    ".contact-images img",
  ) as NodeListOf<HTMLElement>;
  const textSection = section.querySelectorAll(
    ".contact-text",
  ) as NodeListOf<HTMLElement>;
  const images = gsap.utils.toArray(imagesSection);
  const [start, end] = time;
  const duration = end - start;

  const showText = animateShowText(section, start + 26);

  if (!showText) return;

  tl.call(() => showText.play(), [], showText.position);

  gsap.set(images, {
    clipPath: "inset(0% 0% 0% 0%)",
  });

  tl.fromTo(
    images.filter((_, i) => i !== 1),
    { y: "-100vw" },
    {
      y: 0,
      ease: "none",
      duration: 10,
    },
    start + 3,
  );

  tl.fromTo(
    imagesSection[1],
    { y: "100vw" },
    {
      y: 0,
      ease: "none",
      duration: 10,
    },
    start + 3,
  );

  tl.to(
    images,
    {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 10,
      ease: "none",
    },
    start + 17,
  );
  tl.fromTo(
    textSection,
    { yPercent: 100 },
    {
      yPercent: 0,
      ease: "none",
      duration: 10,
    },
    start + 20,
  );

  tl.to(
    textSection,
    {
      yPercent: -100,
      ease: "none",
      duration: 10,
    },
    end,
  );
};
