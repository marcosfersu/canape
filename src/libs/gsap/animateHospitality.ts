import gsap from "gsap";
import { animateShowText } from "./animateShowText";

export const animateHospitality = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  const textSection = section.querySelector(".hospitality-text") as HTMLElement;
  const imagesSection = section.querySelectorAll(
    ".hospitality-images img",
  ) as NodeListOf<HTMLElement>;
  const images = gsap.utils.toArray(imagesSection);
  const [start, end] = time;
  const duration = end - start;

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
    start,
  );

  tl.fromTo(
    imagesSection[1],
    { y: "100vw" },
    {
      y: 0,
      ease: "none",
      duration: 10,
    },
    start,
  );

  tl.to(
    images,
    {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 10,
      ease: "none",
    },
    start + 14,
  );

  const showText = animateShowText(section, start + 20);

  if (!showText) return;

  tl.call(() => showText.play(), [], showText.position);

  tl.fromTo(
    textSection,
    { yPercent: 100 },
    {
      yPercent: 0,
      ease: "none",
      duration: 10,
    },
    start + 15,
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
