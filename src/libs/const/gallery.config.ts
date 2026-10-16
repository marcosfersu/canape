import { positions } from "./positions";

type Section = keyof typeof positions;

export type GalleryImageConfig = {
  src: string;
  section: Section;
  progress: number;
  duration: number;
  x: number;
  width: number;
};

export const galleryImages = [
  {
    src: "/images/img-test.png",
    section: "hospitality",
    progress: 0.5,
    duration: 10,
    x: 50,
    width: 10,
  },
  {
    src: "/images/img-test.png",
    section: "hospitality",
    progress: 0.1,
    duration: 20,
    x: 14,
    width: 20,
  },
  {
    src: "/images/img-test.png",
    section: "create",
    progress: 0.25,
    duration: 5,
    x: 70,
    width: 35,
  },
  {
    src: "/images/img-test.png",
    section: "about",
    progress: 0.8,
    duration: 4,
    x: 45,
    width: 22,
  },
] satisfies GalleryImageConfig[];
