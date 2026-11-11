import { gsap } from "./index";
import { positions } from "../const/positions";
import type { GalleryImageConfig } from "../const/gallery.config";

export const animateGallery = (
  tl: gsap.core.Timeline,
  container: HTMLElement,
  images: GalleryImageConfig[],
) => {
  if (!container || !images.length) return;

  // Medidas estables del contenedor al inicializar la animación
  const containerHeight = container.clientHeight;
  const containerWidth = container.clientWidth;

  if (!containerHeight || !containerWidth) return;

  const elements = images.map((image) => {
    const img = document.createElement("img");

    img.src = image.src;
    img.alt = "";
    img.draggable = false;
    img.className = "gallery-image";

    // El ancho se calcula respecto al contenedor, no al viewport
    img.style.width = `${(containerWidth * (image.width ?? 25)) / 100}px`;

    img.style.left = `${image.x}%`;

    console.log(img);
    container.appendChild(img);

    // Inicio del recorrido
    gsap.set(img, {
      xPercent: -50,
      y: containerHeight,
    });

    // Final del recorrido
    tl.to(
      img,
      {
        y: () => -(containerHeight + img.offsetHeight),
        duration: image.duration,
        ease: "none",
      },
      getTimelinePosition(image),
    );

    return img;
  });

  return elements;
};

const getTimelinePosition = (image: GalleryImageConfig) => {
  const [start, end] = positions[image.section];

  return start + (end - start) * image.progress;
};
