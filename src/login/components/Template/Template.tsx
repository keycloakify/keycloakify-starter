import type { ReactNode } from "react";
import { useInitializeTemplate } from "./useInitializeTemplate";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { Header } from "./Header";
import { Main } from "./Main";

export function Template(props: {
  displayInfo?: boolean;
  displayMessage?: boolean;
  displayRequiredFields?: boolean;
  headerNode: ReactNode;
  showUsernameNode: ReactNode;
  children: ReactNode;
}) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    showUsernameNode,
    children,
  } = props;

  const { kcClsx } = useKcClsx();

  const { isReadyToRender } = useInitializeTemplate();

  if (!isReadyToRender) {
    return null;
  }

  return (
    <div className={kcClsx("kcLogin")}>
      <div className={kcClsx("kcLoginContainer")}>
        <Header />
        <Main headerNode={headerNode} showUsernameNode={showUsernameNode}>
          {children}
        </Main>
      </div>
    </div>
  );
}
