import { gsap } from "../index";
import { animateHeroTyping } from "../animateHeroTyping";

export const animateHeroMobile = (section: HTMLElement) => {
  if (!section) return;

  const text = section.querySelector(".hero-text") as HTMLElement;
  const logo = section.querySelector(".logo") as HTMLElement;
  const video = section.querySelector(".hero-video") as HTMLElement;

  const header = document.querySelector("header") as HTMLElement;
  const headerBox = document.querySelector(".header-box") as HTMLElement;
  const headerMood = document.querySelector(".header-mood") as HTMLElement;

  if (!text || !logo || !video) return;

  const wrapper = section.parentElement as HTMLElement;

  const headerElements = [header, headerBox].filter(
    (el): el is HTMLElement => el !== null,
  );

  // Estado inicial del header
  gsap.set(headerElements, { opacity: 0, x: 100 });

  if (headerMood) {
    gsap.set(headerMood, { opacity: 0, x: -100 });
  }

  // Aparición independiente del scroll, después de 2 segundos
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

  gsap.set(video, {
    clipPath: "inset(100% 0% 0% 0%)",
  });

  animateHeroTyping(0.3, 0.04, 0.35, 8);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  tl.to(
    text,
    {
      scale: 0.85,
      duration: 1,
      ease: "none",
    },
    0,
  );

  tl.fromTo(
    logo,
    { top: "100%" },
    {
      top: "-100%",
      duration: 4,
      ease: "none",
    },
    0,
  );

  tl.to(
    video,
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 2,
      ease: "none",
    },
    2,
  );

  tl.to(
    video,
    {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 2,
      ease: "none",
    },
    5,
  );

  tl.to(
    text,
    {
      scale: 1,
      duration: 2,
      ease: "none",
    },
    5,
  );

  return tl;
};
