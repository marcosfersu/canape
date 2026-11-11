import { gsap } from "../index";
import type { GalleryImageConfig } from "@/libs/const/gallery.config";

export const animateGalleryMobile = (
  container: HTMLElement,
  images: GalleryImageConfig[],
) => {
  if (!container || !images.length) return;

  const containerHeight = container.clientHeight;
  const containerWidth = container.clientWidth;

  if (!containerHeight || !containerWidth) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "bottom bottom",
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

    gsap.set(img, {
      xPercent: -50,
      y: containerHeight,
    });

    tl.fromTo(
      img,
      { y: containerHeight },
      {
        y: () => -(containerHeight + img.offsetHeight),
        duration: image.duration,
        ease: "none",
      },
      image.progress,
    );
  });

  // La timeline siempre representa el 100% del recorrido.
  tl.to({}, { duration: 100 }, 0);

  return tl;
};
