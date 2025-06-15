// import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, buttonVariants } from "@/components/ui/button";
import { CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";

const header = () => {
    return (
        <CardHeader>
            <CardTitle id="card-title">
                There's an existing account
            </CardTitle>
            <CardDescription id="card-description">What would you like to do?</CardDescription>
        </CardHeader>
    );
};

export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    // const { kcClsx } = getKcClsx({
    //     doUseDefaultCss,
    //     classes
    // });

    const { url, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={header()}>
            <CardContent>
            <form id="kc-register-form" action={url.loginAction} method="post">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button
                        type="submit"
                        name="submitAction"
                        id="updateProfile"
                        value="updateProfile"
                        variant="outline"
                    >
                        {msg("confirmLinkIdpReviewProfile")}
                    </Button>
                    <Button
                        type="submit"
                        
                        name="submitAction"
                        id="linkAccount"
                        value="linkAccount"
                    >
                        {msg("confirmLinkIdpContinue", idpAlias)}
                    </Button>
                </div>
            </form>
            </CardContent>
        </Template>
    );
}
