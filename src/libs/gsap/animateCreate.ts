import { gsap } from "./index";

export const animateCreate = (
  tl: gsap.core.Timeline,
  section: HTMLElement,
  time: readonly number[],
) => {
  if (!section) return;

  const CreateText = section.querySelector<HTMLElement>(".create-text");

  const createRoles = section.querySelector<HTMLElement>(".create-roles");

  const itemsRoles = createRoles?.querySelectorAll<HTMLElement>(".item-roles");
  const rolesHeading = createRoles?.querySelector<HTMLElement>("h3");
  const iconCreate = createRoles?.querySelector<HTMLElement>(".create-icon");

  // Set () characters and roles

  itemsRoles?.forEach((item) => {
    gsap.set(item, { yPercent: 150 });
  });

  if (rolesHeading) {
    gsap.set(rolesHeading, {
      "--pseudo-opacity": 0,
      "--pseudo-tx-before": "-1rem",
      "--pseudo-tx-after": "1rem",
    });
  }

  const [start, end] = time;

  // Show section
  tl.fromTo(
    section,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: "none",
      duration: 5,
    },
    start,
  );

  if (CreateText) {
    tl.to(
      CreateText,
      { yPercent: -100, ease: "none", duration: 5 },
      start + 10,
    );
  }

  tl.to(
    createRoles,
    {
      yPercent: 0,
      ease: "none",
      duration: 5,
    },
    start + 10,
  );

  if (rolesHeading && iconCreate) {
    tl.to(
      rolesHeading,
      {
        "--pseudo-opacity": 1,
        "--pseudo-tx-before": "1rem",
        "--pseudo-tx-after": "-1rem",
        duration: 0.5,
      },
      start + 10,
    );

    tl.to(
      iconCreate,
      {
        opacity: 1,
        duration: 0.5,
      },
      start + 10,
    );
  }

  itemsRoles?.forEach((item, index) => {
    const timeRole = start + 10 + index * 4;

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

  tl.to(
    section,
    {
      yPercent: -100,
      opacity: 0,
      ease: "none",
      duration: 8,
    },
    end,
  );
};
