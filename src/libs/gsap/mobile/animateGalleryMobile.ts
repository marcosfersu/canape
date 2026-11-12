import { gsap } from "../index";
import type { GalleryImageConfig } from "@/libs/const/gallery.config";

export const animateGalleryMobile = (
  section: HTMLElement,
  tl: gsap.core.Timeline,
  images: GalleryImageConfig[],
) => {
  if (!section || !tl || !images.length) return;

  // Extraer el nombre de la sección: create-section → create
  const sectionName = section.className.match(
    /(?:^|\s)([\w-]+)-section(?:\s|$)/,
  )?.[1];

  if (!sectionName) return;

  // Obtener únicamente las imágenes correspondientes a esta sección
  const sectionImages = images.filter((image) => image.section === sectionName);

  if (!sectionImages.length) return;

  const sectionHeight = section.clientHeight;
  const sectionWidth = section.clientWidth;

  sectionImages.forEach((image) => {
    const img = document.createElement("img");

    img.src = image.src;
    img.alt = "";
    img.draggable = false;
    img.className = "gallery-image";

    img.style.width = `${(sectionWidth * (image.width ?? 25)) / 100}px`;
    img.style.left = `${image.x}%`;
    // img.style.top = `${image.progress}%`;

    section.appendChild(img);

    console.log(tl.duration());
    console.log(tl.duration() * (image.progress / 100 / 4));
    console.log(8 + image.progress / 50);

    // Estado inicial
    gsap.set(img, {
      y: sectionHeight * (image.progress / 100),
      yPercent: 0,
      xPercent: -50,
    });

    // Animación vinculada a la timeline de la sección
    tl.to(
      img,
      {
        y: -sectionHeight,
        duration: 8 + image.progress / 50,
        ease: "none",
      },
      tl.duration() * (image.progress / 100 / 4),
    );
  });
};
