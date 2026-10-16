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
  gsap.set(description, { opacity: 0, y: 100 });
  gsap.set([img, title1], { opacity: 0 });

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

  // Header
  tl.to(head, { y: 0, ease: "none", duration: 2 }, start + 7);

  // Img and title
  tl.to([img, title1], { opacity: 1, ease: "none", duration: 2 }, start + 8);
  tl.to([img, title1], { opacity: 0, ease: "none", duration: 2 }, start + 13);

  // Description
  tl.to(head, { y: -50, ease: "none", duration: 2 }, start + 16);
  tl.to(
    description,
    { opacity: 1, y: 60, ease: "none", duration: 2 },
    start + 16,
  );

  tl.to(
    section,
    {
      yPercent: -100,
      opacity: 0,
      ease: "none",
      duration: 8,
    },
    end,
  );
};
