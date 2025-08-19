import { assert } from "tsafe/assert";
import { clsx } from "../../../@keycloakify/account-multi-page-ui/tools/clsx";
import { useKcClsx } from "../../../@keycloakify/account-multi-page-ui/useKcClsx";
import { useKcContext } from "../../KcContext.gen";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "account.ftl");

    const { kcClsx } = useKcClsx();

    const { msg } = useI18n();

    return (
        <Template active="account">
            <div className="row">
                <div className="col-md-10">
                    <h2>{msg("editAccountHtmlTitle")}</h2>
                </div>
                <div className="col-md-2 subtitle">
                    <span className="subtitle">
                        <span className="required">*</span> {msg("requiredFields")}
                    </span>
                </div>
            </div>

            <form action={kcContext.url.accountUrl} className="form-horizontal" method="post">
                <input
                    type="hidden"
                    id="stateChecker"
                    name="stateChecker"
                    value={kcContext.stateChecker}
                />

                {!kcContext.realm.registrationEmailAsUsername && (
                    <div
                        className={clsx(
                            "form-group",
                            kcContext.messagesPerField.printIfExists("username", "has-error")
                        )}
                    >
                        <div className="col-sm-2 col-md-2">
                            <label htmlFor="username" className="control-label">
                                {msg("username")}
                            </label>
                            {kcContext.realm.editUsernameAllowed && <span className="required">*</span>}
                        </div>

                        <div className="col-sm-10 col-md-10">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                disabled={!kcContext.realm.editUsernameAllowed}
                                defaultValue={kcContext.account.username ?? ""}
                            />
                        </div>
                    </div>
                )}

                <div
                    className={clsx(
                        "form-group",
                        kcContext.messagesPerField.printIfExists("email", "has-error")
                    )}
                >
                    <div className="col-sm-2 col-md-2">
                        <label htmlFor="email" className="control-label">
                            {msg("email")}
                        </label>{" "}
                        <span className="required">*</span>
                    </div>

                    <div className="col-sm-10 col-md-10">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            autoFocus
                            defaultValue={kcContext.account.email ?? ""}
                        />
                    </div>
                </div>

                <div
                    className={clsx(
                        "form-group",
                        kcContext.messagesPerField.printIfExists("firstName", "has-error")
                    )}
                >
                    <div className="col-sm-2 col-md-2">
                        <label htmlFor="firstName" className="control-label">
                            {msg("firstName")}
                        </label>{" "}
                        <span className="required">*</span>
                    </div>

                    <div className="col-sm-10 col-md-10">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            defaultValue={kcContext.account.firstName ?? ""}
                        />
                    </div>
                </div>

                <div
                    className={clsx(
                        "form-group",
                        kcContext.messagesPerField.printIfExists("lastName", "has-error")
                    )}
                >
                    <div className="col-sm-2 col-md-2">
                        <label htmlFor="lastName" className="control-label">
                            {msg("lastName")}
                        </label>{" "}
                        <span className="required">*</span>
                    </div>

                    <div className="col-sm-10 col-md-10">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            defaultValue={kcContext.account.lastName ?? ""}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div id="kc-form-buttons" className="col-md-offset-2 col-md-10 submit">
                        <div>
                            {kcContext.referrer !== undefined && (
                                <a href={kcContext.referrer?.url}>{msg("backToApplication")}</a>
                            )}
                            <button
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
                            <button
                                type="submit"
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonDefaultClass",
                                    "kcButtonLargeClass"
                                )}
                                name="submitAction"
                                value="Cancel"
                            >
                                {msg("doCancel")}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
