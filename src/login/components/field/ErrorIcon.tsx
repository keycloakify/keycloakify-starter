import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

export function ErrorIcon() {
  const { kcClsx } = useKcClsx();

  return (
    <span className={kcClsx("kcFormControlUtilClass")}>
      <span className={kcClsx("kcInputErrorIconStatusClass")}>
        <i className={kcClsx("kcInputErrorIconClass")} aria-hidden="true"></i>
      </span>
    </span>
  );
}
