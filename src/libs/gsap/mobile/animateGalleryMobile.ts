import { gsap } from "../index";
import type { GalleryImageConfig } from "@/libs/const/gallery.config";

export const animateGalleryMobile = (
  container: HTMLElement,
  images: GalleryImageConfig[],
) => {
  if (!container || !images.length) return;

  const containerWidth = container.clientWidth;
  const viewportHeight = window.innerHeight;

  if (!containerWidth) return;

  // Valores fijos durante toda la animación
  const maxScroll = document.documentElement.scrollHeight - viewportHeight;

  if (maxScroll <= 0) return;

  const travelDistance = viewportHeight * 1.2;

  const imageElements: HTMLImageElement[] = [];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: document.documentElement,
      start: 0,
      end: maxScroll,
      scrub: 1,
    },
  });

  images.forEach((image) => {
    const img = document.createElement("img");

    img.src = image.src;
    img.alt = "";
    img.draggable = false;
    img.className = "gallery-image";

    img.style.width = `${(containerWidth * (image.width ?? 25)) / 100}px`;
    img.style.left = `${image.x}%`;

    container.appendChild(img);
    imageElements.push(img);

    gsap.set(img, {
      xPercent: -50,
    });

    tl.fromTo(
      img,
      {
        y: travelDistance,
      },
      {
        y: -travelDistance,
        duration: image.duration,
        ease: "none",
      },
      image.progress,
    );
  });

  // Mantiene la escala de la timeline en 100 unidades
  tl.to({}, { duration: 100 }, 0);

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();

    imageElements.forEach((img) => {
      img.remove();
    });
  };
};
