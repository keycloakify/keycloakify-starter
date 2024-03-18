import "./KcApp.css";
import { lazy, Suspense } from "react";
import Fallback, { type PageProps } from "keycloakify/login";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import Template from "./Template";
import LoginIdpLinkEmail from "./pages/LoginIdpLinkEmail";
import LoginIdpLinkConfirm from "./pages/LoginIdpLinkConfirm";

const Login = lazy(() => import("./pages/Login"));
const LogoutConfirm = lazy(() => import("./pages/LogoutConfirm"));
// If you can, favor register-user-profile.ftl over register.ftl, see: https://docs.keycloakify.dev/realtime-input-validation
const Register = lazy(() => import("./pages/Register"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LoginUpdateProfile = lazy(() => import("./pages/LoginUpdateProfile"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const Info = lazy(() => import("./pages/Info"));
const Error = lazy(() => import("./pages/Error"));

// This is like adding classes to theme.properties
// https://github.com/keycloak/keycloak/blob/11.0.3/themes/src/main/resources/theme/keycloak/login/theme.properties
const classes: PageProps<any, any>["classes"] = {
  // NOTE: The classes are defined in ./KcApp.cssl,
};

export default function KcApp(props: { kcContext: KcContext }) {
  window.localStorage.removeItem("organization-key");
  const { kcContext } = props;

  const i18n = useI18n({ kcContext });

  if (i18n === null) {
    //NOTE: Text resources for the current language are still being downloaded, we can't display anything yet.
    //We could display a loading progress but it's usually a matter of milliseconds.
    return null;
  }

  /*
   * Examples assuming i18n.currentLanguageTag === "en":
   * i18n.msg("access-denied") === <span>Access denied</span>
   * i18n.msg("foo") === <span>foo in English</span>
   */

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return (
              <Login
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );
          case "logout-confirm.ftl":
            return (
              <LogoutConfirm
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );
          case "login-verify-email.ftl":
            return (
              <LoginVerifyEmail
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );
          case "login-reset-password.ftl":
            return (
              <LoginResetPassword
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );
          case "login-update-password.ftl":
            return (
              <LoginUpdatePassword
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );
          case "register.ftl":
            return (
              <Register
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );
          // Removes those pages in you project. They are included to show you how to implement keycloak pages
          // that are not yes implemented by Keycloakify.
          // See: https://docs.keycloakify.dev/limitations#some-pages-still-have-the-default-theme.-why
          // We choose to use the default Template for the Info page and to download the theme resources.
          case "info.ftl":
            return (
              <Info
                {...{ kcContext, i18n, classes, Template }}
                doUseDefaultCss={true}
              />
            );
          case "error.ftl":
            return (
              <Error
                {...{ kcContext, i18n, classes, Template }}
                doUseDefaultCss={true}
              />
            );
          case "login-update-profile.ftl":
            return <LoginUpdateProfile
              {...{ kcContext, i18n, classes, Template }}
              doUseDefaultCss={true}
            />;
          case "login-idp-link-email.ftl":
            return <LoginIdpLinkEmail
              {...{ kcContext, i18n, classes, Template }}
              doUseDefaultCss={true}
            />;
          case "login-idp-link-confirm.ftl":
            return <LoginIdpLinkConfirm
              {...{ kcContext, i18n, classes, Template }}
              doUseDefaultCss={true}
            />;
          default:
            return (
              <Fallback
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={true}
              />
            );
        }
      })()}
    </Suspense>
  );
}
