export const languageTags = [
    "ar",
    "ca",
    "cs",
    "da",
    "de",
    "en",
    "es",
    "fi",
    "fr",
    "hu",
    "it",
    "ja",
    "lt",
    "lv",
    "nl",
    "no",
    "pl",
    "pt-BR",
    "ru",
    "sk",
    "sv",
    "tr",
    "zh-CN"
] as const;

export type LanguageTag = (typeof languageTags)[number];

export type MessageKey = keyof (typeof import("./en"))["default"];
