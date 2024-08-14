import { createUseI18n } from "keycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({
    en: {
        loginWithEmail: "Login with <b>email</b>"
    },
    de: {
        loginWithEmail: "Anmelden mit <b>e-Mail</b>"
    },
    no: {
        loginWithEmail: "Logg inn med <b>e-post</b>"
    }
});

export type I18n = typeof ofTypeI18n;
