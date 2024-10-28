import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
  .withThemeName<ThemeName>()
  .withCustomTranslations({
    en: {
      loginWithEmail: "Login with <b>email</b>",
      resendCode: "Resend code",
      doSendCode: "Send code",
      noCodeQuestion: "Didn't receive a code?",
      bobTermsMessage1: "By continuing, you agree to BOB's",
      bobTermsMessage2: "privacy policy and terms of use."
    },
    no: {
      loginWithEmail: "Logg inn med <b>epost</b>",
      resendCode: "Send kode på nytt",
      doSendCode: "Send kode",
      noCodeQuestion: "Fikk du ikke koden?",
      bobTermsMessage1: "Ved å gå videre godtar du BOBs",
      bobTermsMessage2: "personvernsregler og vilkår for bruk."
    }
  })
  .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
