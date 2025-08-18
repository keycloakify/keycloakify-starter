import { useEffect, Fragment } from "react";
import { Password } from "./field/Password";
import { useI18n } from "../i18n";
import {
    useNewPassword,
    type ParamsOfGetNewPasswordApi
} from "../../@keycloakify/login-ui/useNewPassword";
import { useKcContext } from "../KcContext.gen";
//import { assert } from "tsafe/assert";

export function NewPasswordField(props: {
    /**
     * Whether to include the "confirm password" field when users choose a new password.
     *
     * Used with `true` to match Keycloak's standard behavior, but it is **strongly recommended to set this to `false`**
     * unless your system has no password recovery mechanism in place whatsoever.
     *
     * Rationale:
     * - Makes the form appear longer and more tedious, which may deter users from registering.
     * - Most users rely on browser password managers, which handle password entry reliably.
     * - For users typing manually, it wastes time and tests their patience.
     * - In the rare case of a typo, email-based password recovery handles it gracefully.
     *
     * Keeping this enabled only makes sense in, recovery-less environments.
     */
    testUserPatienceWithConfirmationLikeIts1998: boolean;
    usecase:
        | {
              pageId: "register.ftl";
              userProfileApi: ParamsOfGetNewPasswordApi["userProfileApi"] | undefined;
          }
        | {
              pageId: "login-update-password.ftl";
          };
    onAreAllCheckPassedValueChange: (areAllChecksPassed: boolean) => void;
}) {
    const { usecase, testUserPatienceWithConfirmationLikeIts1998, onAreAllCheckPassedValueChange } =
        props;

    const i18n = useI18n();

    const { msg } = i18n;

    const { kcContext } = useKcContext();
    //assert(usecase.pageId === kcContext.pageId);

    const {
        formState: { areAllChecksPassed, formFieldStates },
        dispatchFormAction
    } = useNewPassword({
        kcContext,
        i18n,
        passwordFieldName: (() => {
            switch (usecase.pageId) {
                case "register.ftl":
                    return "password";
                case "login-update-password.ftl":
                    return "password-new";
            }
        })(),
        passwordConfirmFieldName: "password-confirm",
        makeConfirmationFieldHiddenAndAutoFilled: !testUserPatienceWithConfirmationLikeIts1998,
        userProfileApi: usecase.pageId === "register.ftl" ? usecase.userProfileApi : undefined
    });

    useEffect(() => {
        onAreAllCheckPassedValueChange(areAllChecksPassed);
    }, [areAllChecksPassed]);

    return (
        <>
            {formFieldStates.map(({ attribute, displayableErrors, value }) => (
                <Password
                    style={{
                        display: attribute.annotations.inputType === "hidden" ? "none" : undefined
                    }}
                    required
                    label={(() => {
                        switch (attribute.name) {
                            case "password":
                                return msg("password");
                            case "password-new":
                                return msg("passwordNew");
                            case "password-confirm":
                                return msg("passwordConfirm");
                        }
                    })()}
                    error={displayableErrors.map(({ errorMessage }, i) => (
                        <Fragment key={i}>
                            {errorMessage}
                            {displayableErrors.length - 1 !== i && <br />}
                        </Fragment>
                    ))}
                    renderInput={inputProps => (
                        <input
                            {...inputProps}
                            name={attribute.name}
                            autoComplete="new-password"
                            value={value}
                            autoFocus={((): boolean => {
                                switch (usecase.pageId) {
                                    case "register.ftl":
                                        return false;
                                    case "login-update-password.ftl":
                                        return true;
                                }
                            })()}
                            onChange={event =>
                                dispatchFormAction({
                                    action: "update",
                                    name: attribute.name,
                                    value: event.target.value
                                })
                            }
                            onBlur={() =>
                                dispatchFormAction({
                                    action: "focus lost",
                                    name: attribute.name
                                })
                            }
                        />
                    )}
                />
            ))}
        </>
    );
}
