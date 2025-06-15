import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ReactNode, ReactElement } from "react";

const header = (msg: string | number | boolean | Iterable<ReactNode> | ReactElement<any, any> | null | undefined) => {
    return (
        <CardHeader>
            <CardTitle id="card-title">Email verification</CardTitle>
            <CardDescription id="card-description">{msg}</CardDescription>
        </CardHeader>
    );
};

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={header(msg("emailVerifyInstruction1", user?.email ?? ""))}
            infoNode={
                <p className="instruction">
                    {msg("emailVerifyInstruction2")}
                    <br />
                    <a href={url.loginAction}>{msg("doClickHere")}</a>
                    &nbsp;
                    {msg("emailVerifyInstruction3")}
                </p>
            }
        >
            <CardContent></CardContent>
        </Template>
    );
}
