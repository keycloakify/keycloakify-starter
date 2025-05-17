import { useKcClsx } from "../../_internals/useKcClsx";
import type { KcContext } from "./KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { kcClsx } = useKcClsx();

    const { msg, msgStr } = useI18n();

    return (
        <Template kcContext={kcContext} headerNode={msg("deleteAccountConfirm")}>
            <form
                action={kcContext.url.loginAction}
                className="form-vertical"
                method="post"
            >
                <div
                    className="alert alert-warning"
                    style={{ marginTop: "0", marginBottom: "30px" }}
                >
                    <span className="pficon pficon-warning-triangle-o"></span>
                    {msg("irreversibleAction")}
                </div>
                <p>{msg("deletingImplies")}</p>
                <ul
                    style={{
                        color: "#72767b",
                        listStyle: "disc",
                        listStylePosition: "inside"
                    }}
                >
                    <li>{msg("loggingOutImmediately")}</li>
                    <li>{msg("errasingData")}</li>
                </ul>
                <p className="delete-account-text">{msg("finalDeletionConfirmation")}</p>
                <div id="kc-form-buttons">
                    <input
                        className={kcClsx(
                            "kcButtonClass",
                            "kcButtonPrimaryClass",
                            "kcButtonLargeClass"
                        )}
                        type="submit"
                        value={msgStr("doConfirmDelete")}
                    />
                    {kcContext.triggered_from_aia && (
                        <button
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonDefaultClass",
                                "kcButtonLargeClass"
                            )}
                            style={{ marginLeft: "calc(100% - 220px)" }}
                            type="submit"
                            name="cancel-aia"
                            value="true"
                        >
                            {msgStr("doCancel")}
                        </button>
                    )}
                </div>
            </form>
        </Template>
    );
}
