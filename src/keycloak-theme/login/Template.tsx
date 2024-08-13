// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useState, useEffect } from "react";
// import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import bobLogoSvgUrl from "./assets/bob-logo-desktop.svg";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayMessage = true,
    // displayInfo = false,
    // displayRequiredFields = false,
    // displayWide = false,
    // showAnotherWayIfPresent = true,
    // headerNode,
    // showUsernameNode = null,
    // infoNode = null,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props;

  const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

  // const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } =
  //   i18n;

  const {
    //realm, locale, auth,
    url,
    message,
    isAppInitiatedAction,
  } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: doUseDefaultCss,
    styles: [
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
      `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
      `${url.resourcesPath}/css/login.css`,
    ],
    htmlClassName: getClassName("kcHtmlClass"),
    bodyClassName: getClassName("kcBodyClass"),
  });

  useState(() => {
    document.title = i18n.msgStr("loginTitle", kcContext.realm.displayName);
  });

  useEffect(() => {
    console.log(
      `Value of MY_ENV_VARIABLE on the Keycloak server: "${kcContext.properties.MY_ENV_VARIABLE}"`
    );
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <div className={getClassName("kcLoginClass")}>
      <div className={getClassName("kcContainerClass")} />
      <div
        className={clsx(
          getClassName("kcFormCardClass")
          // displayWide && getClassName("kcFormCardAccountClass")
        )}
      >
        <div id="kc-content" className={getClassName("kcContentClass")}>
          <header className={getClassName("kcFormHeaderClass")}>
            <div id="kc-header" className={getClassName("kcHeaderClass")}>
              <img src={bobLogoSvgUrl} alt="BOB logo" height={60} />
            </div>
          </header>
          <div
            id="kc-content-wrapper"
            className={getClassName("kcContentWrapperClass")}
          >
            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
            {displayMessage &&
              message !== undefined &&
              (message.type !== "warning" || !isAppInitiatedAction) && (
                <div className={clsx("alert", `alert-${message.type}`)}>
                  {message.type === "success" && (
                    <span
                      className={getClassName("kcFeedbackSuccessIcon")}
                    ></span>
                  )}
                  {message.type === "warning" && (
                    <span
                      className={getClassName("kcFeedbackWarningIcon")}
                    ></span>
                  )}
                  {message.type === "error" && (
                    <span
                      className={getClassName("kcFeedbackErrorIcon")}
                    ></span>
                  )}
                  {message.type === "info" && (
                    <span className={getClassName("kcFeedbackInfoIcon")}></span>
                  )}
                  <span
                    className="kc-feedback-text"
                    dangerouslySetInnerHTML={{
                      __html: message.summary,
                    }}
                  />
                </div>
              )}
            {children}
          </div>
        </div>
        <div id="kc-inf" className={getClassName("kcSignUpClass")}>
          <div
            id="kc-info-wrapper"
            className={getClassName("kcInfoAreaWrapperClass")}
          >
            Ved å gå videre godtar du BOBs{" "}
            <a
              href="https://bob.no/personvern-og-cookies/"
              className={getClassName("kcFormSocialAccountListLinkClass")}
            >
              personvernsregler og vilkår for bruk.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
