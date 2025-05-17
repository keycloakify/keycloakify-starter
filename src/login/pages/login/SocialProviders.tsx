import { clsx } from "keycloakify/tools/clsx";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../_internals/useKcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useKcContext } from "../../KcContext";
import { assert } from "tsafe/assert";

/** To use this component make sure that kcContext.social exists */
export function SocialProviders() {
    const { kcContext } = useKcContext();

    assert("social" in kcContext && kcContext.social !== undefined);

    const { msg } = useI18n();

    const { kcClsx } = useKcClsx();

    if (
        kcContext.social.providers === undefined ||
        kcContext.social.providers.length === 0
    ) {
        return null;
    }

    return (
        <div
            id="kc-social-providers"
            className={kcClsx("kcFormSocialAccountSectionClass")}
        >
            <hr />
            <h2>{msg("identity-provider-login-label")}</h2>
            <ul
                className={kcClsx(
                    "kcFormSocialAccountListClass",
                    kcContext.social.providers.length > 3 && "kcFormSocialAccountListGridClass"
                )}
            >
                {kcContext.social.providers.map((...[p, , providers]) => (
                    <li key={p.alias}>
                        <a
                            id={`social-${p.alias}`}
                            className={kcClsx(
                                "kcFormSocialAccountListButtonClass",
                                providers.length > 3 && "kcFormSocialAccountGridItem"
                            )}
                            type="button"
                            href={p.loginUrl}
                        >
                            {p.iconClasses && (
                                <i
                                    className={clsx(
                                        kcClsx("kcCommonLogoIdP"),
                                        p.iconClasses
                                    )}
                                    aria-hidden="true"
                                ></i>
                            )}
                            <span
                                className={clsx(
                                    kcClsx("kcFormSocialAccountNameClass"),
                                    p.iconClasses && "kc-social-icon-text"
                                )}
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(p.displayName)
                                }}
                            ></span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
