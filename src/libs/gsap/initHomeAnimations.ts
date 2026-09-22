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
  const UniverseSection = document.querySelector(
    ".universe-section",
  ) as HTMLElement;
  const ExperimentSection = document.querySelector(
    ".experiment-section",
  ) as HTMLElement;

  if (
    !home ||
    !hero ||
    !HospitalitySection ||
    !CreateSection ||
    !UniverseSection
  )
    return;

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

  const universeImages =
    UniverseSection.querySelector<HTMLElement>(".universe-images");

  if (!text || !logo || !video) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: home,
      start: "top top",
      end: () => `+=${window.innerHeight * 20}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

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

  tl.to(
    hero,
    {
      yPercent: -100,
      ease: "none",
      duration: 1.5,
    },
    7,
  );

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
    4,
  );

  tl.to(
    HospitalitySection,
    {
      yPercent: -100,
      ease: "none",
      duration: 5,
    },
    12,
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
    10,
  );
  tl.fromTo(
    UniverseSection,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: "none",
      duration: 5,
    },
    36,
  );
  tl.to(
    CreateSection,
    {
      yPercent: -100,
      opacity: 0,
      ease: "none",
      duration: 8,
    },
    36,
  );

  // ==========================================
  // RECORRIDO HORIZONTAL DE IMÁGENES EN UNIVERSE
  // ==========================================

  gsap.set(universeImages, { x: "100vw" });

  tl.to(
    universeImages,
    {
      x: "-120vw",
      ease: "none",
      duration: 12,
    },
    41,
  );

  tl.to(
    UniverseSection,
    {
      yPercent: -100,
      opacity: 0,
      ease: "none",
      duration: 8,
    },
    50,
  );

  tl.fromTo(
    ExperimentSection,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: "none",
      duration: 5,
    },
    50,
  );
  return tl;
};
