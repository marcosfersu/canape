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
  // Create
  {
    src: "/images/create-1.webp",
    section: "create",
    progress: 0.17,
    duration: 10,
    x: 18,
    width: 30,
  },
  {
    src: "/images/create-2.webp",
    section: "create",
    progress: 0.24,
    duration: 14,
    x: 55,
    width: 14,
  },
  {
    src: "/images/create-3.webp",
    section: "create",
    progress: 0.43,
    duration: 14,
    x: 65,
    width: 20,
  },
  {
    src: "/images/create-4.webp",
    section: "create",
    progress: 0.51,
    duration: 20,
    x: 20,
    width: 15,
  },
  {
    src: "/images/create-5.webp",
    section: "create",
    progress: 0.62,
    duration: 16,
    x: 60,
    width: 26,
  },
  {
    src: "/images/create-6.webp",
    section: "create",
    progress: 0.73,
    duration: 18,
    x: 25,
    width: 10,
  },
  {
    src: "/images/create-7.webp",
    section: "create",
    progress: 0.8,
    duration: 14,
    x: 50,
    width: 10,
  },

  // About
  {
    src: "/images/about-1.webp",
    section: "about",
    progress: 0.65,
    duration: 12,
    x: 68,
    width: 20,
  },
  {
    src: "/images/about-2.webp",
    section: "about",
    progress: 0.7,
    duration: 8,
    x: 20,
    width: 15,
  },
  {
    src: "/images/about-3.webp",
    section: "about",
    progress: 0.75,
    duration: 14,
    x: 45,
    width: 20,
  },
  {
    src: "/images/about-4.webp",
    section: "about",
    progress: 0.9,
    duration: 16,
    x: 20,
    width: 15,
  },
  {
    src: "/images/about-5.webp",
    section: "about",
    progress: 0.9,
    duration: 20,
    x: 68,
    width: 10,
  },
] satisfies GalleryImageConfig[];
