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

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  if (maxScroll <= 0) return;

  const imageDuration = 10;

  const elements = images.map((image) => {
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
      y: "120vh",
    });

    const start = (image.progress / 100) * maxScroll;
    const end = start + (image.duration / 100) * maxScroll;

    gsap.fromTo(
      img,
      { y: "120vh" },
      {
        y: "-120vh",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: start,
          end: end,
          scrub: 0,
        },
      },
    );

    return img;
  });

  return () => {
    elements.forEach((img) => {
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.trigger === document.documentElement)
        .forEach((trigger) => trigger.kill());

      img.remove();
    });
  };
};
