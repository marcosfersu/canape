import { gsap } from "./index";

export const initHeroAnimations = (
  text: HTMLElement,
  logo: HTMLElement,
  video: HTMLElement,
  header?: HTMLElement | null,
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      // Definimos la distancia total de scroll requerida (hasta que aparece el video)
      end: () => `+=${window.innerHeight * 5.8}`,
      scrub: 1,
      pin: true, // GSAP congela la sección durante el scroll
      anticipatePin: 1,
    },
  });

  tl
    // 1. Texto: escala de 0vh a 100vh (dura 1 unidad de viewport)
    .to(text, {
      scale: 0.8,
      ease: "none",
      duration: 1,
    })

    // 2. Logo: inicia a los 50vh (0.5 de tiempo) y sube durante 150vh (1.5 de tiempo)
    .fromTo(
      logo,
      { top: "100%" },
      {
        top: "0%",
        ease: "none",
        duration: 1.5,
      },
      0.5, // <-- Inicia exactamente a los 0.5 viewports de scroll
    )

    // 3. Video: inicia a los 250vh (2.5 de tiempo) y dura 100vh (1 unidad de tiempo)
    .to(
      video,
      {
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        ease: "power2.out",
        duration: 1,
      },
      2.5, // <-- Inicia exactamente a los 2.5 viewports de scroll
    )
    .to({}, { duration: 2 })
    .to(
      logo,
      {
        yPercent: -100, // Lo desposta hacia arriba fuera del viewport
        ease: "power1.in",
        duration: 1,
      },
      4.5, // Inicia exactamente a los 250vh de scroll
    )
    .to(
      video,
      {
        opacity: 0,
        scale: 0.9,
        pointerEvents: "auto",
        ease: "power2.out",
        duration: 0.4,
      },
      4.5, // <-- Inicia exactamente a los 2.5 viewports de scroll
    );

  // 7. Entrada del Menú desde el costado al final de la timeline (4.8 a 5.5)
  if (header) {
    // 1. Estado inicial instantáneo: invisibilidad total y desplazado a la derecha
    gsap.set(header, { opacity: 0, x: 100 });

    // 2. Transición exclusiva para la 'x'
    tl.to(
      header,
      {
        x: 0,
        duration: 1,
        ease: "power2.out",
        // Cambia la opacidad de 0 a 1 de golpe justo cuando arranca este paso
        onStart: () => {
          gsap.set(header, { opacity: 1 });
        },
        // Restaura la opacidad a 0 si el usuario hace scroll hacia arriba (reverse)
        onReverseComplete: () => {
          gsap.set(header, { opacity: 0 });
        },
      },
      4.8, // Punto exacto de la timeline donde inicia el movimiento
    );
  }
  return tl;
};
