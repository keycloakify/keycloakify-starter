import type { ReactNode } from "react";
import { useKcClsx } from "../../../../../@keycloakify/login-ui/useKcClsx";
import { UsernameBlockAndRequiredFieldsNotice } from "./UsernameBlockAndRequiredFieldsNotice";

type Props = {
  displayRequiredFields: boolean;
  showUsernameNode: ReactNode;
  children: ReactNode;
};

export function MainBody(props: Props) {
  const { displayRequiredFields, showUsernameNode, children } = props;

  const { kcClsx } = useKcClsx();

  return (
    <div className={kcClsx("kcLoginMainBody")}>
      <UsernameBlockAndRequiredFieldsNotice
        displayRequiredFields={displayRequiredFields}
        showUsernameNode={showUsernameNode}
      />
    </div>
  );
}
