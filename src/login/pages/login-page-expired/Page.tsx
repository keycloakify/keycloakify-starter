import type { PageProps } from "./PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import type { KcContext } from "./KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page(props: { kcContext: KcContext }) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("pageExpiredTitle")}>
            <p id="instruction1" className="instruction">
                {msg("pageExpiredMsg1")}
                <a id="loginRestartLink" href={url.loginRestartFlowUrl}>
                    {msg("doClickHere")}
                </a>{" "}
                .<br />
                {msg("pageExpiredMsg2")}{" "}
                <a id="loginContinueLink" href={url.loginAction}>
                    {msg("doClickHere")}
                </a>{" "}
                .
            </p>
        </Template>
    );
}
