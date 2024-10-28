import { useEffect } from "react";
import { assert } from "keycloakify/tools/assert";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import bobLogoSvgUrl from "./assets/bob-logo-desktop.svg";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select";
import { cn } from "../utils";

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
    <Select defaultValue={currentLanguage.label}>
      <SelectTrigger className="absolute top-0 right-0 flex gap-2 w-fit ml-auto mb-auto text-violet lg:text-white text-base">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent align="end" className="bg-white lg:bg-transparent text-violet lg:text-snow">
        {enabledLanguages.map(({ languageTag, label, href }, i) => (
          <SelectItem key={languageTag} value={label} className="text-violet lg:text-snow">
            <a role="menuitem" id={`language-${i + 1}`} className="text-violet lg:text-snow text-base" href={href}>
              {label}
            </a>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className={kcClsx("kcLoginClass")}>
      <div className={cn(kcClsx("kcContainerClass"), "hidden lg:block relative")}>
        {realm.internationalizationEnabled && (assert(locale !== undefined), enabledLanguages.length > 1) && languageDropdown}
      </div>
      <div className={cn(kcClsx("kcFormCardClass"))}>
        <div id="kc-content" className={kcClsx("kcContentClass")}>
          <div className="block lg:hidden">
            {realm.internationalizationEnabled && (assert(locale !== undefined), enabledLanguages.length > 1) && languageDropdown}
          </div>
          <header className={kcClsx("kcFormHeaderClass")}>
            <img src={bobLogoSvgUrl} alt="BOB logo" height={60} />
          </header>
          <div id="kc-content-wrapper" className={kcClsx("kcContentWrapperClass")}>
            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
              <div className={cn(`alert-${message.type}`, kcClsx("kcAlertClass"), `pf-m-${message?.type === "error" ? "danger" : message.type}`)}>
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
