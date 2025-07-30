/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder.withThemeName<ThemeName>()
  .withCustomTranslations({
    en: {
      // loginAccountTitle: "Welcome back! Sign In",
      // loginTitleHtml: "Welcome back! Sign In",
      noAccount: "You do not have an account?",
      doRegister: "Sign Up here",
      doForgotPassword: "Forgot your password?",
      usernameOrEmail: "Email Address",
      password: "Password"
    },
    // cspell: disable
    de: {
      // loginAccountTitle: "Willkommen zurück! Melde dich an",
      // loginTitleHtml: "Willkommen zurück! Melde dich an",
      noAccount: "Du hast noch kein Konto?",
      doRegister: "Kostenlos registrieren",
      doForgotPassword: "Passwort vergessen?",
      usernameOrEmail: " E-Mail-Adresse",
      password: "Passwort"
    }
    // cspell: enable
  }).build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
