import { gsap } from "./index";
import { animateHeroTyping } from "./animateHeroTyping";

export const animateHero = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  if (!section) return;

  // Elements
  const bg = section.querySelector(".hero-bg") as HTMLElement;
  const text = section.querySelector(".hero-text") as HTMLElement;
  const logo = section.querySelector(".logo") as HTMLElement;
  const video = section.querySelector(".hero-video") as HTMLElement;

  const header = document.querySelector("header") as HTMLElement;
  const headerBox = document.querySelector(".header-box") as HTMLElement;
  const headerMood = document.querySelector(".header-mood") as HTMLElement;

  if (!text || !logo || !video) return;

  const [start, end] = time;

  const headerElements = [header, headerBox].filter(
    (el): el is HTMLElement => el !== null,
  );

  // Initial states
  gsap.set(headerElements, { opacity: 0, x: 100 });

  if (headerMood) {
    gsap.set(headerMood, { opacity: 0, x: -100 });
  }

  gsap.set(video, {
    clipPath: "inset(100% 0% 0% 0%)",
  });

  // Intro callbacks
  gsap.delayedCall(0.5, () => {
    gsap.set(bg, { opacity: 0, display: "none" });
    animateHeroTyping(0.3, 0.04, 0.35, 8);
  });

  gsap.delayedCall(2, () => {
    gsap.to(headerElements, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
    });

    if (headerMood) {
      gsap.to(headerMood, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
      });
    }
  });

  // Hero timeline

  // Text scale down
  tl.to(
    text,
    {
      scale: 0.8,
      duration: 1,
      ease: "none",
    },
    start,
  );

  // Logo entrance and exit
  tl.fromTo(
    logo,
    { top: "100%" },
    {
      top: "-100%",
      duration: 12,
      ease: "none",
    },
    start + 1,
  );

  // Video reveal
  tl.to(
    video,
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 5,
      ease: "none",
    },
    start + 4,
  );

  // Video hide
  tl.to(
    video,
    {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 5,
      ease: "none",
    },
    start + 10,
  );

  // Text scale up
  tl.to(
    text,
    {
      scale: 1,
      duration: 4,
      ease: "none",
    },
    start + 10,
  );

  // Section exit
  tl.to(
    section,
    {
      yPercent: -100,
      duration: 10,
      ease: "none",
    },
    end,
  );
};
