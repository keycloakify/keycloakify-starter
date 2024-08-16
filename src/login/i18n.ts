import { createUseI18n } from "keycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({
    en: {
        loginWithEmail: "Login with <b>email</b>",
        resendCode: "Resend code",
        noCodeQuestion: "Didn't receive a code?",
        bobTermsMessage1: "By continuing, you agree to BOB's",
        bobTermsMessage2: "privacy policy and terms of use."
    },
    no: {
        loginWithEmail: "Logg inn med <b>e-post</b>",
        resendCode: "Send kode på nytt",
        noCodeQuestion: "Fikk du ikke koden?",
        bobTermsMessage1: "Ved å gå videre godtar du BOBs",
        bobTermsMessage2: "personvernsregler og vilkår for bruk."
    }
});

export type I18n = typeof ofTypeI18n;
