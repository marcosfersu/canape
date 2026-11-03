import { animateShowText } from "./animateShowText";
import { gsap } from "./index";

export const animateAbout = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  const head = section.querySelector(".about-head");
  const title1 = section.querySelector(".about-title-1");
  const img = section.querySelector(".about-img");
  const description = section.querySelector(".about-description");

  gsap.set(head, { y: 120 });
  gsap.set(description, { y: 100, opacity: 0 });
  gsap.set([img, title1], { y: "100vw" });

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

  const showText = animateShowText(section, start + 6);

  if (!showText) return;

  tl.call(() => showText.play(), [], showText.position);

  // Header
  tl.to(head, { y: 0, ease: "none", duration: 3 }, start);

  // Img and title
  // Estado inicial
  gsap.set(".reveal-img", {
    clipPath: "inset(100% 0% 0% 0%)",
  });

  // Img and title
  tl.to(
    [img, title1],
    {
      y: 0,
      ease: "none",
      duration: 10,
    },
    start + 8,
  );

  tl.call(
    () => {
      gsap.to(".reveal-img", {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        duration: 0.5,
      });
    },
    [],
    start + 16,
  );

  tl.to(
    [img, title1],
    {
      y: "-100vw",
      ease: "none",
      duration: 20,
    },
    start + 18,
  );

  // Description
  tl.to(head, { y: -50, ease: "none", duration: 5 }, start + 30);
  tl.to(
    description,
    { y: 60, opacity: 1, ease: "none", duration: 5 },
    start + 30,
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
