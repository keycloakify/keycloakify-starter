import type { ReactNode } from "react";
import { Group } from "./Group";
import { ErrorIcon } from "./ErrorIcon";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

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
  };

  export type Controlled = Common & {
    value: string;
    onValueChange: (newValue: string) => void;
  };

  export type Uncontrolled = Common & {
    defaultValue?: string;
  };
}

export function Input(props: Props) {
  const {
    className,
    name,
    label,
    required = false,
    autoComplete = "off",
    error,
    autoFocus = false,
    ...controls
  } = props;

  const { kcClsx } = useKcClsx();

  return (
    <Group
      className={className}
      name={name}
      label={label}
      error={error}
      required={required}
    >
      <span className={kcClsx("kcInputClass", !!error && "kcError")}>
        <input
          id={name}
          name={name}
          type="text"
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-invalid={!!error ? true : undefined}
          {...("value" in controls
            ? {
                value: controls.value,
                onChange: (e) => {
                  controls.onValueChange(e.target.value);
                },
              }
            : { defaultValue: controls.defaultValue })}
        />
      </span>

      {error && <ErrorIcon />}
    </Group>
  );
}
