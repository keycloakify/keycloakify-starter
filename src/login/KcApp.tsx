import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useDownloadTerms } from "keycloakify/login";
import Fallback from "keycloakify/login/Fallback";
import Template from "keycloakify/login/Template";
const UserProfileFormFields = lazy(() => import("keycloakify/login/UserProfileFormFields"));

const doMakeUserConfirmPassword = true;

export default function KcApp(props: { kcContext: KcContext }) {
    const { kcContext } = props;

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

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return (
                            <Fallback
                                kcContext={kcContext}
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