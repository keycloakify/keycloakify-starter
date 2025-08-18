/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "login/components/UserProfileFormFields/InputLabel.tsx" --revert
 */

import type { Attribute } from "../../../@keycloakify/login-ui/useUserProfileForm";
import { useI18n } from "../../i18n";

export function InputLabel(props: { attribute: Attribute; option: string }) {
    const { attribute, option } = props;
    const { advancedMsg } = useI18n();

    if (attribute.annotations.inputOptionLabels !== undefined) {
        const { inputOptionLabels } = attribute.annotations;

        return advancedMsg(inputOptionLabels[option] ?? option);
    }

    if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
        return advancedMsg(`${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`);
    }

    return <>{option}</>;
}
