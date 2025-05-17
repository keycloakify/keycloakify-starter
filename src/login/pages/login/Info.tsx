import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";

export function Info() {
    const { kcContext } = useKcContext("login.ftl");

    const { url } = kcContext;

    const { msg } = useI18n();

    return (
        <div id="kc-registration-container">
            <div id="kc-registration">
                <span>
                    {msg("noAccount")}{" "}
                    <a tabIndex={8} href={url.registrationUrl}>
                        {msg("doRegister")}
                    </a>
                </span>
            </div>
        </div>
    );
}
