import { gsap } from "./index";
import { animateHero } from "./animateHero";
import { animateHospitality } from "./animateHospitality";
import { animateCreate } from "./animateCreate";
import { animateAbout } from "./animateAbout";
import { animatedLoop } from "./animateLoop";
import { animateService } from "./animateService";
import { setupActiveNav } from "./setupActiveNav";
import { positions } from "../const/positions";
import { animateGallery } from "./animateGallery";
import { galleryImages } from "../const/gallery.config";
import { animateJournal } from "./animateJournal";
import { animateContact } from "./animateContact";

export const initHomeAnimations = () => {
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
    [...Object.keys(positions), "gallery"].map((section) => [
      section,
      document.querySelector(`.${section}-section`),
    ]),
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

  Object.entries(animations).forEach(([section, animate]) => {
    animate(
      tl,
      elements[section as keyof typeof positions]!,
      positions[section as keyof typeof positions],
    );
  });

  animateGallery(tl, elements.gallery!, galleryImages);

  tl.to({}, { duration: 2 }, positions.loop[1]);

  return tl;
};
