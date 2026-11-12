import { gsap } from "../index";

export const animateLoopMobile = (section: HTMLElement) => {
  if (!section) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onLeave: () => {
        window.scrollTo(0, 0);
      },
    },
  });
};
