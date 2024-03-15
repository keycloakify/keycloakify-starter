import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { useState, useEffect, FormEventHandler } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { HeaderNode } from "../components/header-node";
import { PasswordIcon } from "../components/icons/password";
import { FormErrorMessage, Input } from "@chakra-ui/react";
import { SubmitInput } from "../components/submit-input";

export default function LoginUpdatePassword(
  props: PageProps<
    Extract<KcContext, { pageId: "login-update-password.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { msg, msgStr } = i18n;

  const { url, isAppInitiatedAction } = kcContext;
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState(
    {} as { password: string; passwordConfirm: string }
  );
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const validatePassword = () => {
    if (!password) {
      return "Required";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return "";
  };
  const validatePasswordConfirm = () => {
    if (!passwordConfirm) {
      return "Required";
    } else if (password !== passwordConfirm) {
      return "Passwords do not match";
    }
    return "";
  };
  const validateForm = () => {
    setErrors({
      password: validatePassword(),
      passwordConfirm: validatePasswordConfirm(),
    });
  };
  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    setWasSubmitted(true);
    const formElement = e.target as HTMLFormElement;
    if (formElement.checkValidity() === true) {
      formElement.submit();
    } else {
      validateForm();
    }
  });
  useEffect(() => {
    if (wasSubmitted) {
      validateForm();
    }
  }, [password, passwordConfirm]);

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={
        <HeaderNode
          title="Set New Password"
          subtitle="Create your new strong password"
          asset={
            <div className="flex justify-center">
              <PasswordIcon w="60px" h="28px" />
            </div>
          }
        />
      }
    >
      <form
        id="kc-passwd-up-form"
        className="space-y-4"
        action={url.loginAction}
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSubmit(e);
        }}
        noValidate
      >
        <Input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          style={{ display: "none" }}
        />
        <Input
          type="password"
          id="password-new"
          name="password-new"
          placeholder="New Password"
          autoFocus
          autoComplete="new-password"
          className={getClassName("kcInputClass")}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          required
          minLength={8}
        />
        {!!errors.password ? (
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        ) : null}

        <Input
          type="password"
          id="password-confirm"
          name="password-confirm"
          autoComplete="new-password"
          placeholder="Confirm Password"
          className={getClassName("kcInputClass")}
          onChange={(e) =>
            setPasswordConfirm((e.target as HTMLInputElement).value)
          }
          required
          minLength={8}
        />
        {!!errors.passwordConfirm ? (
          <FormErrorMessage>{errors.passwordConfirm}</FormErrorMessage>
        ) : null}

        <div className={getClassName("kcFormGroupClass")}>
          <div
            id="kc-form-options"
            className={getClassName("kcFormOptionsClass")}
          >
            <div className={getClassName("kcFormOptionsWrapperClass")}>
              {isAppInitiatedAction && (
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      id="logout-sessions"
                      name="logout-sessions"
                      value="on"
                      checked
                    />
                    {msgStr("logoutOtherSessions")}
                  </label>
                </div>
              )}
            </div>
          </div>

          <div
            id="kc-form-buttons"
            className={getClassName("kcFormButtonsClass")}
          >
            {isAppInitiatedAction ? (
              <>
                <SubmitInput type="submit" defaultValue={msgStr("doSubmit")} />
                <button type="submit" name="cancel-aia" value="true">
                  {msg("doCancel")}
                </button>
              </>
            ) : (
              <SubmitInput type="submit" />
            )}
          </div>
        </div>
      </form>
    </Template>
  );
}
