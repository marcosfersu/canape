import { gsap } from "./index";

interface HeroElements {
  hero: HTMLElement;
  text: HTMLElement;
  logo: HTMLElement;
  video: HTMLElement;
  headerElements: HTMLElement[];
  headerMood: HTMLElement | null;
}

export const animateHero = (tl: gsap.core.Timeline, elements: HeroElements) => {
  const { hero, text, logo, video, headerElements, headerMood } = elements;

  // Estado inicial UI
  if (headerElements.length) {
    gsap.set(headerElements, { opacity: 0, x: 100 });
  }
  if (headerMood) {
    gsap.set(headerMood, { opacity: 0, x: -100 });
  }

  // 1. Escala Texto
  tl.to(text, { scale: 0.8, ease: "none", duration: 1 });

  // 2. Entrada Logo
  tl.fromTo(
    logo,
    { top: "100%" },
    { top: "0%", ease: "none", duration: 1.5 },
    0.5,
  );

  // 3. Entrada Video
  tl.to(
    video,
    {
      opacity: 1,
      scale: 1,
      pointerEvents: "auto",
      ease: "power2.out",
      duration: 1,
    },
    2.5,
  );

  // 4. Pausa
  tl.to({}, { duration: 2 });

  // 5. Salida Logo y Video
  tl.to(logo, { yPercent: -100, ease: "power1.in", duration: 1 }, 4.5);
  tl.to(
    video,
    {
      opacity: 0,
      scale: 0.9,
      pointerEvents: "none",
      ease: "power2.out",
      duration: 0.4,
    },
    4.5,
  );

  // 6. Revelado UI
  if (headerElements.length) {
    tl.to(
      headerElements,
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      4.8,
    );
  }
  if (headerMood) {
    tl.to(
      headerMood,
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      4.8,
    );
  }

  // 7. Salida Texto
  tl.to(
    text,
    { yPercent: -100, opacity: 0, ease: "power1.in", duration: 1.5 },
    5.8,
  );

  // 8. Salida sección Hero entera
  tl.to(hero, { yPercent: -100, ease: "none", duration: 1 }, 7);
};
