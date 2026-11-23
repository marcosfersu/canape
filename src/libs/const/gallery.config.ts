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
    progress: 0.1,
    duration: 10,
    x: 18,
    width: 30,
  },
  {
    src: "/images/create-2.webp",
    section: "create",
    progress: 0.2,
    duration: 14,
    x: 55,
    width: 14,
  },
  {
    src: "/images/create-3.webp",
    section: "create",
    progress: 0.4,
    duration: 14,
    x: 65,
    width: 20,
  },
  {
    src: "/images/create-4.webp",
    section: "create",
    progress: 0.45,
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
    width: 15,
  },
  {
    src: "/images/create-7.webp",
    section: "create",
    progress: 0.8,
    duration: 14,
    x: 65,
    width: 17,
  },

  // About
  {
    src: "/images/about-1.webp",
    section: "about",
    progress: 0.5,
    duration: 9,
    x: 68,
    width: 20,
  },
  {
    src: "/images/about-2.webp",
    section: "about",
    progress: 0.55,
    duration: 10,
    x: 20,
    width: 15,
  },
  {
    src: "/images/about-3.webp",
    section: "about",
    progress: 0.48,
    duration: 16,
    x: 45,
    width: 20,
  },
  {
    src: "/images/about-4.webp",
    section: "about",
    progress: 0.74,
    duration: 17,
    x: 20,
    width: 15,
  },
  {
    src: "/images/about-5.webp",
    section: "about",
    progress: 0.8,
    duration: 20,
    x: 68,
    width: 20,
  },
] satisfies GalleryImageConfig[];

export const galleryImagesMobile = [
  // Create
  {
    src: "/images/create-1.webp",
    section: "create",
    progress: 60,
    duration: 20,
    x: 30,
    width: 65,
  },
  {
    src: "/images/create-2.webp",
    section: "create",
    progress: 120,
    duration: 20,
    x: 60,
    width: 70,
  },
  {
    src: "/images/create-3.webp",
    section: "create",
    progress: 180,
    duration: 20,
    x: 70,
    width: 60,
  },
  {
    src: "/images/create-4.webp",
    section: "create",
    progress: 140,
    duration: 20,
    x: 30,
    width: 55,
  },
  {
    src: "/images/create-5.webp",
    section: "create",
    progress: 220,
    duration: 300,
    x: 40,
    width: 70,
  },
  {
    src: "/images/create-6.webp",
    section: "create",
    progress: 240,
    duration: 300,
    x: 50,
    width: 70,
  },
  {
    src: "/images/create-7.webp",
    section: "create",
    progress: 260,
    duration: 14,
    x: 70,
    width: 80,
  },

  // // Journal
  // {
  //   src: "/images/about-1.webp",
  //   section: "journal",
  //   progress: 10,
  //   duration: 20,
  //   x: 30,
  //   width: 65,
  // },
  // {
  //   src: "/images/about-2.webp",
  //   section: "about",
  //   progress: 0.7,
  //   duration: 8,
  //   x: 25,
  //   width: 35,
  // },
  // {
  //   src: "/images/about-3.webp",
  //   section: "about",
  //   progress: 0.75,
  //   duration: 14,
  //   x: 50,
  //   width: 60,
  // },
  // {
  //   src: "/images/about-4.webp",
  //   section: "about",
  //   progress: 0.9,
  //   duration: 16,
  //   x: 20,
  //   width: 40,
  // },
  // {
  //   src: "/images/about-5.webp",
  //   section: "about",
  //   progress: 0.9,
  //   duration: 20,
  //   x: 75,
  //   width: 35,
  // },
] satisfies GalleryImageConfig[];
