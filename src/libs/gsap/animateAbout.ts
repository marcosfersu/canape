import { animateShowText } from "./animateShowText";
import { gsap } from "./index";

export const animateAbout = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  const head = section.querySelector(".about-head");
  const title1 = section.querySelector(".about-title-1");
  const img = section.querySelector(".about-img img");
  const bgimg = section.querySelector(".about-img .bg-img");
  const description = section.querySelector(".about-description");

  const [start, end] = time;
  const duration = end - start;

  tl.fromTo(
    section,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: "none",
      duration: 10,
    },
    start,
  );

  gsap.set(img, { opacity: 0 });

  const showText = animateShowText(section, start + 20);

  if (!showText) return;

  tl.call(() => showText.play(), [], showText.position);

  tl.fromTo(
    [head, title1],
    {
      y: "100vw",
    },
    {
      y: "-100vw",
      ease: "none",
      duration: 20,
    },
    start,
  );

  tl.to(
    bgimg,
    {
      y: "-100vw",
      duration: 10,
      ease: "none",
    },
    start + 8.3,
  );

  tl.set(img, { opacity: 1 }, start + 8.3);
  tl.to(
    img,
    {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 10,
      ease: "none",
    },
    start + 16,
  );

  tl.fromTo(
    description,
    {
      y: "100vw",
    },
    {
      y: "-100vw",
      ease: "none",
      duration: 20,
    },
    start + 16,
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
