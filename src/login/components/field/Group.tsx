import type { ReactNode } from "react";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";

type Props = {
  className?: string;
  name: string;
  label: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactNode;
};

export function Group(props: Props) {
  const { className, name, label, error, required = false, children } = props;

  const { kcClsx } = useKcClsx();

  return (
    <div className={clsx(kcClsx("kcFormGroupClass"), className)}>
      <div className={kcClsx("kcFormGroupLabelClass")}>
        <label htmlFor={name} className={kcClsx("kcFormLabelClass")}>
          <span className={kcClsx("kcFormLabelTextClass")}>{label}</span>
          {required && (
            <span className={kcClsx("kcInputRequiredClass")} aria-hidden="true">
              &#42;
            </span>
          )}
        </label>
      </div>

      {children}

      <div id={`input-error-container-${name}`}>
        {error && (
          <div className={kcClsx("kcFormHelperTextClass")} aria-live="polite">
            <div className={kcClsx("kcInputHelperTextClass")}>
              <div
                className={kcClsx("kcInputHelperTextItemClass", "kcError")}
                id={`input-error-${name}`}
              >
                <span className={kcClsx("kcInputErrorMessageClass")}>
                  {error}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
