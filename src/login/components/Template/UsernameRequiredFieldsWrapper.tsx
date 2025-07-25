import type { ReactNode } from "react";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

type Props = {
  slots: {
    requiredFields: ReactNode;
    username: ReactNode;
  };
};

export function UsernameRequiredFieldsWrapper(props: Props) {
  const { slots } = props;
  const { kcClsx } = useKcClsx();

  if (!slots.requiredFields && !slots.username) {
    return null;
  }

  if (slots.requiredFields && !slots.username) {
    return (
      <div className={kcClsx("kcContentWrapperClass")}>
        {slots.requiredFields}
      </div>
    );
  }

  if (!slots.requiredFields && slots.username) {
    return slots.username;
  }

  return (
    <div className={kcClsx("kcContentWrapperClass")}>
      {slots.requiredFields}
      {slots.username}
    </div>
  );
}
