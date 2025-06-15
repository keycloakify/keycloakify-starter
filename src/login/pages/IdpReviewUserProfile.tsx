import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type IdpReviewUserProfileProps = PageProps<Extract<KcContext, { pageId: "idp-review-user-profile.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

const header = () => {
    return (
        <CardHeader>
            <CardTitle id="card-title">
                <b>Update your account information</b>
            </CardTitle>
        </CardHeader>
    );
};

export default function IdpReviewUserProfile(props: IdpReviewUserProfileProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msgStr } = i18n;

    const { url, messagesPerField } = kcContext;

    const [isFomSubmittable, setIsFomSubmittable] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
            headerNode={header()}
        >
            <CardContent>
                <form id="kc-idp-review-profile-form" className="grid w-full max-w-sm items-center gap-3" action={url.loginAction} method="post">
                    <UserProfileFormFields
                        kcContext={kcContext}
                        i18n={i18n}
                        onIsFormSubmittableValueChange={setIsFomSubmittable}
                        kcClsx={kcClsx}
                        doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                    />
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                            <div className={kcClsx("kcFormOptionsWrapperClass")} />
                        </div>
                        <div id="kc-form-buttons" className={`kcClsx("kcFormButtonsClass") my-5`}>
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={!isFomSubmittable}
                                id="kc-submit"
                            >
                                {msgStr("doSubmit")}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Template>
    );
}
