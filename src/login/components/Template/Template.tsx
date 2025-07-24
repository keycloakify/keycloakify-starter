import type { ReactNode } from "react";
import { useInitializeTemplate } from "./useInitializeTemplate";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { Header } from "./Header";
import { LanguageSelect } from "./LanguageSelect";
import { UsernameBlockAndRequiredFieldsNotice } from "./UsernameBlockAndRequiredFieldsNotice";
import { AlertMessage } from "./AlertMessage";
import { TryAnotherWayLink } from "./TryAnotherWayLink";

export function Template(props: {
  displayMessage?: boolean;
  displayRequiredFields?: boolean;
  slots: {
    header: ReactNode;
    socialProviders?: ReactNode;
    info?: ReactNode;
  };
  children: ReactNode;
}) {
  const {
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
            {displayMessage && <AlertMessage />}
            {children}
            <TryAnotherWayLink />

            <div className={kcClsx("kcLoginMainFooter")}>
              {slots.socialProviders !== undefined && slots.socialProviders}

              {slots.info !== undefined && (
                <div
                  id="kc-info"
                  className={kcClsx("kcLoginMainFooterBand", "kcFormClass")}
                >
                  <div
                    id="kc-info-wrapper"
                    className={kcClsx("kcLoginMainFooterBandItem")}
                  >
                    {slots.info}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
