import { galleryImagesMobile } from "@/libs/const/gallery.config";
import { animateShowText } from "../animateShowText";
import { gsap } from "../index";
import { animateGalleryMobile } from "./animateGalleryMobile";

export const animateJournalMobile = (section: HTMLElement) => {
  const wrapper = section.parentElement as HTMLElement;
  const text = section.querySelector(".journal-text");

  // const showText = animateShowText(section, start + duration / 2);

  // if (!showText) return;

  // tl.call(() => showText.play(), [], showText.position);

  console.log(text);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: "top 80%",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  // animateGalleryMobile(section, tl, galleryImagesMobile);

  tl.fromTo(
    text,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: "none",
      duration: 10,
    },
    0,
  );
};
