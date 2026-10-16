import { gsap } from "./index";

export const animateHero = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  if (!section) return;

  const text = section.querySelector(".hero-text") as HTMLElement;
  const logo = section.querySelector(".logo") as HTMLElement;
  const video = section.querySelector(".hero-video") as HTMLElement;

  const header = document.querySelector("header") as HTMLElement;
  const headerBox = document.querySelector(".header-box") as HTMLElement;
  const headerMood = document.querySelector(".header-mood") as HTMLElement;

  if (!text || !logo || !video) return;

  const headerElements = [header, headerBox].filter(
    (el): el is HTMLElement => el !== null,
  );

  // Init menu
  gsap.set(headerElements, { opacity: 0, x: 100 });

  if (headerMood) {
    gsap.set(headerMood, { opacity: 0, x: -100 });
  }

  const [start, end] = time;

  // 1. Escala Texto
  tl.to(text, { scale: 0.8, duration: 1, ease: "none" }, start);

  tl.fromTo(
    logo,
    { top: "100%" },
    { top: "0%", duration: 1.5, ease: "none" },
    start + 0.5,
  );

  tl.to(
    video,
    {
      opacity: 1,
      scale: 1,
      pointerEvents: "auto",
      duration: 1,
      ease: "power2.out",
    },
    start + 2.5,
  );

  tl.to(logo, { yPercent: -100, duration: 1, ease: "power1.in" }, start + 4.5);

  tl.to(
    video,
    {
      opacity: 0,
      scale: 0.9,
      pointerEvents: "none",
      duration: 0.4,
      ease: "power2.out",
    },
    start + 4.5,
  );

  // Show menu
  if (headerElements.length) {
    tl.to(
      headerElements,
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      start + 4.8,
    );
  }

  if (headerMood) {
    tl.to(
      headerMood,
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      start + 4.8,
    );
  }

  // tl.to(
  //   text,
  //   { yPercent: -100, opacity: 0, duration: 1.5, ease: "power1.in" },
  //   time + 5.8,
  // );

  // End Section
  tl.to(
    section,
    {
      opacity: 0,
      yPercent: -100,
      ease: "none",
      duration: 5,
    },
    end,
  );
};
