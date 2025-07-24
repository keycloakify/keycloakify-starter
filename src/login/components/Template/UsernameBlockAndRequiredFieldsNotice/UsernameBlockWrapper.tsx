import type { ReactNode } from "react";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";
import { clsx } from "../../../../@keycloakify/login-ui/tools/clsx";
import { useKcContext } from "../../../KcContext";
import { FieldGroup } from "../../FieldGroup";
import { useI18n } from "../../../i18n";
import { assert } from "tsafe/assert";

type Props = {
  children: ReactNode;
};

export function UsernameBlockWrapper(props: Props) {
  const { children } = props;

  const { kcClsx } = useKcClsx();
  const { kcContext } = useKcContext();
  const { msg } = useI18n();

  return (
    <div className={kcClsx("kcFormClass", "kcContentWrapperClass")}>
      {children}
      <FieldGroup
        name="username"
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
                id="kc-attempted-username"
                value={(() => {
                  assert(kcContext.auth !== undefined);
                  return kcContext.auth.attemptedUsername;
                })()}
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
              aria-label="${msg('restartLoginTooltip')}"
              onClick={() => {
                window.location.href = kcContext.url.loginRestartFlowUrl;
              }}
            >
              <i className="fa-sync-alt fas" aria-hidden="true"></i>
              <span className="kc-tooltip-text">
                {msg("restartLoginTooltip")}
              </span>
            </button>
          </div>
        </div>
      </FieldGroup>
    </div>
  );
}
