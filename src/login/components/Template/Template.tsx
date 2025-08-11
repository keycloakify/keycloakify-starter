import type { ReactNode } from "react";
import { useInitializeTemplate } from "./useInitializeTemplate";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext.gen";
import { LanguageSelect } from "./LanguageSelect";
import { UsernameRequiredFieldsWrapper } from "./UsernameRequiredFieldsWrapper";
import { UsernameBlock } from "./UsernameBlock";
import { RequiredFieldsNotice } from "./RequiredFieldsNotice";
import { AlertMessage } from "./AlertMessage";
import { TryAnotherWayLink } from "./TryAnotherWayLink";
import { SocialProviders } from "./SocialProviders";

export function Template(props: {
  displayMessage?: boolean;
  displayRequiredFields?: boolean;
  displaySocialProviders?: boolean;
  slots: {
    header: ReactNode;
    info?: ReactNode;
    form: ReactNode;
  };
}) {
  const {
    displayMessage = true,
    displayRequiredFields = false,
    displaySocialProviders = false,
    slots,
  } = props;

  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();
  const { kcContext } = useKcContext();

  const { isReadyToRender } = useInitializeTemplate();

  if (!isReadyToRender) {
    return null;
  }

  return (
    <div className={kcClsx("kcLogin")}>
      <div className={kcClsx("kcLoginContainer")}>
        <header id="kc-header" className="pf-v5-c-login__header">
          <div id="kc-header-wrapper" className="pf-v5-c-brand">
            {msg("loginTitleHtml", kcContext.realm.displayNameHtml)}
          </div>
        </header>
        <main className={kcClsx("kcLoginMain")}>
          <div className={kcClsx("kcLoginMainHeader")}>
            <h1 className={kcClsx("kcLoginMainTitle")} id="kc-page-title">
              {slots.header}
            </h1>
            <LanguageSelect />
          </div>
          <div className={kcClsx("kcLoginMainBody")}>
            <UsernameRequiredFieldsWrapper
              slots={{
                requiredFields: displayRequiredFields && (
                  <RequiredFieldsNotice />
                ),
                username: <UsernameBlock />,
              }}
            />
            {displayMessage && <AlertMessage />}
            {slots.form}
            <TryAnotherWayLink />
            <div className={kcClsx("kcLoginMainFooter")}>
              {displaySocialProviders && <SocialProviders />}
              {slots.info && (
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
