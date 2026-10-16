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

export const initHomeAnimations = () => {
  const home = document.querySelector(".home") as HTMLElement;

  const heroSection = document.querySelector(".hero-section") as HTMLElement;

  const hospitalitySection = document.querySelector(
    ".hospitality-section",
  ) as HTMLElement;

  const createSection = document.querySelector(
    ".create-section",
  ) as HTMLElement;

  const serviceSection = document.querySelector(
    ".service-section",
  ) as HTMLElement;

  const aboutSection = document.querySelector(".about-section") as HTMLElement;

  const loopSection = document.querySelector(".loop-section") as HTMLElement;

  const gallerySection = document.querySelector(
    ".gallery-section",
  ) as HTMLElement;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: home,
      start: "top top",
      end: () => `+=${window.innerHeight * 20}`,
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

  animateHero(tl, heroSection, positions.hero);

  animateHospitality(tl, hospitalitySection, positions.hospitality);

  animateCreate(tl, createSection, positions.create);

  animateService(tl, serviceSection, positions.service);

  animateAbout(tl, aboutSection, positions.about);

  animatedLoop(tl, loopSection, positions.loop);

  animateGallery(tl, gallerySection, galleryImages);

  tl.to({}, { duration: 2 }, 75);

  return tl;
};
