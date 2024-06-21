import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useDownloadTerms } from "keycloakify/login";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    useDownloadTerms({
        kcContext,
        downloadTermsMarkdown: async ({ currentLanguageTag }) => {
            for (const languageTag of [currentLanguageTag, "en"]) {
                const response = await fetch(
                    `${import.meta.env.BASE_URL}terms/${languageTag}.md`
                );

                if (!response.ok) {
                    continue;
                }

                return {
                    termsMarkdown: await response.text(),
                    termsLanguageTag: languageTag
                };
            }

            return {
                termsMarkdown: "No terms found",
                termsLanguageTag: "en"
            };
        }
    });

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
