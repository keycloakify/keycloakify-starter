// import { useState, type FormEventHandler } from "react";
// import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import vippsLoginSvg from "../assets/vipps-login.svg";

const my_custom_param = new URL(window.location.href).searchParams.get(
  "my_custom_param"
);

if (my_custom_param !== null) {
  console.log("my_custom_param:", my_custom_param);
}

export default function BobLogin(
  props: PageProps<Extract<KcContext, { pageId: "email-code-form.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const {
    social,
    //   realm,
    //   url,
    //   usernameHidden,
    //   login,
    //   auth,
    //   registrationDisabled,
  } = kcContext;

  const {
    msg,
    //  msgStr
  } = i18n;

  // const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  // const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
  //   e.preventDefault();

  //   setIsLoginButtonDisabled(true);

  //   const formElement = e.target as HTMLFormElement;

  //   //NOTE: Even if we login with email Keycloak expect username and password in
  //   //the POST request.
  //   formElement
  //     .querySelector("input[name='email']")
  //     ?.setAttribute("name", "username");

  //   formElement.submit();
  // });

  const vipps = social.providers?.find((p) => p.alias === "vipps");

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      // displayInfo={
      //   realm.password && realm.registrationAllowed && !registrationDisabled
      // }
      // displayWide={realm.password && social.providers !== undefined}
      headerNode={msg("doLogIn")}
      infoNode={
        <div id="kc-registration">
          <span>
            {msg("noAccount")}
            {/* <a tabIndex={6} href={url.registrationUrl}>
              {msg("doRegister")}
            </a> */}
          </span>
        </div>
      }
    >
      <div
        id="kc-form"
        // className={clsx(
        //   realm.password &&
        //     social.providers !== undefined &&
        //     getClassName("kcContentWrapperClass")
        // )}
      >
        {vipps && (
          <a
            href={vipps.loginUrl}
            id={`social-${vipps.alias}`}
            className={clsx(
              getClassName("kcFormGroupClass"),
              getClassName("kcButtonPrimaryClass")
            )}
          >
            <img src={vippsLoginSvg} alt={`Logg inn med ${vipps.providerId}`} />
          </a>
        )}
        <button
          className={clsx(
            getClassName("kcFormGroupClass"),
            getClassName("kcButtonPrimaryClass")
          )}
        >
          Logg inn med <b>sms</b>
        </button>
        <button
          className={clsx(
            getClassName("kcFormGroupClass"),
            getClassName("kcButtonPrimaryClass")
          )}
        >
          Logg inn med <b>epost</b>
        </button>
      </div>
    </Template>
  );
}
