import { gsap } from "./index";
import { positions } from "../const/positions";
import type { GalleryImageConfig } from "../const/gallery.config";

export const animateGallery = (
  tl: gsap.core.Timeline,
  container: HTMLElement,
  images: GalleryImageConfig[],
) => {
  if (!container || !images.length) return;

  const elements = images.map((image) => {
    const img = document.createElement("img");

    img.src = image.src;
    img.alt = "";
    img.draggable = false;
    img.className = "gallery-image";

    img.style.width = `${image.width ?? 25}vw`;
    img.style.left = `${image.x}%`;

    container.appendChild(img);

    gsap.set(img, {
      yPercent: 0,
      y: () => window.innerHeight,
      xPercent: -50,
      // opacity: 0,
    });

    tl.to(
      img,
      {
        y: () => -window.innerHeight - img.offsetHeight,
        // opacity: 1,
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
  console.log(start + (end - start) * image.progress);
  return start + (end - start) * image.progress;
};
