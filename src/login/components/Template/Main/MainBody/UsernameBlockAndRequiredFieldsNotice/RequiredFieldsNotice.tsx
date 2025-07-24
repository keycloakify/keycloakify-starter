import { useKcClsx } from "../../../../../../@keycloakify/login-ui/useKcClsx";
import { useI18n } from "../../../../../i18n";
import { clsx } from "../../../../../../@keycloakify/login-ui/tools/clsx";

export function RequiredFieldsNotice() {
  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();

  return (
      <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
        <span className={kcClsx("kcInputHelperTextItemTextClass")}>
          <span className={kcClsx("kcInputRequiredClass")}>*</span>
          {msg("requiredFields")}
        </span>
      </div>
  );
}
