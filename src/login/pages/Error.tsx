import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const header = () => {
    return (
        <CardHeader>
            <CardTitle id="card-title">
                Well, this is awkward...
            </CardTitle>
            <CardDescription id="card-description">Something happened and we couldn't process your request at this time</CardDescription>
        </CardHeader>
    );
};

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={header()}
        >
            <CardContent>
                <div id="kc-error-message">
                    <p className="instruction" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                    {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                        <p>
                            <Button asChild variant="ghost">
                            <a id="backToApplication" href={client.baseUrl}>
                                {msg("backToApplication")}
                            </a>
                            </Button>
                        </p>
                    )}
                </div>
            </CardContent>
        </Template>
    );
}
