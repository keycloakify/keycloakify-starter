import type { ReactNode } from "react";
import { MainHeader } from "./MainHeader";
import { MainBody } from "./MainBody";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";

type Props = {
  displayMessage: boolean;
  displayRequiredFields: boolean;
  headerNode: ReactNode;
  showUsernameNode: ReactNode;
  children: ReactNode;
};

export function Main(props: Props) {
  const { displayMessage, displayRequiredFields, headerNode, showUsernameNode, children } = props;

  const { kcClsx } = useKcClsx();

  return (
    <main className={kcClsx("kcLoginMain")}>
      <MainHeader>{headerNode}</MainHeader>

      <MainBody 
      displayMessage={displayMessage}
      displayRequiredFields={displayRequiredFields}
      showUsernameNode={showUsernameNode}>{children}</MainBody>

      <div className={kcClsx("kcLoginMainFooter")}></div>
    </main>
  );
}
