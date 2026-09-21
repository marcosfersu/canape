import { gsap } from "./index";

interface GalleryElements {
  CreateGallery: HTMLElement;
  itemsCreate: NodeListOf<HTMLElement>;
  CreateText: HTMLElement | null;
  createRoles: HTMLElement | null;
}

export const animateCreate = (
  tl: gsap.core.Timeline,
  elements: GalleryElements,
) => {
  const { CreateGallery, itemsCreate, CreateText, createRoles } = elements;
  const speeds = [0.3, 0.4, 1.2];

  const itemsRoles = createRoles?.querySelectorAll<HTMLElement>(".item-roles");
  const rolesHeading = createRoles?.querySelector<HTMLElement>("h3");
  const iconCreate = createRoles?.querySelector<HTMLElement>(".create-icon");

  itemsRoles?.forEach((item) => {
    gsap.set(item, { yPercent: 150 });
  });

  if (rolesHeading) {
    gsap.set(rolesHeading, {
      "--pseudo-opacity": 1,
      "--pseudo-tx-before": "-1rem", // Negativo directo para desplazar a la izquierda
      "--pseudo-tx-after": "1rem", // Positivo directo para desplazar a la derecha
    });
  }

  itemsCreate.forEach((item, index) => {
    const speed = speeds[index] ?? 0.5;

    tl.to(
      item,
      {
        y: -window.innerHeight * 4.5 * speed,
        ease: "none",
        duration: 24,
      },
      12,
    );
  });

  tl.to(
    CreateText,
    {
      yPercent: -100,
      ease: "none",
      duration: 5,
    },
    16,
  );

  tl.to(
    createRoles,
    {
      yPercent: 0,
      ease: "none",
      duration: 5,
    },
    16,
  );

  const stepDuration = 3;
  const startTime = 18;

  // Cambia la opacidad a 1 y resetea ambas posiciones X a 0px en el segundo 18
  if (rolesHeading && iconCreate) {
    tl.to(
      rolesHeading,
      {
        "--pseudo-opacity": 1,
        "--pseudo-tx-before": "1rem", // Negativo directo para desplazar a la izquierda
        "--pseudo-tx-after": "-1rem", // Positivo directo para desplazar a la derecha
        duration: 0.5,
      },
      startTime,
    );

    tl.to(
      iconCreate,
      {
        opacity: 1,
        duration: 0.5,
      },
      startTime,
    );
  }

  itemsRoles?.forEach((item, index) => {
    const time = startTime + index * 4;

    tl.to(
      item,
      {
        yPercent: 0,
        ease: "power2.inOut",
        duration: stepDuration,
      },
      time,
    );

    if (index < itemsRoles.length - 1) {
      tl.to(
        item,
        {
          yPercent: -150,
          ease: "power2.inOut",
          duration: stepDuration,
        },
        time + 4,
      );
    }
  });
};
