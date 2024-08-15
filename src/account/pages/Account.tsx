import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useUserProfile, useI18nMessages } from "../api";
import { useOidc } from "../oidc";

export default function Account(props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template } = props;

    const classes = {
        ...props.classes,
        kcBodyClass: clsx(props.classes?.kcBodyClass, "user")
    };

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const {
        url,
        realm,
        messagesPerField,
        stateChecker,
        /*account,*/ // NOTE: We don't need the account object since we are fetching more detailed information from the API (userProfile)
        referrer
    } = kcContext;


    const { msg } = i18n;

    const { goToAuthServer, backFromAuthServer } = useOidc();

    const { userProfile } = useUserProfile();
    const { i18nMessages } = useI18nMessages();

    if (userProfile === undefined || i18nMessages === undefined) {
        return null;
    }

    // TODO: Improve the form validation and add custom user attributes fields using userProfile.attributes
    console.log(userProfile);
    // TODO: Use i18nResources to resolve i18n keys like ${username} to "Username"
    console.log(i18nMessages);

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="account">
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

            <form action={url.accountUrl} className="form-horizontal" method="post">
                <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

                {!realm.registrationEmailAsUsername && (
                    <div className={clsx("form-group", messagesPerField.printIfExists("username", "has-error"))}>
                        <div className="col-sm-2 col-md-2">
                            <label htmlFor="username" className="control-label">
                                {msg("username")}
                            </label>
                            {realm.editUsernameAllowed && <span className="required">*</span>}
                        </div>

                        <div className="col-sm-10 col-md-10">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                disabled={!realm.editUsernameAllowed}
                                defaultValue={userProfile.username}
                            />
                        </div>
                    </div>
                )}

                <div className={clsx("form-group", messagesPerField.printIfExists("email", "has-error"))}>
                    <div className="col-sm-2 col-md-2">
                        <label htmlFor="email" className="control-label">
                            {msg("email")}
                        </label>{" "}
                        <span className="required">*</span>
                    </div>

                    <div className="col-sm-10 col-md-10">
                        <input type="text" className="form-control" id="email" name="email" autoFocus defaultValue={userProfile.email} />
                    </div>
                </div>

                <div className={clsx("form-group", messagesPerField.printIfExists("firstName", "has-error"))}>
                    <div className="col-sm-2 col-md-2">
                        <label htmlFor="firstName" className="control-label">
                            {msg("firstName")}
                        </label>{" "}
                        <span className="required">*</span>
                    </div>

                    <div className="col-sm-10 col-md-10">
                        <input type="text" className="form-control" id="firstName" name="firstName" defaultValue={userProfile.firstName} />
                    </div>
                </div>

                <div className={clsx("form-group", messagesPerField.printIfExists("lastName", "has-error"))}>
                    <div className="col-sm-2 col-md-2">
                        <label htmlFor="lastName" className="control-label">
                            {msg("lastName")}
                        </label>{" "}
                        <span className="required">*</span>
                    </div>

                    <div className="col-sm-10 col-md-10">
                        <input type="text" className="form-control" id="lastName" name="lastName" defaultValue={userProfile.lastName} />
                    </div>
                </div>

                <div className="form-group">
                    <div id="kc-form-buttons" className="col-md-offset-2 col-md-10 submit">
                        <div>
                            {referrer !== undefined && <a href={referrer?.url}>{msg("backToApplication")}</a>}
                            <button
                                type="submit"
                                className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                                name="submitAction"
                                value="Save"
                            >
                                {msg("doSave")}
                            </button>
                            <button
                                type="submit"
                                className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                                name="submitAction"
                                value="Cancel"
                            >
                                {msg("doCancel")}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <button
                className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                onClick={() => goToAuthServer({
                    extraQueryParams: { kc_action: "delete_account" }
                })}
            >
                Delete Account
            </button>
            <br />
            <br />
            -- OR --
            <br />
            <br />
            <button
                className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                onClick={() => goToAuthServer({
                    extraQueryParams: { kc_action: "UPDATE_PROFILE" }
                })}
            >
                Update profile (via Login theme)
            </button>
            {backFromAuthServer?.extraQueryParams.kc_action === "UPDATE_PROFILE" && (
                <p>
                    {(() => {
                        switch (backFromAuthServer.result.kc_action_status) {
                            case "success":
                                return "Profile successfully updated";
                            case "cancelled":
                                return "Profile unchanged";
                        }
                    })()}
                </p>
            )}
        </Template>
    );
}
