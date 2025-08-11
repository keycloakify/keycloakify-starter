import { useId } from "react";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";
import { useKcContext } from "../../KcContext.gen";
import { Group } from "../field/Group";
import { useI18n } from "../../i18n";

export function UsernameBlock() {
  const { kcClsx } = useKcClsx();
  const { kcContext } = useKcContext();
  const { msg, msgStr } = useI18n();

  const inputId= `kc-attempted-username-${useId()}`

  if (!kcContext.auth?.showUsername) {
    return null;
  }

  if (kcContext.auth.showResetCredentials) {
    return null;
  }

  return (
      <div className={kcClsx("kcFormClass", "kcContentWrapperClass")}>
          <Group
          inputId={inputId}
              label={msg(
                  !kcContext.realm.loginWithEmailAllowed
                      ? "username"
                      : !kcContext.realm.registrationEmailAsUsername
                      ? "usernameOrEmail"
                      : "email"
              )}
          >
              <div className={kcClsx("kcInputGroup")}>
                  <div className={kcClsx("kcInputGroupItemClass", "kcFill")}>
                      <span className={kcClsx("kcInputClass", "kcFormReadOnlyClass")}>
                          <input
                              id={inputId}
                              value={kcContext.auth.attemptedUsername}
                              readOnly
                          />
                      </span>
                  </div>
                  <div className={kcClsx("kcInputGroupItemClass")}>
                      <button
                          id="reset-login"
                          className={clsx(
                              kcClsx("kcFormPasswordVisibilityButtonClass"),
                              "kc-login-tooltip"
                          )}
                          type="button"
                          aria-label={msgStr("restartLoginTooltip")}
                          onClick={() => {
                              window.location.href = kcContext.url.loginRestartFlowUrl;
                          }}
                      >
                          <i className="fa-sync-alt fas" aria-hidden="true"></i>
                          <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                      </button>
                  </div>
              </div>
          </Group>
      </div>
  );
}
