import { gsap } from "../index";
import type { GalleryImageConfig } from "@/libs/const/gallery.config";

export const animateGalleryMobile = (
  container: HTMLElement,
  images: GalleryImageConfig[],
) => {
  if (!container || !images.length) return;

  const containerWidth = container.clientWidth;

  if (!containerWidth) return;

  const imageElements = images.map((image) => {
    const img = document.createElement("img");

    img.src = image.src;
    img.alt = "";
    img.draggable = false;
    img.className = "gallery-image";

    img.style.width = `${(containerWidth * (image.width ?? 25)) / 100}px`;
    img.style.left = `${image.x}%`;

    container.appendChild(img);

    gsap.set(img, {
      xPercent: -50,
    });

    return {
      element: img,
      setY: gsap.quickSetter(img, "y", "px"),
      progress: image.progress / 100,
    };
  });

  // Distancia fija para evitar cambios por las barras del navegador.
  const viewportHeight = window.innerHeight;
  const travelDistance = viewportHeight * 2.4;

  // Velocidad común para todas las imágenes.
  const scrollDuration = 0.1;

  let maxScroll = 0;

  const update = () => {
    const scrollY = window.scrollY;

    imageElements.forEach((image) => {
      const start = image.progress * maxScroll;
      const progress = gsap.utils.clamp(
        0,
        1,
        (scrollY - start) / (maxScroll * scrollDuration),
      );

      const y = viewportHeight * 1.2 - progress * travelDistance;

      image.setY(y);
    });
  };

  const refresh = () => {
    maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    update();
  };

  const onScroll = () => {
    update();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", refresh);

  refresh();

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", refresh);

    imageElements.forEach(({ element }) => {
      element.remove();
    });
  };
};
