import { gsap } from "../index";
import { animateShowText } from "../animateShowText";

export const animateAboutMobile = (section: HTMLElement) => {
  if (!section) return;

  const head = section.querySelector(".about-head") as HTMLElement;
  const title1 = section.querySelector(".about-title-1") as HTMLElement;
  const img = section.querySelector(".about-img img") as HTMLElement;
  const bgimg = section.querySelector(".about-img .bg-img") as HTMLElement;
  const description = section.querySelector(
    ".about-description",
  ) as HTMLElement;

  const wrapper = section.parentElement as HTMLElement;

  if (!wrapper || !head || !title1 || !img || !bgimg || !description) {
    return;
  }

  const showText = animateShowText(section, 0);

  // Estado inicial
  gsap.set([head, title1], {
    y: window.innerHeight,
  });

  gsap.set(img, {
    opacity: 1,
    clipPath: "inset(100% 0% 0% 0%)",
  });

  gsap.set(bgimg, {
    y: 0,
  });

  gsap.set(description, {
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

  // Entrada y salida del heading
  tl.fromTo(
    [head, title1],
    {
      y: "50vh",
    },
    {
      y: "-100vh",
      duration: 20,
      ease: "none",
    },
    0,
  );

  // Movimiento del fondo
  tl.to(
    bgimg,
    {
      y: -window.innerHeight,
      duration: 10,
      ease: "none",
    },
    4,
  );

  // Revelado de la imagen
  tl.to(
    img,
    {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 10,
      ease: "none",
    },
    3,
  );

  // Revelado de la imagen
  tl.to(
    img,
    {
      opacity: 1,
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 10,
      ease: "none",
    },
    13,
  );

  // Entrada y salida de la descripción
  tl.fromTo(
    description,
    {
      y: "100vh",
    },
    {
      y: "0",
      duration: 10,
      ease: "none",
    },
    16,
  );

  // Aparición de los textos internos
  if (showText) {
    tl.call(() => showText.play(), [], showText.position);
  }

  return tl;
};
