import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const header = () => {
    return (
        <CardHeader>
            <CardTitle id="card-title">One more thing</CardTitle>
        </CardHeader>
    );
};

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { advancedMsgStr } = i18n;
    const { message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} displayMessage={false} headerNode={header()}>
            <CardContent>
                <div id="kc-info-message">
                    <p
                        className="instruction mb-3"
                        dangerouslySetInnerHTML={{
                            __html: kcSanitize(
                                (() => {
                                    let html = message.summary?.trim();

                                    if (requiredActions) {
                                        html += " <b>";
                                        html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");
                                        html += "</b>";
                                    }
                                    return html;
                                })()
                            )
                        }}
                    />
                    <></>
                    {(() => {
                        if (skipLink) {
                            return null;
                        }

                        if (pageRedirectUri) {
                            return (
                                <p>
                                    <Button className="kc-primary w-full" asChild>
                                        <a href={pageRedirectUri}>Go back</a>
                                    </Button>
                                </p>
                            );
                        }
                        if (actionUri) {
                            return (
                                <p>
                                    <Button className="kc-primary w-full" asChild>
                                        <a href={actionUri}>Continue</a>
                                    </Button>
                                </p>
                            );
                        }

                        if (client.baseUrl) {
                            return (
                                <p>
                                    <Button className="kc-primary w-full" asChild>
                                        <a href={client.baseUrl}>Go back</a>
                                    </Button>
                                </p>
                            );
                        }
                    })()}
                </div>
            </CardContent>
        </Template>
    );
}
