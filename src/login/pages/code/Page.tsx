import { useKcClsx } from "../../_internals/useKcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "./KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { kcClsx } = useKcClsx();

    const { msg } = useI18n();

    return (
        <Template
            kcContext={kcContext}
            headerNode={kcContext.code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", kcContext.code.error)}
        >
            <div id="kc-code">
                {kcContext.code.success ? (
                    <>
                        <p>{msg("copyCodeInstruction")}</p>
                        <input id="code" className={kcClsx("kcTextareaClass")} defaultValue={kcContext.code.code} />
                    </>
                ) : (
                    kcContext.code.error && (
                        <p
                            id="error"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(kcContext.code.error)
                            }}
                        />
                    )
                )}
            </div>
        </Template>
    );
}
