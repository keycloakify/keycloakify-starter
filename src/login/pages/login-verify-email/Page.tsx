import type { PageProps } from "./PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import type { KcContext } from "./KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page(props: { kcContext: KcContext }) {
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
            headerNode={msg("emailVerifyTitle")}
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
            <p className="instruction">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
        </Template>
    );
}
