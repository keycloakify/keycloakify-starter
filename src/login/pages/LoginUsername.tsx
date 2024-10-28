import { useEffect, useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { cn } from "../../utils";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss: false,
    classes
  });

  const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidEmail(emailRegex.test(email));
    }
  }, [email]);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("username")}
      displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
      infoNode={
        <div id="kc-registration">
          <span>
            {msg("noAccount")}
            <a tabIndex={6} href={url.registrationUrl}>
              {msg("doRegister")}
            </a>
          </span>
        </div>
      }
      headerNode={msg("doLogIn")}
      socialProvidersNode={
        <>
          {!emailClicked && realm.password && social?.providers?.length && (
            <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
              <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                {social.providers.map((...[p, , providers]) => {
                  if (p.alias === "vipps") {
                    return (
                      <li key={p.alias}>
                        <a
                          id={`social-${p.alias}`}
                          className={kcClsx("kcFormSocialAccountListButtonClass", providers.length > 3 && "kcFormSocialAccountGridItem")}
                          type="button"
                          href={p.loginUrl}
                        >
                          {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                          <span className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}>
                            {p.displayName}
                          </span>
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={p.alias}>
                      <a
                        id={`social-${p.alias}`}
                        className={kcClsx("kcFormSocialAccountListButtonClass", providers.length > 3 && "kcFormSocialAccountGridItem")}
                        type="button"
                        href={p.loginUrl}
                      >
                        {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                        <span className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}>{p.displayName}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      }
    >
      <div id="kc-form">
        <div id="kc-form-wrapper">
          {realm.password &&
            (emailClicked ? (
              <form
                id="kc-form-login"
                onSubmit={() => {
                  setIsLoginButtonDisabled(true);
                  return true;
                }}
                action={url.loginAction}
                method="post"
              >
                {!usernameHidden && (
                  <div className={kcClsx("kcFormGroupClass")}>
                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                      {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
                    </label>
                    <input
                      tabIndex={2}
                      id="username"
                      className={kcClsx("kcInputClass")}
                      name="username"
                      defaultValue={login.username ?? ""}
                      type="email"
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                      autoFocus
                      autoComplete="off"
                      aria-invalid={messagesPerField.existsError("username")}
                      onChange={e => setEmail(e.target.value)}
                    />
                    {messagesPerField.existsError("username") && (
                      <span id="input-error" className={kcClsx("kcInputErrorMessageClass")} aria-live="polite">
                        {messagesPerField.getFirstError("username")}
                      </span>
                    )}
                  </div>
                )}

                <div className={cn(kcClsx("kcFormGroupClass", "kcFormSettingClass"), "invisible")}>
                  <div id="kc-form-options">
                    {realm.rememberMe && !usernameHidden && (
                      <div className="checkbox">
                        <label>
                          <input tabIndex={3} id="rememberMe" name="rememberMe" type="checkbox" checked className="border-[#888]" />{" "}
                          {msg("rememberMe")}
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                  <input
                    tabIndex={4}
                    disabled={isLoginButtonDisabled || !validEmail}
                    className={kcClsx("kcButtonPrimaryClass")}
                    name="login"
                    id="kc-login"
                    type="submit"
                    value={msgStr("doSendCode")}
                  />
                </div>
              </form>
            ) : (
              <div>
                <button onClick={() => setEmailClicked(true)} className={kcClsx("kcButtonDefaultClass")}>
                  {msg("loginWithEmail")}
                </button>
              </div>
            ))}
        </div>
      </div>
    </Template>
  );
}
