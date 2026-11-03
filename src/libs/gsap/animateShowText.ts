import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export const animateShowText = (section: HTMLElement, position: number) => {
  if (!section) return;

  const showTl = gsap.timeline({ paused: true });

  // 1. Seleccionamos ambos tipos de elementos dentro de la sección
  // Usamos querySelectorAll para capturar todos los que cumplan con alguna de las dos clases
  const targets = section.querySelectorAll(".show-text, .show-element");

  if (targets.length === 0) {
    return { timeline: showTl, position, play: () => showTl.play() };
  }

  // 2. Recorremos cada elemento uno por uno en la línea de tiempo
  targets.forEach((el, index) => {
    const isText = el.classList.contains("show-text");

    if (isText) {
      // Si es texto, aplicamos SplitText por líneas
      const split = new SplitText(el, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });

      showTl.fromTo(
        split.lines,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1, // Stagger opcional entre las líneas del mismo texto
        },
        index * 0.15, // Esto controla el espacio de tiempo en la timeline respecto al elemento anterior
      );
    } else {
      // Si es un elemento general, animamos el bloque entero
      showTl.fromTo(
        el,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        index * 0.15, // Mantiene la secuencia en la línea de tiempo
      );
    }
  });

  return {
    timeline: showTl,
    position,
    play: () => showTl.play(),
  };
};
