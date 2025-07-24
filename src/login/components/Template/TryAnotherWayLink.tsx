

import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

export function TryAnotherWayLink() {
  const { kcContext } = useKcContext();
  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();

  if (!kcContext.auth?.showTryAnotherWayLink) {
    return null;
  }

  return (
    <form
      id="kc-select-try-another-way-form"
      action={kcContext.url.loginAction}
      method="post"
      noValidate={true}
    >
      <input type="hidden" name="tryAnotherWay" value="on" />
      <a
        id="try-another-way"
        href="javascript:document.forms['kc-select-try-another-way-form'].requestSubmit()"
        className={kcClsx(
          "kcButtonSecondaryClass",
          "kcButtonBlockClass",
          "kcMarginTopClass"
        )}
      >
        {msg("doTryAnotherWay")}
      </a>
    </form>
  );
}
