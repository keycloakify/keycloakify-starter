import { clsx } from "keycloakify/tools/clsx";
import { useI18n } from "../../i18n";
import type { KcContext } from "../../KcContext";
import { useKcClsx } from "../../_internals/useKcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

export function SocialProviders(props: {
    kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
}) {
    const { kcContext } = props;

    const { realm, social } = kcContext;

    const { msg } = useI18n();

    const { kcClsx } = useKcClsx();

    return (
        <>
            {realm.password &&
                social?.providers !== undefined &&
                social.providers.length !== 0 && (
                    <div
                        id="kc-social-providers"
                        className={kcClsx("kcFormSocialAccountSectionClass")}
                    >
                        <hr />
                        <h2>{msg("identity-provider-login-label")}</h2>
                        <ul
                            className={kcClsx(
                                "kcFormSocialAccountListClass",
                                social.providers.length > 3 &&
                                    "kcFormSocialAccountListGridClass"
                            )}
                        >
                            {social.providers.map((...[p, , providers]) => (
                                <li key={p.alias}>
                                    <a
                                        id={`social-${p.alias}`}
                                        className={kcClsx(
                                            "kcFormSocialAccountListButtonClass",
                                            providers.length > 3 &&
                                                "kcFormSocialAccountGridItem"
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
                )}
        </>
    );
}
