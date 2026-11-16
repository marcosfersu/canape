import { gsap } from "../index";

export const animateLoopMobile = (section: HTMLElement) => {
  if (!section) return;

  const bgLoop = document.querySelector(".bg-loop") as HTMLElement;

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onLeave: () => {
        if (!bgLoop) {
          window.scrollTo(0, 0);
          return;
        }

        const tlTransition = gsap.timeline({
          onComplete: () => {
            // Vuelve a añadir la clase hidden al terminar la timeline
            bgLoop.classList.add("hidden");
          },
        });

        tlTransition
          // 1. Quitamos el 'hidden' y ponemos opacidad 1 de golpe al instante
          .set(bgLoop, { display: "block", opacity: 1 })
          // 2. Hacemos el salto al top de forma instantánea
          .add(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
          })
          // 3. Esperamos 1 segundo manteniendo la pantalla en blanco
          .to({}, { duration: 0.6 })
          // 4. Cambiamos la opacidad a 0 de golpe al instante con .set
          .set(bgLoop, { opacity: 0 });
      },
    },
  });
};
