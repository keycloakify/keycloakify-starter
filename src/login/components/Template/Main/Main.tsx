import type { ReactNode } from "react";
import { MainHeader } from "./MainHeader";
import { MainBody } from "./MainBody";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";

type Props = {
  headerNode: ReactNode;
  showUsernameNode: ReactNode;
  children: ReactNode;
};

export function Main(props: Props) {
  const { headerNode, showUsernameNode, children } = props;

  const { kcClsx } = useKcClsx();

  return (
    <main className={kcClsx("kcLoginMain")}>
      <MainHeader>{headerNode}</MainHeader>

      <MainBody showUsernameNode={showUsernameNode}>{children}</MainBody>

      <div className={kcClsx("kcLoginMainFooter")}></div>
    </main>
  );
}
