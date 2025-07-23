import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";

export function Header() {
  const { msg } = useI18n();
  const { kcContext } = useKcContext();

  return (
    <header id="kc-header" className="pf-v5-c-login__header">
      <div id="kc-header-wrapper" className="pf-v5-c-brand">
        {msg("loginTitleHtml", kcContext.realm.displayNameHtml || "")}
      </div>
    </header>
  );
}
