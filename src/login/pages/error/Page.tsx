import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "./KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = useI18n();

    return (
        <Template
            kcContext={kcContext}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <div id="kc-error-message">
                <p
                    className="instruction"
                    dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
                />
                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <p>
                        <a id="backToApplication" href={client.baseUrl}>
                            {msg("backToApplication")}
                        </a>
                    </p>
                )}
            </div>
        </Template>
    );
}
