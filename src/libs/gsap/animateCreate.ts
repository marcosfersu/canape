import { animateShowText } from "./animateShowText";
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
  const duration = end - start;

  tl.fromTo(
    section,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: "none",
      duration: 10,
    },
    start,
  );

  const showText = animateShowText(section, start + 4);

  tl.call(() => showText.play(), [], showText.position);

  if (CreateText) {
    tl.to(
      CreateText,
      { yPercent: -100, ease: "none", duration: 10 },
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
    start + 15,
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
      start + 15,
    );

    tl.to(
      iconCreate,
      {
        opacity: 1,
        duration: 0.5,
      },
      start + 15,
    );
  }

  itemsRoles?.forEach((item, index) => {
    const timeRole = start + 15 + index * 4;

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
      ease: "none",
      duration: 10,
    },
    end,
  );
};
