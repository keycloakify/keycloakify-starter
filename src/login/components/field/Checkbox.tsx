import type { ReactNode } from "react";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

type Props = Props.Uncontrolled | Props.Controlled;

namespace Props {
  type Common = {
    name: string;
    label: ReactNode;
    required?: boolean;
  };

  export type Controlled = Common & {
    checked: boolean;
    onCheckedChange: (newChecked: boolean) => void;
  };

  export type Uncontrolled = Common & {
    defaultChecked?: boolean;
  };
}

export function Checkbox(props: Props) {
  const { name, label, required = false, ...controls } = props;

  const { kcClsx } = useKcClsx();

  return (
    <div className={kcClsx("kcCheckboxClass")}>
      <label htmlFor={name} className={kcClsx("kcCheckboxClass")}>
        <input
          className={kcClsx("kcCheckboxInputClass")}
          type="checkbox"
          id={name}
          name={name}
          value="on"
          {...("checked" in controls
            ? {
                checked: controls.checked,
                onChange: (e) => {
                  controls.onCheckedChange(e.target.checked);
                },
              }
            : { defaultChecked: controls.defaultChecked ?? false })}
        />
        <span className={kcClsx("kcCheckboxLabelClass")}>{label}</span>
        {required && (
          <span
            className={kcClsx("kcCheckboxLabelRequiredClass")}
            aria-hidden="true"
          >
            &#42;
          </span>
        )}
      </label>
    </div>
  );
}
