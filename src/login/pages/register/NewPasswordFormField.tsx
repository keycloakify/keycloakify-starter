import { useState, useMemo } from "react";
import { Password } from "../../components/field/Password";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";

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
     * - In the rare case (~0.1%) of a typo, email-based password recovery handles it gracefully.
     *
     * Keeping this enabled only makes sense in, recovery-less environments.
     */
    testUserPatienceWithConfirmationLikeIts1998: boolean;
    registerFormState: {
        username: string;
        email: string;
    } | undefined;
}) {
    const { testUserPatienceWithConfirmationLikeIts1998, registerFormState } = props;

    const { msg } = useI18n();

    const [password, setPassword] = useState("");

    return (
        <>
            <Password
                required
                label={msg("password")}
                error={null}
                renderInput={inputProps => (
                    <input
                        {...inputProps}
                        name="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                )}
            />
            {testUserPatienceWithConfirmationLikeIts1998 ? (
                <Password
                    required
                    label={msg("passwordConfirm")}
                    error={null}
                    renderInput={inputProps => (
                        <input {...inputProps} name="password-confirm" autoComplete="new-password" />
                    )}
                />
            ) : (
                <input type="hidden" readOnly value={password} />
            )}
        </>
    );
}

