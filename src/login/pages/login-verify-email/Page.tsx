import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {

    const { kcContext } = useKcContext("login-verify-email.ftl");

    const { msg }= useI18n();

    const { url, user } = kcContext;

    return (
        <Template
           
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
