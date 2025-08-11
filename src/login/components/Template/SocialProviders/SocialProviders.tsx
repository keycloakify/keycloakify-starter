import { useKcContext } from "../../../KcContext.gen";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";
import { useI18n } from "../../../i18n";
import { LinkDisabledOnceClicked } from "../../LinkDisabledOnceClicked";
import { clsx } from "../../../../@keycloakify/login-ui/tools/clsx";
import { LinkLabel } from "./LinkLabel";

export function SocialProviders() {
  const { kcContext } = useKcContext();
  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();

  if (!kcContext.social?.providers?.length) {
    return null;
  }

  const { providers } = kcContext.social;

  return (
    <>
      <div className={kcClsx("kcLoginMainFooterBand")}>
        <span
          className={kcClsx(
            "kcLoginMainFooterBandItem",
            "kcLoginMainFooterHelperText"
          )}
        >
          {msg("identity-provider-login-label")}
        </span>
      </div>
      <div
        id="kc-social-providers"
        className={kcClsx("kcFormSocialAccountSectionClass")}
      >
        <ul
          className={kcClsx(
            "kcFormSocialAccountListClass",
            providers.length > 3 && "kcFormSocialAccountListGridClass"
          )}
        >
          {providers.map((p) => (
            <li
              className={kcClsx(
                providers.length > 3
                  ? "kcFormSocialAccountGridItem"
                  : "kcFormSocialAccountListItemClass"
              )}
            >
              <LinkDisabledOnceClicked
                id={`social-${p.alias}`}
                className={kcClsx("kcFormSocialAccountListButtonClass")}
                aria-label={p.displayName}
                type="button"
                href={p.loginUrl}
                renderLink={({ anchorProps, isDisabled }) => (
                  <a
                    {...anchorProps}
                    className={clsx(
                      anchorProps.className,
                      isDisabled &&
                        kcClsx("kcFormSocialAccountListButtonDisabledClass")
                    )}
                  />
                )}
              >
                <LinkLabel provider={p} />
              </LinkDisabledOnceClicked>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
