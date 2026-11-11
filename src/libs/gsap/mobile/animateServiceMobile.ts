import { gsap } from "../index";
import { animateShowText } from "../animateShowText";

export const animateServiceMobile = (section: HTMLElement) => {
  if (!section) return;

  const serviceImages = section.querySelector(".service-images") as HTMLElement;

  const serviceText = section.querySelector(".service-text") as HTMLElement;

  const wrapper = section.parentElement as HTMLElement;

  if (!wrapper || !serviceImages || !serviceText) return;

  const showText = animateShowText(section, 20);

  // Estado inicial
  gsap.set(serviceImages, {
    xPercent: 50,
  });

  console.log(serviceImages);

  gsap.set(serviceText, {
    y: window.innerHeight,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  // Movimiento horizontal de las imágenes
  tl.fromTo(
    serviceImages,
    {
      xPercent: 60,
    },
    {
      xPercent: -100,
      duration: 30,
      ease: "none",
    },
    0,
  );

  // Entrada del contenido
  tl.fromTo(
    serviceText,
    {
      y: window.innerHeight,
    },
    {
      y: 0,
      duration: 10,
      ease: "none",
    },
    20,
  );

  // Aparición de los textos
  if (showText) {
    tl.call(() => showText.play(), [], showText.position);
  }

  return tl;
};
