import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const randomChar = () =>
  characters[Math.floor(Math.random() * characters.length)];

export const animateHeroTyping = (
  lineDelay = 0.3,
  charDelay = 0.04,
  charDuration = 1,
  randomChanges = 10,
) => {
  const elements = document.querySelectorAll<HTMLElement>(".hero-typing");

  const splits = Array.from(elements).map(
    (element) =>
      new SplitText(element, {
        type: "chars",
        charsClass: "char",
      }),
  );

  const tl = gsap.timeline();

  splits.forEach((split, lineIndex) => {
    const chars = split.chars;
    const original = chars.map((char) => char.textContent ?? "");

    gsap.set(chars, { opacity: 0 });

    chars.forEach((char, charIndex) => {
      const text = original[charIndex];

      if (text.trim() === "") return;

      const progress = { value: 0 };

      let changes = 0;

      tl.to(
        progress,
        {
          value: 1,
          duration: charDuration,
          ease: "none",

          onStart: () => {
            gsap.set(char, { opacity: 1 });
            char.textContent = randomChar();
          },

          onUpdate: () => {
            const currentChanges = Math.floor(progress.value * randomChanges);

            if (currentChanges !== changes && progress.value < 1) {
              changes = currentChanges;
              char.textContent = randomChar();
            }
          },

          onComplete: () => {
            char.textContent = text;
          },
        },
        lineIndex * lineDelay + charIndex * charDelay,
      );
    });
  });

  return tl;
};
