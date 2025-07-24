import type { ReactNode } from "react";
import { useInitializeTemplate } from "./useInitializeTemplate";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { Header } from "./Header";
import { LanguageSelect } from "./LanguageSelect";
import { UsernameBlockAndRequiredFieldsNotice } from "./UsernameBlockAndRequiredFieldsNotice";
import { AlertMessage } from "./AlertMessage";
import { TryAnotherWayLink } from "./TryAnotherWayLink";

export function Template(props: {
  displayInfo?: boolean;
  displayMessage?: boolean;
  displayRequiredFields?: boolean;
  slots: {
    header: ReactNode;
  };
  children: ReactNode;
}) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    slots,
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
        <main className={kcClsx("kcLoginMain")}>
          <div className={kcClsx("kcLoginMainHeader")}>
            <h1 className={kcClsx("kcLoginMainTitle")} id="kc-page-title">
              {slots.header}
            </h1>
            <LanguageSelect />
          </div>
          <div className={kcClsx("kcLoginMainBody")}>
            <UsernameBlockAndRequiredFieldsNotice
              displayRequiredFields={displayRequiredFields}
            />
            <AlertMessage displayMessage={displayMessage} />
            {children}
            <TryAnotherWayLink />
          </div>
        </main>
      </div>
    </div>
  );
}
