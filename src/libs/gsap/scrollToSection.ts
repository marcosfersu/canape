import { gsap } from "./index";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { positions } from "../const/positions";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const scrollToSection = (
  section: keyof typeof positions,
  offset = 0,
  mobileTarget?: string,
  mobileProgress = 0,
  mobileDuration = 30,
) => {
  const isMobile = window.matchMedia("(max-width: 1023px)").matches;

  ScrollTrigger.refresh();

  let targetScroll: number;

  if (isMobile) {
    const element = document.querySelector(`.${section}-wrapper`);

    const trigger = ScrollTrigger.getAll().find((st) => st.trigger === element);

    if (!trigger) return;

    if (mobileProgress > 0) {
      const progress = mobileProgress / mobileDuration;

      targetScroll = trigger.start + (trigger.end - trigger.start) * progress;
    } else {
      const target = mobileTarget
        ? element?.querySelector<HTMLElement>(mobileTarget)
        : element;

      if (!target || !element) return;

      targetScroll =
        trigger.start +
        target.getBoundingClientRect().top -
        element.getBoundingClientRect().top;
    }
  } else {
    const trigger = ScrollTrigger.getAll().find(
      (st) => st.trigger === document.querySelector(".home"),
    );

    if (!trigger) return;

    const position = positions[section][0] + offset;
    const progress = position / positions.loop[1];

    console.log(position, offset);

    targetScroll = trigger.start + (trigger.end - trigger.start) * progress;
  }

  gsap.to(window, {
    duration: 1.2,
    ease: "power2.inOut",
    scrollTo: {
      y: targetScroll,
      autoKill: false,
    },
    overwrite: "auto",
  });
};
