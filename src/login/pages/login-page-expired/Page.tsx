


import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {

    const { kcContext } = useKcContext("login-page-expired.ftl");

    const { msg }= useI18n();

    return (
        <Template  headerNode={msg("pageExpiredTitle")}>
            <p id="instruction1" className="instruction">
                {msg("pageExpiredMsg1")}
                <a id="loginRestartLink" href={kcContext.url.loginRestartFlowUrl}>
                    {msg("doClickHere")}
                </a>{" "}
                .<br />
                {msg("pageExpiredMsg2")}{" "}
                <a id="loginContinueLink" href={kcContext.url.loginAction}>
                    {msg("doClickHere")}
                </a>{" "}
                .
            </p>
        </Template>
    );
}
