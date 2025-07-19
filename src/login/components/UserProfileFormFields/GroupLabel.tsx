/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/components/UserProfileFormFields/GroupLabel.tsx" --revert
 */

import { assert } from "tsafe/assert";
import type { Attribute } from "../../../@keycloakify/login-ui/KcContext";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

export function GroupLabel(props: {
    attribute: Attribute;
    groupNameRef: {
        current: string;
    };
}) {
    const { attribute, groupNameRef } = props;

    const { advancedMsg } = useI18n();

    const { kcClsx } = useKcClsx();

    if (attribute.group?.name !== groupNameRef.current) {
        groupNameRef.current = attribute.group?.name ?? "";

        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);

            return (
                <div
                    className={kcClsx("kcFormGroupClass")}
                    {...Object.fromEntries(
                        Object.entries(attribute.group.html5DataAnnotations).map(([key, value]) => [
                            `data-${key}`,
                            value
                        ])
                    )}
                >
                    {(() => {
                        const groupDisplayHeader = attribute.group.displayHeader ?? "";
                        const groupHeaderText =
                            groupDisplayHeader !== ""
                                ? advancedMsg(groupDisplayHeader)
                                : attribute.group.name;

                        return (
                            <div className={kcClsx("kcContentWrapperClass")}>
                                <label
                                    id={`header-${attribute.group.name}`}
                                    className={kcClsx("kcFormGroupHeader")}
                                >
                                    {groupHeaderText}
                                </label>
                            </div>
                        );
                    })()}
                    {(() => {
                        const groupDisplayDescription = attribute.group.displayDescription ?? "";

                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(groupDisplayDescription);

                            return (
                                <div className={kcClsx("kcLabelWrapperClass")}>
                                    <label
                                        id={`description-${attribute.group.name}`}
                                        className={kcClsx("kcLabelClass")}
                                    >
                                        {groupDescriptionText}
                                    </label>
                                </div>
                            );
                        }

                        return null;
                    })()}
                </div>
            );
        }
    }

    return null;
}
