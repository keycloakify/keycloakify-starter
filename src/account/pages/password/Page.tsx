import { assert } from "tsafe/assert";
import { useState } from "react";
import { useKcClsx } from "../../../@keycloakify/account-multi-page-ui/useKcClsx";
import { useKcContext } from "../../KcContext.gen";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "password.ftl");

    const { kcClsx } = useKcClsx();

    const { msg, msgStr } = useI18n();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [newPasswordConfirmError, setNewPasswordConfirmError] = useState("");
    const [hasNewPasswordBlurred, setHasNewPasswordBlurred] = useState(false);
    const [hasNewPasswordConfirmBlurred, setHasNewPasswordConfirmBlurred] = useState(false);

    const checkNewPassword = (newPassword: string) => {
        if (!kcContext.password.passwordSet) {
            return;
        }

        if (newPassword === currentPassword) {
            setNewPasswordError(msgStr("newPasswordSameAsOld"));
        } else {
            setNewPasswordError("");
        }
    };

    const checkNewPasswordConfirm = (newPasswordConfirm: string) => {
        if (newPasswordConfirm === "") {
            return;
        }

        if (newPassword !== newPasswordConfirm) {
            setNewPasswordConfirmError(msgStr("passwordConfirmNotMatch"));
        } else {
            setNewPasswordConfirmError("");
        }
    };

    return (
        <Template
            message={(() => {
                if (newPasswordError !== "") {
                    return {
                        type: "error",
                        summary: newPasswordError
                    };
                }

                if (newPasswordConfirmError !== "") {
                    return {
                        type: "error",
                        summary: newPasswordConfirmError
                    };
                }

                return kcContext.message;
            })()}
            kcBodyClass="password"
            active="password"
        >
            <div className="row">
                <div className="col-md-10">
                    <h2>{msg("changePasswordHtmlTitle")}</h2>
                </div>
                <div className="col-md-2 subtitle">
                    <span className="subtitle">{msg("allFieldsRequired")}</span>
                </div>
            </div>

            <form action={kcContext.url.passwordUrl} className="form-horizontal" method="post">
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={kcContext.account.username ?? ""}
                    autoComplete="username"
                    readOnly
                    style={{ display: "none" }}
                />

                {kcContext.password.passwordSet && (
                    <div className="form-group">
                        <div className="col-sm-2 col-md-2">
                            <label htmlFor="password" className="control-label">
                                {msg("password")}
                            </label>
                        </div>
                        <div className="col-sm-10 col-md-10">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                autoFocus
                                autoComplete="current-password"
                                value={currentPassword}
                                onChange={event => setCurrentPassword(event.target.value)}
                            />
                        </div>
                    </div>
                )}

                <input
                    type="hidden"
                    id="stateChecker"
                    name="stateChecker"
                    value={kcContext.stateChecker}
                />

                <div className="form-group">
                    <div className="col-sm-2 col-md-2">
                        <label htmlFor="password-new" className="control-label">
                            {msg("passwordNew")}
                        </label>
                    </div>
                    <div className="col-sm-10 col-md-10">
                        <input
                            type="password"
                            className="form-control"
                            id="password-new"
                            name="password-new"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={event => {
                                const newPassword = event.target.value;

                                setNewPassword(newPassword);
                                if (hasNewPasswordBlurred) {
                                    checkNewPassword(newPassword);
                                }
                            }}
                            onBlur={() => {
                                setHasNewPasswordBlurred(true);
                                checkNewPassword(newPassword);
                            }}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-2 col-md-2">
                        <label htmlFor="password-confirm" className="control-label two-lines">
                            {msg("passwordConfirm")}
                        </label>
                    </div>

                    <div className="col-sm-10 col-md-10">
                        <input
                            type="password"
                            className="form-control"
                            id="password-confirm"
                            name="password-confirm"
                            autoComplete="new-password"
                            value={newPasswordConfirm}
                            onChange={event => {
                                const newPasswordConfirm = event.target.value;

                                setNewPasswordConfirm(newPasswordConfirm);
                                if (hasNewPasswordConfirmBlurred) {
                                    checkNewPasswordConfirm(newPasswordConfirm);
                                }
                            }}
                            onBlur={() => {
                                setHasNewPasswordConfirmBlurred(true);
                                checkNewPasswordConfirm(newPasswordConfirm);
                            }}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div id="kc-form-buttons" className="col-md-offset-2 col-md-10 submit">
                        <div>
                            <button
                                disabled={newPasswordError !== "" || newPasswordConfirmError !== ""}
                                type="submit"
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonLargeClass"
                                )}
                                name="submitAction"
                                value="Save"
                            >
                                {msg("doSave")}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
