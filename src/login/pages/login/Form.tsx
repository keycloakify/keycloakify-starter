import { assert } from "tsafe/assert";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { LoginButton } from "../../components/buttons/LoginButton";
import { Input } from "../../components/field/Input";
import { ConditionalUIData } from "../../components/ConditionalUIData";
import { Password } from "../../components/field/Password";
import { Checkbox } from "../../components/field/Checkbox";

export function Form() {
  const { kcContext } = useKcContext();
  assert(kcContext.pageId === "login.ftl");

  const { msg } = useI18n();

  const { kcClsx } = useKcClsx();

  return (
    <>
      <div id="kc-form">
        <div id="kc-form-wrapper">
          {kcContext.realm.password && (
            <form
              id="kc-form-login"
              className={kcClsx("kcFormClass")}
              action={kcContext.url.loginAction}
              method="post"
              noValidate={true}
            >
              {!kcContext.usernameHidden && (
                <Input
                  name="username"
                  label={null}
                  error={kcContext.messagesPerField.getFirstError(
                    "username",
                    "password"
                  )}
                  autoFocus={true}
                  autoComplete={
                    kcContext.enableWebAuthnConditionalUI
                      ? "username webauthn"
                      : "username"
                  }
                  defaultValue={kcContext.login.username}
                />
              )}
              <Password
                name="password"
                label={msg("password")}
                error={
                  !kcContext.usernameHidden
                    ? undefined
                    : kcContext.messagesPerField.get("password")
                }
                autoFocus={!!kcContext.usernameHidden}
                autoComplete={"current-password"}
                rememberMe={
                  kcContext.realm.rememberMe &&
                  !kcContext.usernameHidden && (
                    <Checkbox
                      name="rememberMe"
                      label={msg("rememberMe")}
                      defaultChecked={!!kcContext.login.rememberMe}
                    />
                  )
                }
              />

              <input
                type="hidden"
                id="id-hidden-input"
                name="credentialId"
                value={kcContext.auth.selectedCredential ?? undefined}
                readOnly
              />
              <LoginButton />
            </form>
          )}
        </div>
      </div>
      <ConditionalUIData />
    </>
  );
}
