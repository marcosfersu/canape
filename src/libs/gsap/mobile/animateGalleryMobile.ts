import { gsap } from "../index";
import type { GalleryImageConfig } from "@/libs/const/gallery.config";

export const animateGalleryMobile = (images: GalleryImageConfig[]) => {
  if (!images.length) return;

  const sections = [...new Set(images.map((image) => image.section))];

  const timelines = sections.map((sectionName) => {
    const section = document.querySelector(
      `.${sectionName}-section`,
    ) as HTMLElement;

    if (!section) return null;

    const wrapper = section.parentElement as HTMLElement;

    if (!wrapper) return null;

    const sectionImages = images.filter(
      (image) => image.section === sectionName,
    );

    const viewportHeight = window.innerHeight;
    const sectionWidth = section.clientWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 0",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    sectionImages.forEach((image) => {
      const img = document.createElement("img");

      img.src = image.src;
      img.alt = "";
      img.draggable = false;
      img.className = "gallery-image";

      img.style.width = `${(sectionWidth * (image.width ?? 25)) / 100}px`;
      img.style.left = `${image.x}%`;
      img.style.top = `${image.progress}%`;
      section.appendChild(img);
      gsap.set(img, {
        yPercent: 0,
        xPercent: -50,
      });

      tl.to(
        img,
        {
          yPercent: -100,
          duration: 1,
          ease: "none",
        },
        0,
      );
    });

    return tl;
  });

  return timelines.filter(Boolean);
};
