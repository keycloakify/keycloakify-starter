import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const header = () => {
    return (
        <CardHeader>
            <CardTitle id="card-title">
                Update your account information
            </CardTitle>
        </CardHeader>
    );
};

type LoginUpdateProfileProps = PageProps<Extract<KcContext, { pageId: "login-update-profile.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function LoginUpdateProfile(props: LoginUpdateProfileProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messagesPerField, url, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayRequiredFields
            headerNode={header()}
            displayMessage={messagesPerField.exists("global")}
        >
            <CardContent>
                <form id="kc-update-profile-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                    <UserProfileFormFields
                        kcContext={kcContext}
                        i18n={i18n}
                        kcClsx={kcClsx}
                        onIsFormSubmittableValueChange={setIsFormSubmittable}
                        doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                    />
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                            <div className={kcClsx("kcFormOptionsWrapperClass")} />
                        </div>
                        <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                            <Button
                                disabled={!isFormSubmittable}
                                className={`${!kcClsx(!isAppInitiatedAction)} w-full`}
                                type="submit"
                                id="kc-submit"
                            >{msgStr("doSubmit")}</Button>
                            {isAppInitiatedAction && (
                                <Button
                                    type="submit"
                                    name="cancel-aia"
                                    value="true"
                                    formNoValidate
                                    variant="secondary"
                                    className="w-full"
                                >
                                    {msg("doCancel")}
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </CardContent>
        </Template>
    );
}
