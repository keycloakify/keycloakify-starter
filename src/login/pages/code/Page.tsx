/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/code/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { kcSanitize } from "../../../@keycloakify/login-ui/kcSanitize";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "code.ftl");

    const { kcClsx } = useKcClsx();

    const { msg } = useI18n();

    return (
        <Template
            headerNode={
                kcContext.code.success
                    ? msg("codeSuccessTitle")
                    : msg("codeErrorTitle", kcContext.code.error)
            }
        >
            <div id="kc-code">
                {kcContext.code.success ? (
                    <>
                        <p>{msg("copyCodeInstruction")}</p>
                        <input
                            id="code"
                            className={kcClsx("kcTextareaClass")}
                            defaultValue={kcContext.code.code}
                        />
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
