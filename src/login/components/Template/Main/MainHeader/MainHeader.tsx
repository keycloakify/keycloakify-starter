import type { ReactNode } from "react";
import { useKcClsx } from "../../../../../@keycloakify/login-ui/useKcClsx";
import { LanguageSelect } from "./LanguageSelect";

type Props = {
  children: ReactNode;
};

export function MainHeader(props: Props) {
  const { children } = props;

  const { kcClsx } = useKcClsx();

  return (
    <div className={kcClsx("kcLoginMainHeader")}>
      <h1 className={kcClsx("kcLoginMainTitle")} id="kc-page-title">
        {children}
      </h1>
      <LanguageSelect />
    </div>
  );
}
