import { gsap } from "../index";
import type { GalleryImageConfig } from "@/libs/const/gallery.config";

export const animateGalleryMobile = (
  container: HTMLElement,
  images: GalleryImageConfig[],
) => {
  if (!container || !images.length) return;

  const containerHeight = window.innerHeight;
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
      y: containerHeight,
    });

    return { img, config: image };
  });

  const update = () => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    if (maxScroll <= 0) return;

    const scrollProgress = (window.scrollY / maxScroll) * 100;

    imageElements.forEach(({ img, config }) => {
      const progress = gsap.utils.clamp(
        0,
        1,
        (scrollProgress - config.progress) / config.duration,
      );

      gsap.set(img, {
        y: gsap.utils.interpolate(containerHeight, -containerHeight, progress),
      });
    });
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  update();

  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    imageElements.forEach(({ img }) => img.remove());
  };
};
