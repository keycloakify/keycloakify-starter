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
        downloadTermMarkdown: async ({ currentLanguageTag }) => {
            const termsFileName = (() => {
                switch (currentLanguageTag) {
                    case "fr":
                        return "fr.md";
                    case "es":
                        return "es.md";
                    default:
                        return "en.md";
                }
            })();

            // The files are in the public directory.
            const response = await fetch(`${import.meta.env}terms/${termsFileName}`);

            return response.text();
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