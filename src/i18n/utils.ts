import { defaultLang, ui } from "./ui";

export type Locale = keyof typeof ui;

type TranslationKey = keyof (typeof ui)[typeof defaultLang];

export function getLangFromUrl(url: URL): Locale {
  const [, firstSegment] = url.pathname.split("/");

  if (firstSegment && firstSegment in ui) {
    return firstSegment as Locale;
  }

  return defaultLang;
}

export function useTranslations(lang: Locale) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
