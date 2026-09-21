import { gsap } from "./index";
import { animateHero } from "./animateHero";
import { animateHospitality } from "./animateHospitality";
import { animateCreate } from "./animateCreate";

export const initHomeAnimations = () => {
  const home = document.querySelector(".home") as HTMLElement;
  const hero = document.querySelector(".hero") as HTMLElement;
  const HospitalitySection = document.querySelector(
    ".hospitality-section",
  ) as HTMLElement;
  const CreateSection = document.querySelector(
    ".create-section",
  ) as HTMLElement;

  if (!home || !hero || !HospitalitySection || !CreateSection) return;

  const text = hero.querySelector(".hero-text") as HTMLElement;
  const logo = hero.querySelector(".logo") as HTMLElement;
  const video = hero.querySelector(".hero-video") as HTMLElement;

  const header = document.querySelector("header") as HTMLElement;
  const headerBox = document.querySelector(".header-box") as HTMLElement;
  const headerMood = document.querySelector(".header-mood") as HTMLElement;

  const HospitalityGallery = HospitalitySection.querySelector(
    ".hospitality-gallery",
  ) as HTMLElement;

  const CreateGallery = CreateSection.querySelector(
    ".create-gallery",
  ) as HTMLElement;

  const HospitalText = HospitalitySection.querySelector(
    ".hospitality-text",
  ) as HTMLElement;

  const items =
    HospitalityGallery.querySelectorAll<HTMLElement>(".parallax-item");

  const itemsCreate =
    CreateGallery.querySelectorAll<HTMLElement>(".parallax-item");

  const CreateText = CreateSection.querySelector<HTMLElement>(".create-text");

  const createRoles = CreateSection.querySelector<HTMLElement>(".create-roles");

  if (!text || !logo || !video) return;

  // Timeline maestra centralizada
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: home,
      start: "top top",
      end: () => `+=${window.innerHeight * 14}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  // Pasamos 'tl' y los elementos correspondientes a cada módulo
  animateHero(tl, {
    hero,
    text,
    logo,
    video,
    headerElements: [header, headerBox].filter(Boolean) as HTMLElement[],
    headerMood,
  });

  animateHospitality(tl, {
    HospitalGallery: CreateGallery,
    items,
    HospitalText,
  });

  animateCreate(tl, {
    CreateGallery,
    itemsCreate,
    CreateText,
    createRoles,
  });

  // ==========================================
  // TRANSICIÓN HERO → HOSPITALITY (Puro movimiento Y)
  // ==========================================

  // 1. El Hero sube hacia arriba hasta salir de pantalla
  tl.to(
    hero,
    {
      yPercent: -100,
      ease: "none",
      duration: 1.5,
    },
    7,
  );

  // 2. HospitalitySection entra desde 100vh abajo (sin opacidad)
  tl.fromTo(
    HospitalitySection,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: "none",
      duration: 5,
    },
    4, // Se ejecutan exactamente en paralelo en el segundo 7
  );
  // 2. HospitalitySection entra desde 100vh abajo (sin opacidad)
  tl.to(
    HospitalitySection,
    {
      yPercent: -100,
      ease: "none",
      duration: 5,
    },
    12, // Se ejecutan exactamente en paralelo en el segundo 7
  );
  tl.fromTo(
    CreateSection,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: "none",
      duration: 5,
    },
    10, // Se ejecutan exactamente en paralelo en el segundo 7
  );
  tl.to(
    CreateSection,
    {
      yPercent: -100,
      opacity: 0,
      ease: "none",
      duration: 8,
    },
    34, // Se ejecutan exactamente en paralelo en el segundo 7
  );
  return tl;
};
