import gsap from "gsap";
import { animateShowText } from "../animateShowText";

export const animateContactMobile = (section: HTMLElement) => {
  if (!section) return;

  const wrapper = section.parentElement as HTMLElement;
  const textSection = section.querySelector(".contact-text") as HTMLElement;

  const images = Array.from(
    section.querySelectorAll<HTMLImageElement>(".contact-images img"),
  );

  if (!wrapper || !textSection || images.length < 3) return;

  console.log(images, textSection);

  gsap.set(images, {
    clipPath: "inset(0% 0% 0% 0%)",
  });

  gsap.set(textSection, {
    yPercent: 100,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: "top 50%",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  // Entrada de las imágenes
  tl.fromTo(
    images.filter((_, i) => i !== 1),
    { y: "-100vh" },
    {
      y: 0,
      duration: 10,
      ease: "none",
    },
    0,
  );

  tl.fromTo(
    images[1],
    { y: "100vh" },
    {
      y: 0,
      duration: 10,
      ease: "none",
    },
    0,
  );

  // Salida de las imágenes
  tl.to(
    images,
    {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 8,
      ease: "none",
    },
    10,
  );

  // Entrada del texto
  tl.fromTo(
    textSection,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 10,
      ease: "none",
    },
    10,
  );

  const showText = animateShowText(section, 15);

  if (showText) {
    tl.call(() => showText.play(), [], showText.position);
  }

  return tl;
};
