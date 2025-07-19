/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/components/PasswordWrapper.tsx" --revert
 */

import type { JSX } from "../../@keycloakify/login-ui/tools/JSX";
import { useIsPasswordRevealed } from "../../@keycloakify/login-ui/tools/useIsPasswordRevealed";
import { useKcClsx } from "../../@keycloakify/login-ui/useKcClsx";
import { useI18n } from "../i18n";

export function PasswordWrapper(props: { passwordInputId: string; children: JSX.Element }) {
    const { passwordInputId, children } = props;

    const { msgStr } = useI18n();

    const { kcClsx } = useKcClsx();

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId
    });

    return (
        <div className={kcClsx("kcInputGroup")}>
            {children}
            <button
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i
                    className={kcClsx(
                        isPasswordRevealed
                            ? "kcFormPasswordVisibilityIconHide"
                            : "kcFormPasswordVisibilityIconShow"
                    )}
                    aria-hidden
                />
            </button>
        </div>
    );
}
