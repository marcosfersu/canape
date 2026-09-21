import { gsap } from "./index";

interface GalleryElements {
  HospitalGallery: HTMLElement;
  items: NodeListOf<HTMLElement>;
  HospitalText: HTMLElement | null;
}

export const animateHospitality = (
  tl: gsap.core.Timeline,
  elements: GalleryElements,
) => {
  const { HospitalGallery, items, HospitalText } = elements;
  const speeds = [0.3, 0.4, 1.2];

  // Estado inicial ítems
  // gsap.set(items, { y: 50 });

  // 2. Animación Parallax de las columnas
  items.forEach((item, index) => {
    const speed = speeds[index] ?? 0.5;

    tl.to(
      item,
      {
        y: -window.innerHeight * 2 * speed,
        ease: "none",
        duration: 8,
      },
      5,
    );
  });
};
