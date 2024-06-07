import { Suspense, lazy } from "react";
import type { PageProps } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import { useDownloadTerms } from "keycloakify/login";
import Template from "keycloakify/login/Template";
const Fallback = lazy(() => import("keycloakify/login/Fallback"));
const UserProfileFormFields = lazy(() => import("keycloakify/login/UserProfileFormFields"));

const classes = {} satisfies PageProps["classes"];

export default function KcApp(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const i18n = useI18n({ kcContext });

    useDownloadTerms({
        kcContext,
        downloadTermsMarkdown: async ({ currentLanguageTag }) => {
            let termsLanguageTag = currentLanguageTag;
            let termsFileName: string;

            switch (currentLanguageTag) {
                case "fr":
                    termsFileName = "fr.md";
                    break;
                case "es":
                    termsFileName = "es.md";
                    break;
                default:
                    termsFileName = "en.md";
                    termsLanguageTag = "en";
                    break;
            }

            const termsMarkdown = await fetch(`${import.meta.env.BASE_URL}terms/${termsFileName}`).then(r => r.text());

            return { termsMarkdown, termsLanguageTag };
        }
    });

    if (i18n === null) {
        return null;
    }

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return (
                            <Fallback
                                {...{
                                    kcContext,
                                    i18n,
                                    classes,
                                    Template,
                                    UserProfileFormFields
                                }}
                                doUseDefaultCss={true}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}
