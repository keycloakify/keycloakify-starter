import type { ReactNode } from "react";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";

type Props = {
  className?: string;
  horizontal?: boolean;
  children: ReactNode;
};

export function ActionGroup(props: Props) {
  const { className, horizontal, children } = props;

  const { kcClsx } = useKcClsx();

  return (
    <div className={clsx(kcClsx("kcFormGroupClass"), className)}>
      <div
        className={clsx(
          kcClsx("kcFormActionGroupClass"),
          horizontal ? "pf-v5-u-flex-nowrap" : "pf-v5-u-flex-wrap"
        )}
      >
        {children}
      </div>
    </div>
  );
}
