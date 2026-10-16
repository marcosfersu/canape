import { positions } from "../const/positions.ts";

const positionsNav = {
  hero: [positions.hero[0], positions.hero[1]],
  hospitality: [positions.hospitality[0] + 2, positions.hospitality[1] + 2],
  create: [positions.create[0] + 2, positions.create[1] + 2],
  service: [positions.service[0] + 2, positions.service[1] + 2],
  about: [positions.about[0] + 2, positions.about[1] + 2],
  loop: [positions.loop[0] + 2, positions.loop[1] + 2],
} as const;

type Section = keyof typeof positionsNav;

export const setupActiveNav = (tl: gsap.core.Timeline) => {
  const navLinks = document.querySelectorAll<HTMLAnchorElement>(
    "header nav a[data-nav]",
  );

  const setActiveNav = (section: Section) => {
    navLinks.forEach((link) => {
      const isActive = link.dataset.nav === section;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
        setupAssent(link);
      } else {
        link.removeAttribute("aria-current");
        link.querySelector(".assent")?.remove();
      }
    });
  };

  (
    Object.entries(positionsNav) as [Section, readonly [number, number]][]
  ).forEach(([section, [start, end]]) => {
    tl.call(() => setActiveNav(section), [], start);

    tl.call(
      () => {
        setActiveNav(section);
      },
      [],
      end,
    );
  });

  setActiveNav("hero");
};

const setupAssent = (link: HTMLAnchorElement) => {
  let assent = link.querySelector<HTMLDivElement>(".assent");

  if (!assent) {
    assent = document.createElement("div");
    assent.className = "assent";
    assent.setAttribute("aria-hidden", "true");
    link.prepend(assent);
  }

  const text = [...link.querySelectorAll("span")].find(
    (span) => !span.classList.contains("assent"),
  );

  if (!text) return;

  const distance = text.getBoundingClientRect().width - 25;

  assent.style.setProperty("--assent-shift", `${-distance}px`);
};
