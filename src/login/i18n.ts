import { createUseI18n } from "keycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({
    en: {
        loginWithEmail: "Login with <b>email</b>",
        resendCode: "Resend code",
        noCodeQuestion: "Didn't receive a code?"
    },
    de: {
        loginWithEmail: "Anmelden mit <b>e-Mail</b>",
        resendCode: "Code erneut senden",
        noCodeQuestion: "Keinen Code erhalten?"
    },
    no: {
        loginWithEmail: "Logg inn med <b>e-post</b>",
        resendCode: "Send kode på nytt",
        noCodeQuestion: "Fikk du ikke koden?"
    }
});

export type I18n = typeof ofTypeI18n;
