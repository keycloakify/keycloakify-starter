/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        ru: {
            loginAccountTitle: "Вход в Cat/Code",
            registerTitle: "Создание аккаунта",
            doLogIn: "Войти",
            doRegister: "Зарегистрироваться",
            noAccount: "Ещё нет аккаунта?",
            backToLogin: "← Вернуться ко входу",
            "identity-provider-login-label": "Или войдите через"
        },
        en: {
            loginAccountTitle: "Sign in to Cat/Code",
            registerTitle: "Create your account",
            doLogIn: "Sign in",
            doRegister: "Sign up",
            noAccount: "Don't have an account?",
            backToLogin: "← Back to sign in",
            "identity-provider-login-label": "Or sign in with"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
