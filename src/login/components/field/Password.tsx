import { useReducer, type ReactNode } from "react";
import { Group } from "./Group";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { useI18n } from "../../i18n";
import { ErrorIcon } from "./ErrorIcon";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";

export type Props = Props.Controlled | Props.Uncontrolled;

export namespace Props {
  type Common = {
    className?: string;
    name: string;
    label: ReactNode;
    required?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;

    error: ReactNode;
    rememberMe?: ReactNode;
    forgotPassword?: ReactNode;
  };

  export type Controlled = Common & {
    onValueChange: (newValue: string) => void;
    value: string;
  };

  export type Uncontrolled = Common & {
    defaultValue?: string;
  };
}

export function Password(props: Props) {
  const {
    className,
    name,
    label,
    required = false,
    autoComplete = "off",
    autoFocus = false,

    error,
    rememberMe,
    forgotPassword,

    ...controls
  } = props;

  const { kcClsx } = useKcClsx();
  const { msgStr } = useI18n();

  const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer(
    (isPasswordRevealed) => !isPasswordRevealed,
    false
  );

  return (
    <Group
      className={className}
      name={name}
      label={label}
      error={error}
      required={required}
    >
      <div className={kcClsx("kcInputGroup")}>
        <div className={kcClsx("kcInputGroupItemClass", "kcFill")}>
          <span className={kcClsx("kcInputClass", !!error && "kcError")}>
            <input
              id={name}
              name={name}
              type={isPasswordRevealed ? "text" : "password"}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              aria-invalid={error ? "true" : undefined}
              {...("value" in controls
                ? {
                    value: controls.value,
                    onChange: (e) => {
                      controls.onValueChange(e.target.value);
                    },
                  }
                : { defaultValue: controls.defaultValue })}
            />
            {!!error && <ErrorIcon />}
          </span>
        </div>
        <div className={kcClsx("kcInputGroupItemClass")}>
          <button
            className={kcClsx("kcFormPasswordVisibilityButtonClass")}
            type="button"
            aria-label={msgStr(
              isPasswordRevealed ? "hidePassword" : "showPassword"
            )}
            aria-controls={name}
            id={`${name}-show-password`}
            onClick={toggleIsPasswordRevealed}
          >
            <i
              className={clsx(
                isPasswordRevealed ? "fa-eye-slash" : "fa-eye",
                "fas"
              )}
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
      <div className={kcClsx("kcFormHelperTextClass")} aria-live="polite">
        <div className={kcClsx("kcInputHelperTextClass")}>
          {rememberMe ?? null}
          {forgotPassword && (
            <div className={kcClsx("kcInputHelperTextItemClass")}>
              <span className={kcClsx("kcInputHelperTextItemTextClass")}>
                {forgotPassword}
              </span>
            </div>
          )}
        </div>
      </div>
    </Group>
  );
}
