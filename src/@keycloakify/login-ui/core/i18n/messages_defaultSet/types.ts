export const languageTags = [
    "ar",
    "ca",
    "cs",
    "da",
    "de",
    "el",
    "en",
    "es",
    "fa",
    "fi",
    "fr",
    "hu",
    "it",
    "ja",
    "ka",
    "lt",
    "lv",
    "nl",
    "no",
    "pl",
    "pt",
    "pt-BR",
    "ru",
    "sk",
    "sv",
    "th",
    "tr",
    "uk",
    "zh-CN",
    "zh-TW"
] as const;

export type LanguageTag = (typeof languageTags)[number];

export type MessageKey = keyof (typeof import("./en"))["default"];
