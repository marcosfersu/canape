import { gsap } from "../index";
import type { GalleryImageConfig } from "@/libs/const/gallery.config";

export const animateGalleryMobile = (
  container: HTMLElement,
  images: GalleryImageConfig[],
) => {
  if (!container || !images.length) return;

  const containerWidth = container.clientWidth;

  if (!containerWidth) return;

  const imageElements: HTMLImageElement[] = [];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: document.documentElement,
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: 1,
      invalidateOnRefresh: true,
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
        y: "120vh",
      },
      {
        y: "-120vh",
        duration: image.duration,
        ease: "none",
      },
      image.progress,
    );
  });

  // Mantiene la escala de la timeline en 100 unidades,
  // equivalentes al 100% del scroll de la página.
  tl.to({}, { duration: 100 }, 0);

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();

    imageElements.forEach((img) => {
      img.remove();
    });
  };
};
