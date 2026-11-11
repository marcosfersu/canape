import { gsap } from "./index";
import { animateHero } from "./animateHero";
import { animateHospitality } from "./animateHospitality";
import { animateCreate } from "./animateCreate";
import { animateAbout } from "./animateAbout";
import { animatedLoop } from "./animateLoop";
import { animateService } from "./animateService";
import { setupActiveNav } from "./setupActiveNav";
import { positions, positionsMobile } from "../const/positions";
import { animateGallery } from "./animateGallery";
import { galleryImages, galleryImagesMobile } from "../const/gallery.config";
import { animateJournal } from "./animateJournal";
import { animateContact } from "./animateContact";
import { animateHeroMobile } from "./mobile/animateHeroMobile";
import { animateHospitalityMobile } from "./mobile/animateHospitalityMobile";

let homeTimeline: gsap.core.Timeline | null = null;
let mobileHeroTimeline: gsap.core.Timeline | null = null;
let mobileHospitalityTimeline: gsap.core.Timeline | null = null;

export const initHomeAnimations = () => {
  homeTimeline?.scrollTrigger?.kill();
  homeTimeline?.kill();

  mobileHeroTimeline?.scrollTrigger?.kill();
  mobileHeroTimeline?.kill();

  mobileHospitalityTimeline?.scrollTrigger?.kill();
  mobileHospitalityTimeline?.kill();

  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  // MOBILE
  if (isMobile) {
    const hero = document.querySelector(".hero-section") as HTMLElement;
    const hospitality = document.querySelector(
      ".hospitality-section",
    ) as HTMLElement;

    if (hero) {
      mobileHeroTimeline = animateHeroMobile(hero) ?? null;
    }

    if (hospitality) {
      mobileHospitalityTimeline = animateHospitalityMobile(hospitality) ?? null;
    }

    return;
  }

  const animations = {
    hero: animateHero,
    hospitality: animateHospitality,
    create: animateCreate,
    service: animateService,
    about: animateAbout,
    journal: animateJournal,
    contact: animateContact,
    loop: animatedLoop,
  };

  const home = document.querySelector(".home") as HTMLElement;

  const elements = Object.fromEntries(
    [...Object.keys(isMobile ? positionsMobile : positions), "gallery"].map(
      (section) => [section, document.querySelector(`.${section}-section`)],
    ),
  ) as Record<keyof typeof positions | "gallery", HTMLElement | null>;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: home,
      start: "top top",
      end: () => `+=${window.innerHeight * Object.keys(positions).length}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onLeave: (self) => {
        self.getTween()?.pause();
        self.scroll(self.start);
        self.animation?.progress(0);
        self.update();
      },
    },
  });

  setupActiveNav(tl);

  console.log(isMobile ? positionsMobile : positions);

  Object.entries(animations).forEach(([section, animate]) => {
    animate(
      tl,
      elements[section as keyof typeof positions]!,
      positions[section as keyof typeof positions],
    );
  });

  animateGallery(
    tl,
    elements.gallery!,
    isMobile ? galleryImagesMobile : galleryImages,
  );

  tl.to({}, { duration: 2 }, positions.loop[1]);

  homeTimeline = tl;
  return tl;
};
