import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext("error.ftl");

    const { msg } = useI18n();

    return (
        <Template
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <div id="kc-error-message">
                <p
                    className="instruction"
                    dangerouslySetInnerHTML={{ __html: kcSanitize(kcContext.message.summary) }}
                />
                {!kcContext.skipLink && kcContext.client !== undefined && kcContext.client.baseUrl !== undefined && (
                    <p>
                        <a id="backToApplication" href={kcContext.client.baseUrl}>
                            {msg("backToApplication")}
                        </a>
                    </p>
                )}
            </div>
        </Template>
    );
}
