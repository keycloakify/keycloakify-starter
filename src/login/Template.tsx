import { useEffect } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import bobLogoSvgUrl from "./assets/bob-logo-desktop.svg";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    // displayInfo = false,
    displayMessage = true,
    socialProvidersNode = null,
    // infoNode = null,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children
  } = props;

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

  const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

  useEffect(() => {
    document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
  }, []);

  useSetClassName({
    qualifiedName: "html",
    className: kcClsx("kcHtmlClass")
  });

  useSetClassName({
    qualifiedName: "body",
    className: bodyClassName ?? kcClsx("kcBodyClass")
  });

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

  if (!isReadyToRender) {
    return null;
  }

  const languageDropdown = (
    <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">
      <div id="kc-locale-wrapper" className={kcClsx("kcLocaleWrapperClass")}>
        <div id="kc-locale-dropdown" className={clsx("menu-button-links", kcClsx("kcLocaleDropDownClass"))}>
          <button
            tabIndex={1}
            id="kc-current-locale-link"
            aria-label={msgStr("languages")}
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="language-switch1"
          >
            {currentLanguage.label}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.5 8.5L12.3536 14.6464C12.1583 14.8417 11.8417 14.8417 11.6464 14.6464L5.5 8.5"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <ul
            role="menu"
            tabIndex={-1}
            aria-labelledby="kc-current-locale-link"
            aria-activedescendant=""
            id="language-switch1"
            className={kcClsx("kcLocaleListClass")}
          >
            {enabledLanguages.map(({ languageTag, label, href }, i) => (
              <li key={languageTag} className={kcClsx("kcLocaleListItemClass")} role="none">
                <a role="menuitem" id={`language-${i + 1}`} className={kcClsx("kcLocaleItemClass")} href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className={kcClsx("kcLoginClass")}>
      <div className={kcClsx("kcContainerClass")}>
        <div className="hidden md:block">
          {realm.internationalizationEnabled && (assert(locale !== undefined), enabledLanguages.length > 1) && languageDropdown}
        </div>
      </div>
      <div className={clsx(kcClsx("kcFormCardClass"))}>
        <div id="kc-content" className={kcClsx("kcContentClass")}>
          <div className="block md:hidden">
            {realm.internationalizationEnabled && (assert(locale !== undefined), enabledLanguages.length > 1) && languageDropdown}
          </div>
          <header className={kcClsx("kcFormHeaderClass")}>
            <img src={bobLogoSvgUrl} alt="BOB logo" height={60} />
          </header>
          <div id="kc-content-wrapper" className={kcClsx("kcContentWrapperClass")}>
            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
              <div className={clsx(`alert-${message.type}`, kcClsx("kcAlertClass"), `pf-m-${message?.type === "error" ? "danger" : message.type}`)}>
                <div className="pf-c-alert__icon">
                  {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                  {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                  {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                  {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                </div>
                <span
                  className={kcClsx("kcAlertTitleClass")}
                  dangerouslySetInnerHTML={{
                    __html: kcSanitize(message.summary)
                  }}
                />
              </div>
            )}
            {socialProvidersNode && socialProvidersNode}
            {children}
            {auth !== undefined && auth.showTryAnotherWayLink && (
              <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                  <div className={kcClsx("kcFormGroupClass")}>
                    <input type="hidden" name="tryAnotherWay" value="on" />
                    <a
                      href="#"
                      id="try-another-way"
                      onClick={() => {
                        document.forms["kc-select-try-another-way-form" as never].submit();
                        return false;
                      }}
                    >
                      {msg("doTryAnotherWay")}
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        <div id="kc-inf" className={kcClsx("kcSignUpClass")}>
          <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
            {msgStr("bobTermsMessage1")}{" "}
            <a href="https://bob.no/personvern-og-cookies/" className={kcClsx("kcFormSocialAccountLinkClass")}>
              {msgStr("bobTermsMessage2")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
