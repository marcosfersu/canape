import { animateShowText } from "../animateShowText";
import { gsap } from "../index";

export const animateCreateMobile = (section: HTMLElement) => {
  if (!section) return;

  const wrapper = section.parentElement as HTMLElement;

  const createText = section.querySelector<HTMLElement>(".create-text");

  const createRoles = section.querySelector<HTMLElement>(".create-roles");

  const itemsRoles = createRoles?.querySelectorAll<HTMLElement>(".item-roles");

  const rolesHeading = createRoles?.querySelector<HTMLElement>("h3");

  const iconCreate = createRoles?.querySelector<HTMLElement>(".create-icon");
  const img = section?.querySelector<HTMLElement>(".img") as HTMLImageElement;

  if (!wrapper || !createText || !createRoles || !itemsRoles?.length) {
    return;
  }

  console.log(img);

  // Estado inicial
  gsap.set(createText, {
    yPercent: 0,
  });

  gsap.set(img, {
    y: section.clientHeight * 0.1,
    yPercent: 0,
  });

  gsap.set(createRoles, {
    yPercent: 100,
  });

  gsap.set(itemsRoles, {
    yPercent: 150,
  });

  if (rolesHeading) {
    gsap.set(rolesHeading, {
      "--pseudo-opacity": 0,
      "--pseudo-tx-before": "-1rem",
      "--pseudo-tx-after": "1rem",
    });
  }

  if (iconCreate) {
    gsap.set(iconCreate, {
      opacity: 0,
    });
  }

  // Timeline vinculada al scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: "top 80%",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  // Salida del texto principal
  tl.to(
    createText,
    {
      yPercent: -200,
      duration: 20,
      ease: "none",
    },
    0,
  );

  tl.to(
    img,
    {
      y: -section.clientHeight,
      duration: 8,
      ease: "none",
    },
    0,
    // tl.duration() * 0.1,
  );

  // Entrada de los roles
  tl.to(
    createRoles,
    {
      yPercent: 0,
      duration: 5,
      ease: "none",
    },
    5,
  );

  // Aparición de paréntesis e icono
  if (rolesHeading && iconCreate) {
    tl.to(
      rolesHeading,
      {
        "--pseudo-opacity": 1,
        "--pseudo-tx-before": "1rem",
        "--pseudo-tx-after": "-1rem",
        duration: 0.5,
      },
      10,
    );

    tl.to(
      iconCreate,
      {
        opacity: 1,
        duration: 0.5,
      },
      10,
    );
  }

  // Animación de los roles
  itemsRoles.forEach((item, index) => {
    const timeRole = 10 + index * 4;

    tl.to(
      item,
      {
        yPercent: 0,
        ease: "power2.inOut",
        duration: 3,
      },
      timeRole,
    );

    if (index < itemsRoles.length - 1) {
      tl.to(
        item,
        {
          yPercent: -150,
          ease: "power2.inOut",
          duration: 3,
        },
        timeRole + 4,
      );
    }
  });

  // Animación de los textos internos
  const showText = animateShowText(section, 0);

  if (showText) {
    tl.call(() => showText.play(), [], showText.position);
  }

  return tl;
};
