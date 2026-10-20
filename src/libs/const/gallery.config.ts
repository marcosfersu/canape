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
  // Hospitality
  {
    src: "/images/manifiesto-1.webp",
    section: "hospitality",
    progress: 0.3,
    duration: 13,
    x: 15,
    width: 15,
  },
  {
    src: "/images/manifiesto-2.webp",
    section: "hospitality",
    progress: 0.6,
    duration: 6,
    x: 50,
    width: 15,
  },
  {
    src: "/images/manifiesto-3.webp",
    section: "hospitality",
    progress: 0.4,
    duration: 10,
    x: 98,
    width: 15,
  },
  // Create
  {
    src: "/images/concept-lab-1.webp",
    section: "create",
    progress: 0.07,
    duration: 10,
    x: 15,
    width: 14,
  },
  {
    src: "/images/concept-lab-2.webp",
    section: "create",
    progress: 0.1,
    duration: 14,
    x: 50,
    width: 20,
  },
  {
    src: "/images/concept-lab-3.webp",
    section: "create",
    progress: 0.04,
    duration: 7,
    x: 100,
    width: 20,
  },
  {
    src: "/images/concept-lab-4.webp",
    section: "create",
    progress: 0.4,
    duration: 15,
    x: 10,
    width: 20,
  },
  {
    src: "/images/concept-lab-5.webp",
    section: "create",
    progress: 0.45,
    duration: 20,
    x: 60,
    width: 20,
  },
  {
    src: "/images/concept-lab-6.webp",
    section: "create",
    progress: 0.65,
    duration: 18,
    x: 60,
    width: 20,
  },
  {
    src: "/images/concept-lab-7.webp",
    section: "create",
    progress: 0.75,
    duration: 15,
    x: 20,
    width: 20,
  },
  {
    src: "/images/concept-lab-8.webp",
    section: "create",
    progress: 0.8,
    duration: 20,
    x: 55,
    width: 20,
  },
] satisfies GalleryImageConfig[];
