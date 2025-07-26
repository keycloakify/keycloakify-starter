import { assert } from "tsafe/assert";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";

export function Info() {
  const { kcContext } = useKcContext();
  assert(kcContext.pageId === "login.ftl");

  const { url } = kcContext;

  const { msg } = useI18n();

  if (!kcContext.realm.password) {
    return undefined;
  }

  if (!kcContext.realm.registrationAllowed) {
    return undefined;
  }

  if (kcContext.registrationDisabled) {
    return undefined;
  }

  return (
    <div id="kc-registration-container">
      <div id="kc-registration">
        <span>
          {msg("noAccount")}{" "}
          <a href={url.registrationUrl}>{msg("doRegister")}</a>
        </span>
      </div>
    </div>
  );
}
