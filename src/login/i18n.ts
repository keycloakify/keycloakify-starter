import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/i18n */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            footerImprintTitle: "Imprint",
            footerDataProtectionTitle: "Data Protection",
            footerCookiePreferencesTitle: "Cookie Preferences",
            footerImprintUrl: '',
            footerDataprotectionUrl: '',
        },
        de: {
            footerImprintTitle: "Impressum",
            footerDataProtectionTitle: "Datenschutz",
            footerCookiePreferencesTitle: "Cookie Einstellungen",
            footerImprintUrl: '',
            footerDataprotectionUrl: '',
        },
        fr: {
            footerImprintTitle: "Mentions Légales",
            footerDataProtectionTitle: "Protection des Données",
            footerCookiePreferencesTitle: "Paramètres des Cookies",
            footerImprintUrl: '',
            footerDataprotectionUrl: '',
        },
        it: {
            footerImprintTitle: "Impronta",
            footerDataProtectionTitle: "Informativa sulla Privacy",
            footerCookiePreferencesTitle: "Impostazioni dei Cookie",
            footerImprintUrl: '',
            footerDataprotectionUrl: '',
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
