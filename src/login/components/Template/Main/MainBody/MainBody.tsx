import type { ReactNode } from "react";
import { useKcClsx } from "../../../../../@keycloakify/login-ui/useKcClsx";
import { UsernameBlockAndRequiredFieldsNotice } from "./UsernameBlockAndRequiredFieldsNotice";
import { AlertMessage } from "./AlertMessage";

type Props = {
  displayRequiredFields: boolean;
  displayMessage: boolean;
  showUsernameNode: ReactNode;
  children: ReactNode;
};

export function MainBody(props: Props) {
  const { displayRequiredFields, displayMessage, showUsernameNode, children } =
    props;

  const { kcClsx } = useKcClsx();

  return (
    <div className={kcClsx("kcLoginMainBody")}>
      <UsernameBlockAndRequiredFieldsNotice
        displayRequiredFields={displayRequiredFields}
        showUsernameNode={showUsernameNode}
      />
      <AlertMessage displayMessage={displayMessage} />
      {children}
    </div>
  );
}
